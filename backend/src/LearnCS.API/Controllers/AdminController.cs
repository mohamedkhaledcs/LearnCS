using System.Text.Json;
using LearnCS.Domain.Assessment;
using LearnCS.Domain.Curriculum;
using LearnCS.Domain.Gamification;
using LearnCS.Domain.Identity;
using LearnCS.Domain.Learning;
using LearnCS.Domain.Platform;
using LearnCS.Domain.Subscriptions;
using LearnCS.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.API.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin,SuperAdmin,ContentManager")]
public class AdminController(AppDbContext db) : ApiControllerBase
{
    private bool IsSuperAdmin() => User.IsInRole("SuperAdmin");

    private static List<string> TryReadList(string? json)
    {
        if (string.IsNullOrWhiteSpace(json)) return [];
        try { return JsonSerializer.Deserialize<List<string>>(json) ?? []; }
        catch { return []; }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // OVERVIEW & METRICS
    // ─────────────────────────────────────────────────────────────────────────
    [HttpGet("metrics")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetPlatformMetrics(CancellationToken cancellationToken)
    {
        var totalUsers = await db.Users.CountAsync(cancellationToken);
        var activeUsers = await db.Users.CountAsync(u => u.AccountStatus == AccountStatus.Active, cancellationToken);
        var suspendedUsers = await db.Users.CountAsync(u => u.AccountStatus == AccountStatus.Suspended, cancellationToken);
        var completedLessons = await db.LessonProgresses.CountAsync(p => p.Status == LessonProgressStatus.Completed, cancellationToken);
        var completedUnits = await db.UserUnitProgresses.CountAsync(
            p => p.Status == UnitProgressStatus.Completed || p.Status == UnitProgressStatus.Mastered, cancellationToken);
        var totalAssessments = await db.AssessmentAttempts.CountAsync(cancellationToken)
            + await db.UnitQuizAttempts.CountAsync(a => a.IsCompleted, cancellationToken);

        var pathsCount = await db.CurriculumPaths.CountAsync(cancellationToken);
        var unitsCount = await db.ReusableUnits.CountAsync(cancellationToken);
        var sectionsCount = await db.UnitSections.CountAsync(cancellationToken);
        var questionsCount = await db.QuestionBankItems.CountAsync(cancellationToken);

        var subs = await db.UserSubscriptions.AsNoTracking().ToListAsync(cancellationToken);
        var pendingApprovalsCount = await db.SubscriptionRequests.CountAsync(
            r => r.Status == SubscriptionRequestStatus.PendingApproval,
            cancellationToken);
        var usersWithoutExplicitSub = Math.Max(0, totalUsers - subs.Count);

        var freeCount = subs.Count(s => s.PlanId == "plan-free" && s.Status == SubscriptionStatus.Active) + usersWithoutExplicitSub;
        var miniCount = subs.Count(s => s.PlanId == "plan-mini" && s.Status == SubscriptionStatus.Active);
        var readyCount = subs.Count(s => s.PlanId == "plan-ready" && s.Status == SubscriptionStatus.Active);
        var highCount = subs.Count(s => s.PlanId == "plan-high" && s.Status == SubscriptionStatus.Active);
        var paidActiveCount = miniCount + readyCount + highCount;

        var recentUsers = await db.Users
            .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .OrderByDescending(u => u.CreatedAt)
            .Take(8)
            .AsNoTracking()
            .Select(u => new
            {
                u.Id,
                u.Username,
                u.Email,
                AccountStatus = u.AccountStatus.ToString(),
                Roles = u.UserRoles.Select(ur => ur.Role != null ? ur.Role.Name : "User").ToList(),
                u.CreatedAt,
                u.LastLoginAt
            })
            .ToListAsync(cancellationToken);

        return Ok(new
        {
            TotalUsers = totalUsers,
            ActiveUsers = activeUsers,
            SuspendedUsers = suspendedUsers,
            CompletedLessons = Math.Max(completedLessons, completedUnits),
            CompletedUnits = completedUnits,
            TotalAssessments = totalAssessments,
            CurriculumStats = new
            {
                Paths = pathsCount,
                Units = unitsCount,
                Sections = sectionsCount,
                Questions = questionsCount
            },
            PlanDistribution = new
            {
                Free = freeCount,
                Mini = miniCount,
                Ready = readyCount,
                High = highCount,
                Premium = paidActiveCount,
                PendingApprovals = pendingApprovalsCount
            },
            RecentUsers = recentUsers
        });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // USER, ROLE & GOVERNANCE MANAGEMENT
    // ─────────────────────────────────────────────────────────────────────────
    [HttpGet("users")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetUsers(
        [FromQuery] string? search,
        [FromQuery] string? role,
        [FromQuery] string? status,
        CancellationToken cancellationToken)
    {
        var query = db.Users
            .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .Include(u => u.Profile)
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(u => u.Username.ToLower().Contains(s) || u.Email.ToLower().Contains(s));
        }

        if (!string.IsNullOrWhiteSpace(status) && Enum.TryParse<AccountStatus>(status, true, out var parsedStatus))
        {
            query = query.Where(u => u.AccountStatus == parsedStatus);
        }

        var rawUsers = await query
            .OrderByDescending(u => u.CreatedAt)
            .Select(u => new
            {
                u.Id,
                u.Username,
                u.Email,
                u.EmailVerified,
                FullName = u.Profile != null ? $"{u.Profile.FirstName} {u.Profile.LastName}".Trim() : u.Username,
                AccountStatus = u.AccountStatus.ToString(),
                Roles = u.UserRoles.Select(ur => ur.Role != null ? ur.Role.Name : "User").ToList(),
                u.CreatedAt,
                u.LastLoginAt
            })
            .ToListAsync(cancellationToken);

        var userIds = rawUsers.Select(u => u.Id).ToList();
        var subscriptions = await db.UserSubscriptions
            .Include(s => s.Plan)
            .AsNoTracking()
            .Where(s => userIds.Contains(s.UserId))
            .ToDictionaryAsync(s => s.UserId, cancellationToken);

        var pendingReqs = await db.SubscriptionRequests
            .Include(r => r.RequestedPlan)
            .AsNoTracking()
            .Where(r => userIds.Contains(r.UserId) && r.Status == SubscriptionRequestStatus.PendingApproval)
            .ToDictionaryAsync(r => r.UserId, cancellationToken);

        var unitCompletionCounts = await db.UserUnitProgresses
            .AsNoTracking()
            .Where(p => userIds.Contains(p.UserId) && (p.Status == UnitProgressStatus.Completed || p.Status == UnitProgressStatus.Mastered))
            .GroupBy(p => p.UserId)
            .Select(g => new { UserId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.UserId, x => x.Count, cancellationToken);

        var users = rawUsers.Select(u =>
        {
            subscriptions.TryGetValue(u.Id, out var sub);
            pendingReqs.TryGetValue(u.Id, out var pendingReq);
            unitCompletionCounts.TryGetValue(u.Id, out var completedUnits);
            return new
            {
                u.Id,
                u.Username,
                u.Email,
                u.EmailVerified,
                u.FullName,
                u.AccountStatus,
                Roles = u.Roles.Count > 0 ? u.Roles : new List<string> { "User" },
                PlanId = sub?.PlanId ?? "plan-free",
                Plan = sub?.Plan?.Name ?? "Free",
                SubscriptionStatus = sub?.Status.ToString() ?? "Active",
                PendingPlanId = pendingReq?.RequestedPlanId,
                PendingPlanName = pendingReq?.RequestedPlan?.Name,
                CompletedUnits = completedUnits,
                u.CreatedAt,
                u.LastLoginAt
            };
        }).ToList();

        if (!string.IsNullOrWhiteSpace(role))
        {
            users = users.Where(u => u.Roles.Any(r => r.Equals(role, StringComparison.OrdinalIgnoreCase))).ToList();
        }

        return Ok(users);
    }

    [HttpPost("users")]
    [Authorize(Roles = "SuperAdmin")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateUserAccount([FromBody] CreateAdminUserRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new { message = "Username, email, and password are required." });
        if (request.Password.Length < 8)
            return BadRequest(new { message = "Password must be at least 8 characters." });

        var emailNorm = request.Email.Trim().ToLowerInvariant();
        var usernameNorm = request.Username.Trim().ToLowerInvariant();
        if (await db.Users.AnyAsync(u => u.Email == emailNorm || u.Username == usernameNorm, cancellationToken))
            return BadRequest(new { message = "A user with this email or username already exists." });

        var roleName = string.IsNullOrWhiteSpace(request.Role) ? "User" : request.Role.Trim();
        var role = await db.Roles.FirstOrDefaultAsync(r => r.Name.ToLower() == roleName.ToLower(), cancellationToken);
        if (role == null)
            return BadRequest(new { message = $"Role '{roleName}' does not exist." });

        var user = Domain.Identity.User.Create(usernameNorm, emailNorm, BCrypt.Net.BCrypt.HashPassword(request.Password));
        user.VerifyEmail();
        db.Users.Add(user);
        await db.SaveChangesAsync(cancellationToken);

        var nameParts = (request.FullName ?? request.Username).Trim().Split(' ', 2);
        db.UserProfiles.Add(UserProfile.Create(user.Id, nameParts[0], nameParts.Length > 1 ? nameParts[1] : ""));
        db.UserSettings.Add(UserSettings.CreateDefaults(user.Id));
        db.StudyStreaks.Add(StudyStreak.Create(user.Id));
        db.UserRoles.Add(UserRole.Create(user.Id, role.Id, GetUserId()));

        var planId = string.IsNullOrWhiteSpace(request.PlanId) ? "plan-free" : request.PlanId.Trim().ToLowerInvariant();
        var validPlan = await db.SubscriptionPlans.AnyAsync(p => p.Id == planId, cancellationToken) ? planId : "plan-free";
        db.UserSubscriptions.Add(UserSubscription.Create(
            user.Id, validPlan, SubscriptionStatus.Active, validPlan == "plan-free" ? "Free" : "AdminAssigned",
            assignedByUserId: GetUserId(), paymentStatus: validPlan == "plan-free" ? "FreeTier" : "AdminGranted"));

        db.AuditLogs.Add(AuditLog.Create(
            "UserCreatedByOwner", "User", user.Id, newValues: JsonSerializer.Serialize(new { user.Username, user.Email, Role = role.Name, PlanId = validPlan }),
            actorUserId: GetUserId(), details: $"Created account {user.Email} with role {role.Name}"));

        await db.SaveChangesAsync(cancellationToken);
        return Created($"/api/admin/users/{user.Id}", new { user.Id, user.Username, user.Email, Role = role.Name, PlanId = validPlan });
    }

    [HttpGet("users/{id:guid}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetUserDetail(Guid id, CancellationToken cancellationToken)
    {
        var user = await db.Users
            .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .Include(u => u.Profile)
            .Include(u => u.Settings)
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);

        if (user == null) return NotFound(new { message = "User not found." });

        var streak = await db.StudyStreaks.AsNoTracking().FirstOrDefaultAsync(s => s.UserId == id, cancellationToken);
        var completedLessons = await db.LessonProgresses.CountAsync(p => p.UserId == id && p.Status == LessonProgressStatus.Completed, cancellationToken);
        var completedUnits = await db.UserUnitProgresses.CountAsync(p => p.UserId == id && (p.Status == UnitProgressStatus.Completed || p.Status == UnitProgressStatus.Mastered), cancellationToken);
        var sub = await db.UserSubscriptions.Include(s => s.Plan).AsNoTracking().FirstOrDefaultAsync(s => s.UserId == id, cancellationToken);
        var roles = user.UserRoles.Select(ur => ur.Role != null ? ur.Role.Name : "User").ToList();
        var totalXp = await db.UserXpEvents.AsNoTracking().Where(x => x.UserId == id).SumAsync(x => (long)x.XpAmount, cancellationToken);

        var subHistory = await db.SubscriptionHistories.AsNoTracking()
            .Where(h => h.UserId == id)
            .OrderByDescending(h => h.CreatedAt)
            .Take(10)
            .ToListAsync(cancellationToken);

        return Ok(new
        {
            user.Id,
            user.Username,
            user.Email,
            user.EmailVerified,
            FullName = user.Profile != null ? $"{user.Profile.FirstName} {user.Profile.LastName}".Trim() : user.Username,
            Bio = user.Profile?.Bio,
            Headline = user.Profile?.DisplayName,
            AccountStatus = user.AccountStatus.ToString(),
            Roles = roles,
            PlanId = sub?.PlanId ?? "plan-free",
            Plan = sub?.Plan?.Name ?? "Free",
            SubscriptionStatus = sub?.Status.ToString() ?? "Active",
            user.CreatedAt,
            user.LastLoginAt,
            TotalXp = totalXp,
            CurrentStreak = streak?.CurrentStreak ?? 0,
            LongestStreak = streak?.LongestStreak ?? 0,
            CompletedLessonsCount = Math.Max(completedLessons, completedUnits),
            CompletedUnitsCount = completedUnits,
            SubscriptionHistory = subHistory
        });
    }

    [HttpPut("users/{id:guid}/status")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateUserStatus(Guid id, [FromBody] UpdateStatusRequest request, CancellationToken cancellationToken)
    {
        var user = await db.Users
            .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
        if (user == null) return NotFound(new { message = "User not found." });

        var actorId = GetUserId();
        var oldStatus = user.AccountStatus.ToString();
        var targetIsSuperAdmin = user.UserRoles.Any(ur => ur.Role?.Name == "SuperAdmin");

        if (string.Equals(request.Status, "Suspended", StringComparison.OrdinalIgnoreCase))
        {
            if (id == actorId)
                return BadRequest(new { message = "You cannot suspend your own account." });
            if (targetIsSuperAdmin && !IsSuperAdmin())
                return Forbid();
            if (targetIsSuperAdmin)
            {
                var activeSuperAdmins = await db.UserRoles.CountAsync(
                    ur => ur.Role != null && ur.Role.Name == "SuperAdmin" && ur.User != null && ur.User.AccountStatus == AccountStatus.Active,
                    cancellationToken);
                if (activeSuperAdmins <= 1)
                    return BadRequest(new { message = "Cannot suspend the last active SuperAdmin." });
            }
            user.Suspend();
        }
        else if (string.Equals(request.Status, "Active", StringComparison.OrdinalIgnoreCase))
        {
            user.Activate();
        }
        else
        {
            return BadRequest(new { message = "Unsupported status value. Use Active or Suspended." });
        }

        db.AuditLogs.Add(AuditLog.Create(
            "UserStatusUpdated", "User", user.Id, oldValues: oldStatus, newValues: user.AccountStatus.ToString(),
            actorUserId: actorId, details: $"Status changed from {oldStatus} to {user.AccountStatus}"));
        await db.SaveChangesAsync(cancellationToken);

        return Ok(new { user.Id, AccountStatus = user.AccountStatus.ToString() });
    }

    [HttpPut("users/{id:guid}/role")]
    [Authorize(Roles = "SuperAdmin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateUserRole(Guid id, [FromBody] UpdateRoleRequest request, CancellationToken cancellationToken)
    {
        var user = await db.Users
            .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
        if (user == null) return NotFound(new { message = "User not found." });

        var role = await db.Roles.FirstOrDefaultAsync(r => r.Name.ToLower() == request.Role.Trim().ToLower(), cancellationToken);
        if (role == null) return BadRequest(new { message = $"Role '{request.Role}' does not exist." });

        var oldRoles = user.UserRoles.Select(ur => ur.Role?.Name ?? "User").ToList();
        var wasSuperAdmin = oldRoles.Any(r => r.Equals("SuperAdmin", StringComparison.OrdinalIgnoreCase));
        var willKeepSuperAdmin = role.Name.Equals("SuperAdmin", StringComparison.OrdinalIgnoreCase);

        if (wasSuperAdmin && !willKeepSuperAdmin)
        {
            var superAdminCount = await db.UserRoles.CountAsync(
                ur => ur.Role != null && ur.Role.Name == "SuperAdmin" && ur.User != null && ur.User.AccountStatus == AccountStatus.Active,
                cancellationToken);
            if (superAdminCount <= 1)
            {
                return BadRequest(new { message = "Cannot remove SuperAdmin from the last active Platform Owner." });
            }
        }

        db.UserRoles.RemoveRange(user.UserRoles);
        var actorId = GetUserId();
        db.UserRoles.Add(UserRole.Create(user.Id, role.Id, actorId));
        if (role.Name == "SuperAdmin")
        {
            var adminRole = await db.Roles.FirstOrDefaultAsync(r => r.Name == "Admin", cancellationToken);
            if (adminRole != null) db.UserRoles.Add(UserRole.Create(user.Id, adminRole.Id, actorId));
        }

        db.AuditLogs.Add(AuditLog.Create(
            "UserRoleUpdated", "User", user.Id,
            oldValues: string.Join(",", oldRoles),
            newValues: role.Name,
            actorUserId: actorId,
            details: $"Changed roles for {user.Email} from [{string.Join(", ", oldRoles)}] to {role.Name}"));

        await db.SaveChangesAsync(cancellationToken);

        return Ok(new { user.Id, Role = role.Name });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SUBSCRIPTION MANAGEMENT
    // ─────────────────────────────────────────────────────────────────────────
    [HttpPut("users/{id:guid}/subscription")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateUserSubscription(Guid id, [FromBody] UpdateSubscriptionRequest request, CancellationToken cancellationToken)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
        if (user == null) return NotFound(new { message = "User not found." });

        var planKey = request.Plan.Trim().ToLowerInvariant();
        var matchedPlan = await db.SubscriptionPlans.FirstOrDefaultAsync(
            p => p.Id == planKey || p.Name.ToLower() == planKey || (planKey == "premium" && p.Id == "plan-ready"),
            cancellationToken);
        if (matchedPlan == null)
            return BadRequest(new { message = $"Subscription plan '{request.Plan}' was not found." });

        var actorId = GetUserId();
        var existing = await db.UserSubscriptions.FirstOrDefaultAsync(s => s.UserId == id, cancellationToken);
        var previousPlanId = existing?.PlanId;

        var targetStatus = Enum.TryParse<SubscriptionStatus>(request.Status ?? "Active", true, out var parsed)
            ? parsed
            : SubscriptionStatus.Active;
        var interval = string.IsNullOrWhiteSpace(request.BillingInterval) ? "AdminAssigned" : request.BillingInterval;

        var pendingRequest = await db.SubscriptionRequests.FirstOrDefaultAsync(
            r => r.UserId == id && r.Status == SubscriptionRequestStatus.PendingApproval,
            cancellationToken);

        if (targetStatus == SubscriptionStatus.Cancelled && pendingRequest != null)
        {
            // Rejecting a pending upgrade request must preserve any existing active subscription!
            pendingRequest.Reject(actorId, request.Note ?? "Upgrade request rejected by Admin.");
            db.SubscriptionHistories.Add(SubscriptionHistory.Create(
                id, pendingRequest.RequestedPlanId, existing?.PlanId ?? "plan-free",
                "UpgradeRequestRejected", pendingRequest.BillingInterval, "Rejected", actorId,
                request.Note ?? "Upgrade request rejected; existing plan preserved."));
            db.AuditLogs.Add(AuditLog.Create(
                "SubscriptionRequestRejected", "SubscriptionRequest", user.Id, oldValues: pendingRequest.RequestedPlanId,
                newValues: existing?.PlanId ?? "plan-free", actorUserId: actorId, details: "Rejected pending upgrade request."));
            await db.SaveChangesAsync(cancellationToken);

            return Ok(new
            {
                user.Id,
                PlanId = existing?.PlanId ?? "plan-free",
                Plan = existing?.PlanId ?? "plan-free",
                Status = existing?.Status.ToString() ?? "Active",
                RequestStatus = "Rejected"
            });
        }

        if (existing == null)
        {
            existing = UserSubscription.Create(
                id, matchedPlan.Id, targetStatus, interval, request.ExpiresAt, actorId,
                matchedPlan.MonthlyPrice == 0m ? "FreeTier" : "AdminGranted", request.Note);
            db.UserSubscriptions.Add(existing);
        }
        else
        {
            existing.UpdateAssignment(
                matchedPlan.Id, targetStatus, interval, request.ExpiresAt, actorId,
                matchedPlan.MonthlyPrice == 0m ? "FreeTier" : "AdminGranted", request.Note);
        }

        if (pendingRequest != null && targetStatus == SubscriptionStatus.Active)
        {
            pendingRequest.Approve(actorId, request.Note ?? $"Approved plan {matchedPlan.Name}.");
        }

        db.SubscriptionHistories.Add(SubscriptionHistory.Create(
            id, matchedPlan.Id, previousPlanId, "AdminAssigned", interval, targetStatus.ToString(), actorId, request.Note));
        db.AuditLogs.Add(AuditLog.Create(
            "SubscriptionAssigned", "UserSubscription", user.Id, oldValues: previousPlanId, newValues: matchedPlan.Id,
            actorUserId: actorId, details: $"Assigned plan {matchedPlan.Name} ({targetStatus})"));

        await db.SaveChangesAsync(cancellationToken);
        return Ok(new { user.Id, PlanId = matchedPlan.Id, Plan = matchedPlan.Name, Status = targetStatus.ToString() });
    }

    [HttpPost("subscriptions/requests/{requestId:guid}/approve")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ApproveSubscriptionRequest(
        Guid requestId,
        [FromBody] ReviewSubscriptionRequestBody? body,
        CancellationToken cancellationToken)
    {
        var req = await db.SubscriptionRequests
            .Include(r => r.RequestedPlan)
            .FirstOrDefaultAsync(r => r.Id == requestId, cancellationToken);
        if (req == null) return NotFound(new { message = "Subscription request not found." });
        if (req.Status != SubscriptionRequestStatus.PendingApproval)
            return BadRequest(new { message = $"Request is already in state '{req.Status}'." });

        var actorId = GetUserId();
        var existing = await db.UserSubscriptions.FirstOrDefaultAsync(s => s.UserId == req.UserId, cancellationToken);
        var prevPlan = existing?.PlanId ?? "plan-free";
        var expiresAt = req.BillingInterval.Equals("Annual", StringComparison.OrdinalIgnoreCase)
            ? DateTime.UtcNow.AddYears(1)
            : DateTime.UtcNow.AddMonths(1);

        if (existing == null)
        {
            existing = UserSubscription.Create(
                req.UserId, req.RequestedPlanId, SubscriptionStatus.Active, req.BillingInterval,
                expiresAt, actorId, "Approved", body?.Note);
            db.UserSubscriptions.Add(existing);
        }
        else
        {
            existing.UpdateAssignment(
                req.RequestedPlanId, SubscriptionStatus.Active, req.BillingInterval,
                expiresAt, actorId, "Approved", body?.Note ?? $"Approved upgrade to {req.RequestedPlan?.Name ?? req.RequestedPlanId}.");
        }

        req.Approve(actorId, body?.Note);
        db.SubscriptionHistories.Add(SubscriptionHistory.Create(
            req.UserId, req.RequestedPlanId, prevPlan, "UpgradeRequestApproved",
            req.BillingInterval, "Active", actorId, body?.Note ?? "Approved by Admin."));
        db.AuditLogs.Add(AuditLog.Create(
            "SubscriptionRequestApproved", "SubscriptionRequest", req.UserId,
            oldValues: prevPlan, newValues: req.RequestedPlanId, actorUserId: actorId,
            details: $"Approved upgrade request {req.Id} for plan {req.RequestedPlanId}."));

        await db.SaveChangesAsync(cancellationToken);
        return Ok(new
        {
            RequestId = req.Id,
            req.UserId,
            PlanId = existing.PlanId,
            Status = existing.Status.ToString(),
            RequestStatus = req.Status.ToString()
        });
    }

    [HttpPost("subscriptions/requests/{requestId:guid}/reject")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RejectSubscriptionRequest(
        Guid requestId,
        [FromBody] ReviewSubscriptionRequestBody? body,
        CancellationToken cancellationToken)
    {
        var req = await db.SubscriptionRequests.FirstOrDefaultAsync(r => r.Id == requestId, cancellationToken);
        if (req == null) return NotFound(new { message = "Subscription request not found." });
        if (req.Status != SubscriptionRequestStatus.PendingApproval)
            return BadRequest(new { message = $"Request is already in state '{req.Status}'." });

        var actorId = GetUserId();
        var existingSub = await db.UserSubscriptions.AsNoTracking().FirstOrDefaultAsync(s => s.UserId == req.UserId, cancellationToken);
        var activePlanId = existingSub?.PlanId ?? "plan-free";

        req.Reject(actorId, body?.Note);
        db.SubscriptionHistories.Add(SubscriptionHistory.Create(
            req.UserId, req.RequestedPlanId, activePlanId, "UpgradeRequestRejected",
            req.BillingInterval, "Rejected", actorId, body?.Note ?? "Rejected by Admin; active plan preserved."));
        db.AuditLogs.Add(AuditLog.Create(
            "SubscriptionRequestRejected", "SubscriptionRequest", req.UserId,
            oldValues: req.RequestedPlanId, newValues: activePlanId, actorUserId: actorId,
            details: $"Rejected upgrade request {req.Id}; preserved active plan {activePlanId}."));

        await db.SaveChangesAsync(cancellationToken);
        return Ok(new
        {
            RequestId = req.Id,
            req.UserId,
            ActivePlanId = activePlanId,
            RequestStatus = req.Status.ToString()
        });
    }

    [HttpGet("subscriptions")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetSubscriptions(CancellationToken cancellationToken)
    {
        var totalUsers = await db.Users.CountAsync(cancellationToken);
        var plans = await db.SubscriptionPlans.OrderBy(p => p.DisplayOrder).AsNoTracking().ToListAsync(cancellationToken);
        var subs = await db.UserSubscriptions.AsNoTracking().ToListAsync(cancellationToken);
        var pendingReqs = await db.SubscriptionRequests
            .AsNoTracking()
            .Where(r => r.Status == SubscriptionRequestStatus.PendingApproval)
            .ToListAsync(cancellationToken);
        var assignedUsers = subs.Select(s => s.UserId).ToHashSet();
        var implicitFreeUsers = Math.Max(0, totalUsers - assignedUsers.Count);

        var result = plans.Select(p =>
        {
            var activeCount = subs.Count(s => s.PlanId == p.Id && s.Status == SubscriptionStatus.Active);
            var pendingCount = pendingReqs.Count(r => r.RequestedPlanId == p.Id);
            if (p.Id == "plan-free") activeCount += implicitFreeUsers;
            return new
            {
                p.Id,
                p.Name,
                p.Badge,
                p.DescriptionEn,
                p.DescriptionAr,
                Price = p.MonthlyPrice,
                p.OriginalMonthlyPrice,
                p.AnnualPrice,
                p.OriginalAnnualPrice,
                BillingInterval = "Monthly",
                Features = TryReadList(p.FeaturesEnJson),
                FeaturesAr = TryReadList(p.FeaturesArJson),
                p.IsPopular,
                p.IsActive,
                SubscribersCount = activeCount,
                PendingRequestsCount = pendingCount
            };
        });

        return Ok(result);
    }

    [HttpPut("subscriptions/plans/{planId}")]
    [Authorize(Roles = "SuperAdmin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateSubscriptionPlan(string planId, [FromBody] UpdateSubscriptionPlanRequest request, CancellationToken cancellationToken)
    {
        var plan = await db.SubscriptionPlans.FirstOrDefaultAsync(p => p.Id == planId.Trim().ToLowerInvariant(), cancellationToken);
        if (plan == null) return NotFound(new { message = "Plan not found." });

        plan.Update(
            request.Name,
            request.Badge,
            request.DescriptionEn,
            request.DescriptionAr,
            request.MonthlyPrice,
            request.OriginalMonthlyPrice,
            request.AnnualPrice,
            request.OriginalAnnualPrice,
            JsonSerializer.Serialize(request.FeaturesEn ?? []),
            JsonSerializer.Serialize(request.FeaturesAr ?? []),
            plan.EntitlementsJson,
            request.IsPopular,
            request.IsActive,
            request.DisplayOrder
        );

        db.AuditLogs.Add(AuditLog.Create(
            "SubscriptionPlanUpdated", "SubscriptionPlan", GetUserId(), newValues: plan.Id,
            actorUserId: GetUserId(), details: $"Updated plan {plan.Name} pricing (${plan.MonthlyPrice}/mo)"));
        await db.SaveChangesAsync(cancellationToken);

        return Ok(new { plan.Id, plan.Name, plan.MonthlyPrice, plan.OriginalMonthlyPrice, plan.IsActive });
    }

    [HttpGet("subscriptions/history")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetSubscriptionHistory(CancellationToken cancellationToken)
    {
        var history = await db.SubscriptionHistories
            .OrderByDescending(h => h.CreatedAt)
            .Take(50)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
        var userIds = history.Select(h => h.UserId).Distinct().ToList();
        var userEmails = await db.Users.AsNoTracking()
            .Where(u => userIds.Contains(u.Id))
            .ToDictionaryAsync(u => u.Id, u => new { u.Username, u.Email }, cancellationToken);

        var pendingReqs = await db.SubscriptionRequests
            .Include(r => r.RequestedPlan)
            .AsNoTracking()
            .Where(r => r.Status == SubscriptionRequestStatus.PendingApproval)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync(cancellationToken);
        var pendingUserIds = pendingReqs.Select(r => r.UserId).Distinct().ToList();
        var pendingUsers = await db.Users.AsNoTracking()
            .Where(u => pendingUserIds.Contains(u.Id))
            .ToDictionaryAsync(u => u.Id, u => new { u.Username, u.Email }, cancellationToken);

        return Ok(new
        {
            PendingRequests = pendingReqs.Select(r => new
            {
                r.Id,
                r.UserId,
                UserEmail = pendingUsers.TryGetValue(r.UserId, out var u) ? u.Email : "",
                Username = u != null ? u.Username : "",
                PlanId = r.RequestedPlanId,
                PlanName = r.RequestedPlan?.Name ?? r.RequestedPlanId,
                r.PreviousActivePlanId,
                r.BillingInterval,
                Status = r.Status.ToString(),
                r.Notes,
                RequestedAt = r.CreatedAt
            }),
            History = history.Select(h => new
            {
                h.Id,
                h.UserId,
                UserEmail = userEmails.TryGetValue(h.UserId, out var u) ? u.Email : "",
                h.PlanId,
                h.PreviousPlanId,
                h.Action,
                h.BillingInterval,
                h.Status,
                h.Notes,
                h.CreatedAt
            })
        });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CURRICULUM & QUESTION BANK MANAGEMENT
    // ─────────────────────────────────────────────────────────────────────────
    [HttpGet("curriculum")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCurriculumOverview(CancellationToken cancellationToken)
    {
        var paths = await db.CurriculumPaths
            .OrderBy(p => p.DisplayOrder)
            .Include(p => p.Modules.OrderBy(m => m.DisplayOrder))
                .ThenInclude(m => m.Placements.OrderBy(pl => pl.DisplayOrder))
                    .ThenInclude(pl => pl.Unit)
                        .ThenInclude(u => u!.Sections.OrderBy(s => s.DisplayOrder))
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var questionCountsByUnit = await db.UnitQuestionMappings
            .AsNoTracking()
            .GroupBy(m => m.UnitId)
            .Select(g => new { UnitId = g.Key, Count = g.Select(x => x.QuestionId).Distinct().Count() })
            .ToDictionaryAsync(x => x.UnitId, x => x.Count, cancellationToken);

        return Ok(paths.Select(p =>
        {
            var uniqueUnits = p.Modules.SelectMany(m => m.Placements).Select(pl => pl.UnitId).Distinct().Count();
            return new
            {
                p.Id,
                p.TitleEn,
                p.TitleAr,
                p.DescriptionEn,
                p.DescriptionAr,
                p.Category,
                p.DisplayOrder,
                PublishStatus = p.PublishStatus.ToString(),
                ModulesCount = p.Modules.Count,
                UnitsCount = uniqueUnits,
                Modules = p.Modules.OrderBy(m => m.DisplayOrder).Select(m => new
                {
                    m.Id,
                    m.TitleEn,
                    m.TitleAr,
                    m.DescriptionEn,
                    m.DescriptionAr,
                    m.DisplayOrder,
                    Units = m.Placements.OrderBy(pl => pl.DisplayOrder).Where(pl => pl.Unit != null).Select(pl =>
                    {
                        var u = pl.Unit!;
                        questionCountsByUnit.TryGetValue(u.Id, out var qCount);
                        return new
                        {
                            u.Id,
                            u.ConceptId,
                            u.TitleEn,
                            u.TitleAr,
                            u.DescriptionEn,
                            u.DescriptionAr,
                            u.Difficulty,
                            u.EstimatedMinutes,
                            u.Version,
                            u.IsFreeTier,
                            u.QuizPassPercentage,
                            u.QuizQuestionCount,
                            PublishStatus = u.PublishStatus.ToString(),
                            MappedQuestionsCount = qCount,
                            Sections = u.Sections.OrderBy(s => s.DisplayOrder).Select(s => new
                            {
                                s.Id,
                                s.Type,
                                s.TitleEn,
                                s.TitleAr,
                                s.ContentEn,
                                s.ContentAr,
                                s.DisplayOrder,
                                s.IsRequired,
                                s.CodeSnippet,
                                s.CodeLanguage,
                                s.InteractiveModuleId
                            })
                        };
                    })
                })
            };
        }));
    }

    [HttpPut("curriculum/units/{unitId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateReusableUnit(string unitId, [FromBody] AdminUpdateUnitRequest request, CancellationToken cancellationToken)
    {
        var unit = await db.ReusableUnits.FirstOrDefaultAsync(u => u.Id == unitId.Trim().ToLowerInvariant(), cancellationToken);
        if (unit == null) return NotFound(new { message = $"Unit '{unitId}' not found." });

        var publishStatus = Enum.TryParse<ContentPublishStatus>(request.PublishStatus ?? "Published", true, out var ps)
            ? ps
            : unit.PublishStatus;

        unit.UpdateMetadata(
            request.TitleEn ?? unit.TitleEn,
            request.TitleAr ?? unit.TitleAr,
            request.DescriptionEn ?? unit.DescriptionEn,
            request.DescriptionAr ?? unit.DescriptionAr,
            request.Difficulty ?? unit.Difficulty,
            request.EstimatedMinutes ?? unit.EstimatedMinutes,
            request.Tags != null ? JsonSerializer.Serialize(request.Tags) : unit.TagsJson,
            unit.PrerequisitesJson,
            unit.InteractiveModuleIdsJson,
            unit.ExternalReferencesJson,
            unit.ObjectivesEnJson,
            unit.ObjectivesArJson,
            request.IsFreeTier ?? unit.IsFreeTier,
            request.QuizPassPercentage ?? unit.QuizPassPercentage,
            request.QuizQuestionCount ?? unit.QuizQuestionCount,
            publishStatus
        );

        db.AuditLogs.Add(AuditLog.Create(
            "CurriculumUnitUpdated", "ReusableUnit", GetUserId(), newValues: unit.Id,
            actorUserId: GetUserId(), details: $"Updated unit {unit.Id} (v{unit.Version})"));
        await db.SaveChangesAsync(cancellationToken);

        return Ok(new { unit.Id, unit.TitleEn, unit.TitleAr, unit.Difficulty, unit.EstimatedMinutes, unit.Version, PublishStatus = unit.PublishStatus.ToString() });
    }

    [HttpPost("curriculum/sections")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> CreateUnitSection([FromBody] AdminUpsertSectionRequest request, CancellationToken cancellationToken)
    {
        var unitId = request.UnitId.Trim().ToLowerInvariant();
        if (!await db.ReusableUnits.AnyAsync(u => u.Id == unitId, cancellationToken))
            return NotFound(new { message = $"Unit '{unitId}' not found." });

        var id = string.IsNullOrWhiteSpace(request.Id) ? $"{unitId}-sec-{Guid.NewGuid().ToString()[..6]}" : request.Id.Trim();
        var section = UnitSection.Create(
            id,
            unitId,
            request.Type ?? "theory",
            request.TitleEn,
            request.TitleAr,
            request.ContentEn,
            request.ContentAr,
            request.DisplayOrder,
            request.IsRequired,
            request.CodeSnippet,
            request.CodeLanguage,
            request.CodeExplanationEn,
            request.CodeExplanationAr,
            request.ExpectedOutput,
            request.InteractiveModuleId
        );
        db.UnitSections.Add(section);
        db.AuditLogs.Add(AuditLog.Create("UnitSectionCreated", "UnitSection", GetUserId(), newValues: id, actorUserId: GetUserId(), details: $"Added section {id} to {unitId}"));
        await db.SaveChangesAsync(cancellationToken);
        return Created($"/api/curriculum/units/{unitId}", new { section.Id, section.UnitId, section.TitleEn, section.TitleAr, section.DisplayOrder });
    }

    [HttpPut("curriculum/sections/{sectionId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateUnitSection(string sectionId, [FromBody] AdminUpsertSectionRequest request, CancellationToken cancellationToken)
    {
        var section = await db.UnitSections.FirstOrDefaultAsync(s => s.Id == sectionId, cancellationToken);
        if (section == null) return NotFound(new { message = $"Section '{sectionId}' not found." });

        section.Update(
            request.Type ?? section.Type,
            request.TitleEn,
            request.TitleAr,
            request.ContentEn,
            request.ContentAr,
            request.DisplayOrder,
            request.IsRequired,
            request.CodeSnippet,
            request.CodeLanguage,
            request.CodeExplanationEn,
            request.CodeExplanationAr,
            request.ExpectedOutput,
            request.InteractiveModuleId,
            section.InlineQuestionsJson
        );
        db.AuditLogs.Add(AuditLog.Create("UnitSectionUpdated", "UnitSection", GetUserId(), newValues: section.Id, actorUserId: GetUserId(), details: $"Updated section {section.Id}"));
        await db.SaveChangesAsync(cancellationToken);
        return Ok(new { section.Id, section.UnitId, section.TitleEn, section.TitleAr, section.DisplayOrder });
    }

    [HttpGet("questions")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetQuestions(
        [FromQuery] string? domain,
        [FromQuery] string? topic,
        [FromQuery] string? difficulty,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 50,
        CancellationToken cancellationToken = default)
    {
        var query = db.QuestionBankItems
            .Include(q => q.Options.OrderBy(o => o.DisplayOrder))
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(domain))
            query = query.Where(q => q.Domain.ToLower() == domain.Trim().ToLower());
        if (!string.IsNullOrWhiteSpace(topic))
            query = query.Where(q => q.Topic.ToLower().Contains(topic.Trim().ToLower()));
        if (!string.IsNullOrWhiteSpace(difficulty))
            query = query.Where(q => q.Difficulty == difficulty.Trim().ToLower());
        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(q => q.QuestionEn.ToLower().Contains(s) || q.QuestionAr.ToLower().Contains(s) || q.Subtopic.ToLower().Contains(s));
        }

        var total = await query.CountAsync(cancellationToken);
        var clampedPageSize = Math.Clamp(pageSize, 10, 100);
        var items = await query
            .OrderBy(q => q.Domain).ThenBy(q => q.Topic).ThenBy(q => q.Subtopic).ThenBy(q => q.Id)
            .Skip((Math.Max(1, page) - 1) * clampedPageSize)
            .Take(clampedPageSize)
            .ToListAsync(cancellationToken);

        return Ok(new
        {
            Total = total,
            Page = Math.Max(1, page),
            PageSize = clampedPageSize,
            Items = items.Select(q => new
            {
                q.Id,
                q.Domain,
                q.Topic,
                q.Subtopic,
                q.Difficulty,
                q.QuestionType,
                q.QuestionEn,
                q.QuestionAr,
                q.ExplanationEn,
                q.ExplanationAr,
                q.CodeSnippet,
                q.CodeLanguage,
                PublishStatus = q.PublishStatus.ToString(),
                Options = q.Options.Select(o => new { o.OptionKey, o.TextEn, o.TextAr, o.IsCorrect })
            })
        });
    }

    [HttpPost("questions")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateQuestion([FromBody] AdminUpsertQuestionRequest request, CancellationToken cancellationToken)
    {
        if (request.Options == null || request.Options.Count < 2 || !request.Options.Any(o => o.IsCorrect))
            return BadRequest(new { message = "At least 2 options and 1 correct option are required." });

        var id = string.IsNullOrWhiteSpace(request.Id) ? $"q-custom-{Guid.NewGuid().ToString()[..8]}" : request.Id.Trim();
        if (await db.QuestionBankItems.AnyAsync(q => q.Id == id, cancellationToken))
            return BadRequest(new { message = $"Question ID '{id}' already exists." });

        var item = QuestionBankItem.Create(
            id, request.Domain, request.Topic, request.Subtopic, request.Difficulty,
            request.QuestionType ?? "concept", request.QuestionEn, request.QuestionAr,
            request.ExplanationEn, request.ExplanationAr, request.CodeSnippet, request.CodeLanguage);
        db.QuestionBankItems.Add(item);

        var order = 0;
        foreach (var opt in request.Options)
        {
            db.QuestionBankOptions.Add(QuestionBankOption.Create(id, opt.Key, opt.TextEn, opt.TextAr, opt.IsCorrect, order++));
        }

        if (!string.IsNullOrWhiteSpace(request.AttachToUnitId))
        {
            var unitId = request.AttachToUnitId.Trim().ToLowerInvariant();
            if (await db.ReusableUnits.AnyAsync(u => u.Id == unitId, cancellationToken))
            {
                db.UnitQuestionMappings.Add(UnitQuestionMapping.Create(unitId, id, request.AttachToSectionId, 999));
            }
        }

        db.AuditLogs.Add(AuditLog.Create("QuestionCreated", "QuestionBankItem", GetUserId(), newValues: id, actorUserId: GetUserId(), details: $"Created question {id} in {request.Domain}/{request.Subtopic}"));
        await db.SaveChangesAsync(cancellationToken);
        return Created($"/api/admin/questions", new { item.Id, item.Domain, item.Topic, item.Subtopic });
    }

    [HttpDelete("questions/{questionId}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteQuestion(string questionId, CancellationToken cancellationToken)
    {
        var item = await db.QuestionBankItems.FirstOrDefaultAsync(q => q.Id == questionId, cancellationToken);
        if (item == null) return NotFound(new { message = "Question not found." });

        db.QuestionBankItems.Remove(item);
        db.AuditLogs.Add(AuditLog.Create("QuestionDeleted", "QuestionBankItem", GetUserId(), oldValues: questionId, actorUserId: GetUserId(), details: $"Deleted question {questionId}"));
        await db.SaveChangesAsync(cancellationToken);
        return Ok(new { Deleted = questionId });
    }

    [HttpGet("coverage")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCoverageReport(CancellationToken cancellationToken)
    {
        var byDomain = await db.QuestionBankItems.AsNoTracking()
            .GroupBy(q => q.Domain)
            .Select(g => new
            {
                Domain = g.Key,
                Total = g.Count(),
                Easy = g.Count(x => x.Difficulty == "easy"),
                Medium = g.Count(x => x.Difficulty == "medium"),
                Hard = g.Count(x => x.Difficulty == "hard"),
                SubtopicsCount = g.Select(x => x.Subtopic).Distinct().Count()
            })
            .OrderByDescending(x => x.Total)
            .ToListAsync(cancellationToken);

        var unitCoverage = await db.ReusableUnits.AsNoTracking()
            .Select(u => new
            {
                u.Id,
                u.TitleEn,
                SectionsCount = u.Sections.Count,
                MappedQuestionsCount = u.QuestionMappings.Count
            })
            .ToListAsync(cancellationToken);

        return Ok(new
        {
            TotalQuestions = byDomain.Sum(d => d.Total),
            TotalDomains = byDomain.Count,
            TotalUnits = unitCoverage.Count,
            UnitsWithQuestions = unitCoverage.Count(u => u.MappedQuestionsCount > 0),
            Domains = byDomain,
            UnitsNeedingQuestions = unitCoverage.Where(u => u.MappedQuestionsCount == 0).ToList()
        });
    }

    [HttpGet("audit-logs")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAuditLogs([FromQuery] int limit = 60, CancellationToken cancellationToken = default)
    {
        var logs = await db.AuditLogs
            .AsNoTracking()
            .OrderByDescending(a => a.CreatedAt)
            .Take(Math.Clamp(limit, 10, 200))
            .ToListAsync(cancellationToken);

        var actorIds = logs.Select(l => l.ActorUserId ?? l.UserId).Where(id => id.HasValue).Select(id => id!.Value).Distinct().ToList();
        var actors = await db.Users.AsNoTracking()
            .Where(u => actorIds.Contains(u.Id))
            .ToDictionaryAsync(u => u.Id, u => u.Email, cancellationToken);

        return Ok(logs.Select(a =>
        {
            var resolvedActor = a.ActorUserId ?? a.UserId;
            return new
            {
                a.Id,
                a.Action,
                a.EntityType,
                a.EntityId,
                ActorEmail = resolvedActor.HasValue && actors.TryGetValue(resolvedActor.Value, out var email) ? email : null,
                a.Details,
                a.OldValuesJson,
                a.NewValuesJson,
                a.CreatedAt
            };
        }));
    }
}

public record UpdateStatusRequest(string Status);
public record UpdateRoleRequest(string Role);
public record UpdateSubscriptionRequest(string Plan, string? Status = "Active", string? BillingInterval = "AdminAssigned", DateTime? ExpiresAt = null, string? Note = null);
public record CreateAdminUserRequest(string Username, string Email, string Password, string? FullName = null, string? Role = "User", string? PlanId = "plan-free");
public record UpdateSubscriptionPlanRequest(
    string Name,
    string? Badge,
    string DescriptionEn,
    string DescriptionAr,
    decimal MonthlyPrice,
    decimal? OriginalMonthlyPrice,
    decimal AnnualPrice,
    decimal? OriginalAnnualPrice,
    List<string>? FeaturesEn,
    List<string>? FeaturesAr,
    bool IsPopular,
    bool IsActive,
    int DisplayOrder
);
public record AdminUpdateUnitRequest(
    string? TitleEn = null,
    string? TitleAr = null,
    string? DescriptionEn = null,
    string? DescriptionAr = null,
    string? Difficulty = null,
    int? EstimatedMinutes = null,
    List<string>? Tags = null,
    bool? IsFreeTier = null,
    int? QuizPassPercentage = null,
    int? QuizQuestionCount = null,
    string? PublishStatus = null
);
public record AdminUpsertSectionRequest(
    string? Id,
    string UnitId,
    string? Type,
    string TitleEn,
    string TitleAr,
    string ContentEn,
    string ContentAr,
    int DisplayOrder,
    bool IsRequired = true,
    string? CodeSnippet = null,
    string? CodeLanguage = null,
    string? CodeExplanationEn = null,
    string? CodeExplanationAr = null,
    string? ExpectedOutput = null,
    string? InteractiveModuleId = null
);
public record AdminQuestionOptionInput(string Key, string TextEn, string TextAr, bool IsCorrect);
public record AdminUpsertQuestionRequest(
    string? Id,
    string Domain,
    string Topic,
    string Subtopic,
    string Difficulty,
    string? QuestionType,
    string QuestionEn,
    string QuestionAr,
    string? ExplanationEn,
    string? ExplanationAr,
    string? CodeSnippet,
    string? CodeLanguage,
    List<AdminQuestionOptionInput> Options,
    string? AttachToUnitId = null,
    string? AttachToSectionId = null
);
public record ReviewSubscriptionRequestBody(string? Note = null);
