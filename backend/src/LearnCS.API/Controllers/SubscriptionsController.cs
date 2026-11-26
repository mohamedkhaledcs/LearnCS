using System.Data;
using System.Text.Json;
using LearnCS.Domain.Platform;
using LearnCS.Domain.Subscriptions;
using LearnCS.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.API.Controllers;

[ApiController]
[Route("api/subscriptions")]
public class SubscriptionsController(AppDbContext db) : ApiControllerBase
{
    private static List<string> DeserializeList(string json)
    {
        try
        {
            return JsonSerializer.Deserialize<List<string>>(json) ?? [];
        }
        catch
        {
            return [];
        }
    }

    private static Dictionary<string, object> DeserializeDict(string json)
    {
        try
        {
            return JsonSerializer.Deserialize<Dictionary<string, object>>(json) ?? [];
        }
        catch
        {
            return [];
        }
    }

    [HttpGet("plans")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetPlans(CancellationToken cancellationToken)
    {
        var plans = await db.SubscriptionPlans
            .Where(p => p.IsActive)
            .OrderBy(p => p.DisplayOrder)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        return Ok(plans.Select(p => new
        {
            p.Id,
            p.Name,
            p.Badge,
            p.DescriptionEn,
            p.DescriptionAr,
            p.MonthlyPrice,
            p.OriginalMonthlyPrice,
            p.AnnualPrice,
            p.OriginalAnnualPrice,
            FeaturesEn = DeserializeList(p.FeaturesEnJson),
            FeaturesAr = DeserializeList(p.FeaturesArJson),
            Entitlements = DeserializeDict(p.EntitlementsJson),
            p.IsPopular,
            p.DisplayOrder
        }));
    }

    [HttpGet("my")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetMySubscription(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        var current = await db.UserSubscriptions
            .Include(s => s.Plan)
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.UserId == userId, cancellationToken);

        var activePending = await db.SubscriptionRequests
            .Include(r => r.RequestedPlan)
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.UserId == userId && r.Status == SubscriptionRequestStatus.PendingApproval, cancellationToken);

        var history = await db.SubscriptionHistories
            .Where(h => h.UserId == userId)
            .OrderByDescending(h => h.CreatedAt)
            .Take(25)
            .AsNoTracking()
            .Select(h => new
            {
                h.Id,
                h.PlanId,
                h.PreviousPlanId,
                h.Action,
                h.BillingInterval,
                h.Status,
                h.Notes,
                h.CreatedAt
            })
            .ToListAsync(cancellationToken);

        var freePlan = current == null
            ? await db.SubscriptionPlans.AsNoTracking().FirstOrDefaultAsync(p => p.Id == "plan-free", cancellationToken)
            : null;

        var pendingDto = activePending == null
            ? null
            : new
            {
                activePending.Id,
                activePending.RequestedPlanId,
                RequestedPlanName = activePending.RequestedPlan?.Name ?? activePending.RequestedPlanId,
                activePending.BillingInterval,
                Status = activePending.Status.ToString(),
                activePending.Notes,
                activePending.CreatedAt
            };

        return Ok(new
        {
            PlanId = current?.PlanId ?? "plan-free",
            PlanName = current?.Plan?.Name ?? freePlan?.Name ?? "Free",
            Status = current?.Status.ToString() ?? SubscriptionStatus.Active.ToString(),
            BillingInterval = current?.BillingInterval ?? "Free",
            PaymentStatus = current?.PaymentStatus ?? "FreeTier",
            StartedAt = current?.StartedAt ?? DateTime.UtcNow,
            ExpiresAt = current?.ExpiresAt,
            Notes = current?.Notes,
            PendingRequest = pendingDto,
            History = history
        });
    }

    [HttpPost("select")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> SelectPlan([FromBody] SelectPlanRequest request, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        var planId = request.PlanId.Trim().ToLowerInvariant();
        var plan = await db.SubscriptionPlans.FirstOrDefaultAsync(p => p.Id == planId && p.IsActive, cancellationToken);
        if (plan == null)
        {
            return BadRequest(new { message = $"Subscription plan '{request.PlanId}' was not found or is inactive." });
        }

        var interval = string.Equals(request.BillingInterval, "Annual", StringComparison.OrdinalIgnoreCase)
            ? "Annual"
            : "Monthly";

        async Task<IActionResult> ExecuteAsync()
        {
            var isRelational = db.Database.IsRelational();
            await using var tx = isRelational
                ? await db.Database.BeginTransactionAsync(IsolationLevel.Serializable, cancellationToken)
                : null;

            try
            {
                var existingSub = await db.UserSubscriptions.FirstOrDefaultAsync(s => s.UserId == userId, cancellationToken);
                var existingPending = await db.SubscriptionRequests.FirstOrDefaultAsync(
                    r => r.UserId == userId && r.Status == SubscriptionRequestStatus.PendingApproval,
                    cancellationToken);
                var currentActivePlanId = existingSub?.PlanId ?? "plan-free";

                // Free tier activates legitimately without a payment gateway and clears any pending upgrade request
                if (plan.MonthlyPrice <= 0m)
                {
                    if (existingPending != null)
                    {
                        existingPending.MarkCancelled("Cancelled because learner switched back to the Free tier.");
                        db.SubscriptionHistories.Add(SubscriptionHistory.Create(
                            userId, existingPending.RequestedPlanId, currentActivePlanId,
                            "UpgradeRequestCancelled", existingPending.BillingInterval, "Cancelled", userId,
                            "Cancelled pending upgrade request while activating Free tier."));
                    }

                    if (existingSub == null)
                    {
                        existingSub = UserSubscription.Create(userId, plan.Id, SubscriptionStatus.Active, "Free", null, null, "FreeTier", request.Note);
                        db.UserSubscriptions.Add(existingSub);
                    }
                    else
                    {
                        existingSub.UpdateAssignment(plan.Id, SubscriptionStatus.Active, "Free", null, null, "FreeTier", request.Note);
                    }

                    db.SubscriptionHistories.Add(SubscriptionHistory.Create(
                        userId, plan.Id, currentActivePlanId, "ActivatedFree", "Free", "Active", userId, request.Note ?? "Selected Free plan."));
                    db.AuditLogs.Add(AuditLog.Create("SubscriptionActivatedFree", "UserSubscription", userId, oldValues: currentActivePlanId, newValues: plan.Id));
                    await db.SaveChangesAsync(cancellationToken);
                    if (tx != null) await tx.CommitAsync(cancellationToken);

                    return Ok(new
                    {
                        PlanId = plan.Id,
                        PlanName = plan.Name,
                        Status = SubscriptionStatus.Active.ToString(),
                        BillingInterval = "Free",
                        PaymentRequired = false,
                        PendingRequest = (object?)null,
                        Message = "Free plan activated."
                    });
                }

                // If user already holds this paid plan as Active, keep it intact without duplicate pending request
                if (existingSub != null &&
                    existingSub.PlanId == plan.Id &&
                    existingSub.Status == SubscriptionStatus.Active &&
                    string.Equals(existingSub.BillingInterval, interval, StringComparison.OrdinalIgnoreCase))
                {
                    if (existingPending != null)
                    {
                        existingPending.MarkCancelled("Superseded because target plan is already active.");
                        await db.SaveChangesAsync(cancellationToken);
                    }
                    if (tx != null) await tx.CommitAsync(cancellationToken);

                    return Ok(new
                    {
                        PlanId = plan.Id,
                        PlanName = plan.Name,
                        Status = SubscriptionStatus.Active.ToString(),
                        BillingInterval = existingSub.BillingInterval,
                        PaymentRequired = false,
                        AlreadyActive = true,
                        PendingRequest = (object?)null,
                        Message = $"{plan.Name} is already your active plan."
                    });
                }

                // Guard against duplicate clicks or repeating the exact same pending plan + interval
                if (existingPending != null &&
                    existingPending.RequestedPlanId == plan.Id &&
                    string.Equals(existingPending.BillingInterval, interval, StringComparison.OrdinalIgnoreCase))
                {
                    if (tx != null) await tx.CommitAsync(cancellationToken);
                    return Ok(new
                    {
                        RequestId = existingPending.Id,
                        PlanId = plan.Id,
                        PlanName = plan.Name,
                        ActivePlanId = currentActivePlanId,
                        Status = SubscriptionRequestStatus.PendingApproval.ToString(),
                        BillingInterval = interval,
                        PaymentRequired = true,
                        DuplicatePrevented = true,
                        Message = $"Your upgrade request for {plan.Name} ({interval}) is already pending administrator review."
                    });
                }

                // Replace previous pending request atomically before creating the latest request
                if (existingPending != null)
                {
                    var oldPendingPlan = existingPending.RequestedPlanId;
                    existingPending.MarkSuperseded(plan.Id);
                    db.SubscriptionHistories.Add(SubscriptionHistory.Create(
                        userId, oldPendingPlan, currentActivePlanId,
                        "UpgradeRequestSuperseded", existingPending.BillingInterval, "Superseded", userId,
                        $"Replaced by new request for {plan.Name} ({interval})."));
                    // Persist status transition first so DB filtered unique index (status = 0) allows inserting the replacement
                    await db.SaveChangesAsync(cancellationToken);
                }

                var pendingNote = string.IsNullOrWhiteSpace(request.Note)
                    ? $"Upgrade request submitted for {plan.Name} ({interval}). Awaiting payment verification or Admin activation."
                    : request.Note.Trim();

                var newRequest = SubscriptionRequest.Create(userId, plan.Id, currentActivePlanId, interval, pendingNote);
                db.SubscriptionRequests.Add(newRequest);

                // Ensure user has at least an explicit Active UserSubscription row (preserving any existing active paid plan!)
                if (existingSub == null)
                {
                    existingSub = UserSubscription.Create(userId, "plan-free", SubscriptionStatus.Active, "Free", null, null, "FreeTier", "Active Free baseline while upgrade is reviewed.");
                    db.UserSubscriptions.Add(existingSub);
                }

                db.SubscriptionHistories.Add(SubscriptionHistory.Create(
                    userId, plan.Id, currentActivePlanId, "UpgradeRequested", interval, "PendingApproval", userId, pendingNote));
                db.AuditLogs.Add(AuditLog.Create("SubscriptionUpgradeRequested", "SubscriptionRequest", userId, oldValues: currentActivePlanId, newValues: plan.Id, details: pendingNote));

                await db.SaveChangesAsync(cancellationToken);
                if (tx != null) await tx.CommitAsync(cancellationToken);

                return Ok(new
                {
                    RequestId = newRequest.Id,
                    PlanId = plan.Id,
                    PlanName = plan.Name,
                    ActivePlanId = existingSub.PlanId,
                    Status = SubscriptionRequestStatus.PendingApproval.ToString(),
                    BillingInterval = interval,
                    PaymentRequired = true,
                    DuplicatePrevented = false,
                    Message = $"Latest upgrade request recorded for {plan.Name} ({interval}). Your current active subscription remains intact until approval."
                });
            }
            catch (DbUpdateException)
            {
                if (tx != null) await tx.RollbackAsync(cancellationToken);
                var latest = await db.SubscriptionRequests
                    .Include(r => r.RequestedPlan)
                    .AsNoTracking()
                    .FirstOrDefaultAsync(r => r.UserId == userId && r.Status == SubscriptionRequestStatus.PendingApproval, cancellationToken);
                if (latest != null)
                {
                    return Ok(new
                    {
                        RequestId = latest.Id,
                        PlanId = latest.RequestedPlanId,
                        PlanName = latest.RequestedPlan?.Name ?? latest.RequestedPlanId,
                        Status = SubscriptionRequestStatus.PendingApproval.ToString(),
                        BillingInterval = latest.BillingInterval,
                        PaymentRequired = true,
                        DuplicatePrevented = true,
                        Message = "An active pending upgrade request already exists for your account."
                    });
                }
                throw;
            }
        }

        if (db.Database.IsRelational())
        {
            var strategy = db.Database.CreateExecutionStrategy();
            return await strategy.ExecuteAsync(ExecuteAsync);
        }

        return await ExecuteAsync();
    }

    [HttpPost("cancel-request")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> CancelPendingRequest(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        var existingPending = await db.SubscriptionRequests.FirstOrDefaultAsync(
            r => r.UserId == userId && r.Status == SubscriptionRequestStatus.PendingApproval,
            cancellationToken);

        if (existingPending == null)
        {
            return Ok(new { Cancelled = false, Message = "No pending plan request to cancel." });
        }

        var activeSub = await db.UserSubscriptions.AsNoTracking().FirstOrDefaultAsync(s => s.UserId == userId, cancellationToken);
        existingPending.MarkCancelled("Cancelled by user.");
        db.SubscriptionHistories.Add(SubscriptionHistory.Create(
            userId, existingPending.RequestedPlanId, activeSub?.PlanId ?? "plan-free",
            "UpgradeRequestCancelled", existingPending.BillingInterval, "Cancelled", userId,
            "User cancelled pending upgrade request; active plan preserved."));
        db.AuditLogs.Add(AuditLog.Create("SubscriptionRequestCancelled", "SubscriptionRequest", userId, oldValues: existingPending.RequestedPlanId, newValues: activeSub?.PlanId ?? "plan-free"));

        await db.SaveChangesAsync(cancellationToken);
        return Ok(new { Cancelled = true, ActivePlanId = activeSub?.PlanId ?? "plan-free", Message = "Pending upgrade request cancelled." });
    }

    [HttpPost("cancel")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> CancelPendingOrDowngrade(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        var existing = await db.UserSubscriptions.FirstOrDefaultAsync(s => s.UserId == userId, cancellationToken);
        var existingPending = await db.SubscriptionRequests.FirstOrDefaultAsync(
            r => r.UserId == userId && r.Status == SubscriptionRequestStatus.PendingApproval,
            cancellationToken);
        var previousPlanId = existing?.PlanId;

        if (existingPending != null)
        {
            existingPending.MarkCancelled("Cancelled together with downgrade to Free.");
        }

        if (existing == null)
        {
            existing = UserSubscription.Create(userId, "plan-free", SubscriptionStatus.Active, "Free", null, null, "FreeTier", "Returned to Free tier.");
            db.UserSubscriptions.Add(existing);
        }
        else
        {
            existing.UpdateAssignment("plan-free", SubscriptionStatus.Active, "Free", null, null, "FreeTier", "Cancelled subscription and reverted to Free tier.");
        }

        db.SubscriptionHistories.Add(SubscriptionHistory.Create(
            userId, "plan-free", previousPlanId, "RevertedToFree", "Free", "Active", userId, "User cancelled subscription and reverted to Free tier."));
        db.AuditLogs.Add(AuditLog.Create("SubscriptionRevertedToFree", "UserSubscription", userId, oldValues: previousPlanId, newValues: "plan-free"));
        await db.SaveChangesAsync(cancellationToken);

        return Ok(new { PlanId = "plan-free", Status = "Active" });
    }
}

public record SelectPlanRequest(string PlanId, string BillingInterval = "Monthly", string? Note = null);
