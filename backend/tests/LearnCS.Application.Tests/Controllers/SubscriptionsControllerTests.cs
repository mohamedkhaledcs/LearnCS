using System.Security.Claims;
using LearnCS.API.Controllers;
using LearnCS.Domain.Identity;
using LearnCS.Domain.Subscriptions;
using LearnCS.Infrastructure.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace LearnCS.Application.Tests.Controllers;

public class SubscriptionsControllerTests : IDisposable
{
    private readonly AppDbContext _db;
    private readonly SubscriptionsController _subsController;
    private readonly AdminController _adminController;

    public SubscriptionsControllerTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase($"SubTests_{Guid.NewGuid()}")
            .Options;
        _db = new AppDbContext(options);

        SeedPlans(_db);
        _subsController = new SubscriptionsController(_db);
        _adminController = new AdminController(_db);
    }

    public void Dispose() => _db.Dispose();

    private static void SeedPlans(AppDbContext db)
    {
        db.SubscriptionPlans.AddRange(
            SubscriptionPlan.Create("plan-free", "Free", "Free", "مجاني", 0m, null, 0m, null, "[]", "[]", "{}", 1),
            SubscriptionPlan.Create("plan-mini", "Mini", "Mini", "مصغرة", 9m, 12m, 86m, 108m, "[]", "[]", "{}", 2),
            SubscriptionPlan.Create("plan-ready", "Ready", "Ready", "جاهز", 19m, 25m, 180m, 228m, "[]", "[]", "{}", 3, isPopular: true),
            SubscriptionPlan.Create("plan-high", "High", "High", "احترافية", 39m, 49m, 360m, 468m, "[]", "[]", "{}", 4)
        );
        db.SaveChanges();
    }

    private static void SetUser(ControllerBase controller, Guid userId, string role = "User")
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, userId.ToString()),
            new(ClaimTypes.Role, role)
        };
        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext
            {
                User = new ClaimsPrincipal(new ClaimsIdentity(claims, "Test"))
            }
        };
    }

    [Fact]
    public async Task SelectPlan_SwitchingMultiplePaidPlans_AllowsAtMostOneActivePendingRequest()
    {
        var userId = Guid.NewGuid();
        SetUser(_subsController, userId);

        // 1. User selects Mini
        await _subsController.SelectPlan(new SelectPlanRequest("plan-mini", "Monthly"), CancellationToken.None);
        // 2. User switches to Ready
        await _subsController.SelectPlan(new SelectPlanRequest("plan-ready", "Monthly"), CancellationToken.None);
        // 3. User switches to High
        await _subsController.SelectPlan(new SelectPlanRequest("plan-high", "Annual"), CancellationToken.None);

        var allReqs = await _db.SubscriptionRequests.Where(r => r.UserId == userId).ToListAsync();
        var pendingReqs = allReqs.Where(r => r.Status == SubscriptionRequestStatus.PendingApproval).ToList();
        var supersededReqs = allReqs.Where(r => r.Status == SubscriptionRequestStatus.Superseded).ToList();

        Assert.Equal(3, allReqs.Count);
        Assert.Single(pendingReqs);
        Assert.Equal("plan-high", pendingReqs[0].RequestedPlanId);
        Assert.Equal("Annual", pendingReqs[0].BillingInterval);
        Assert.Equal(2, supersededReqs.Count);
    }

    [Fact]
    public async Task SelectPlan_RepeatingSamePlan_IsIdempotentAndDoesNotCreateDuplicates()
    {
        var userId = Guid.NewGuid();
        SetUser(_subsController, userId);

        await _subsController.SelectPlan(new SelectPlanRequest("plan-ready", "Monthly"), CancellationToken.None);
        await _subsController.SelectPlan(new SelectPlanRequest("plan-ready", "Monthly"), CancellationToken.None);
        await _subsController.SelectPlan(new SelectPlanRequest("plan-ready", "Monthly"), CancellationToken.None);

        var allReqs = await _db.SubscriptionRequests.Where(r => r.UserId == userId).ToListAsync();
        Assert.Single(allReqs);
        Assert.Equal(SubscriptionRequestStatus.PendingApproval, allReqs[0].Status);

        var histories = await _db.SubscriptionHistories.Where(h => h.UserId == userId && h.Action == "UpgradeRequested").ToListAsync();
        Assert.Single(histories);
    }

    [Fact]
    public async Task RejectAndApprove_PreserveActivePlanAndUpdateStateCorrectly()
    {
        var user = User.Create("student_sub", "subtest@example.com", "hash");
        _db.Users.Add(user);
        _db.UserSubscriptions.Add(UserSubscription.Create(user.Id, "plan-mini", SubscriptionStatus.Active, "Monthly"));
        await _db.SaveChangesAsync();

        SetUser(_subsController, user.Id);
        SetUser(_adminController, Guid.NewGuid(), "Admin");

        // User requests upgrade from active Mini -> High
        await _subsController.SelectPlan(new SelectPlanRequest("plan-high", "Monthly"), CancellationToken.None);

        // Existing active plan MUST stay plan-mini (Active) while request is pending!
        var activeSubBeforeReject = await _db.UserSubscriptions.AsNoTracking().FirstAsync(s => s.UserId == user.Id);
        Assert.Equal("plan-mini", activeSubBeforeReject.PlanId);
        Assert.Equal(SubscriptionStatus.Active, activeSubBeforeReject.Status);

        var pending = await _db.SubscriptionRequests.FirstAsync(r => r.UserId == user.Id && r.Status == SubscriptionRequestStatus.PendingApproval);
        await _adminController.RejectSubscriptionRequest(pending.Id, new ReviewSubscriptionRequestBody("Payment incomplete"), CancellationToken.None);

        // Rejecting must NOT overwrite or cancel existing active Mini plan!
        var activeSubAfterReject = await _db.UserSubscriptions.AsNoTracking().FirstAsync(s => s.UserId == user.Id);
        Assert.Equal("plan-mini", activeSubAfterReject.PlanId);
        Assert.Equal(SubscriptionStatus.Active, activeSubAfterReject.Status);

        var rejectedReq = await _db.SubscriptionRequests.AsNoTracking().FirstAsync(r => r.Id == pending.Id);
        Assert.Equal(SubscriptionRequestStatus.Rejected, rejectedReq.Status);

        // Submit new request to Ready and Approve
        await _subsController.SelectPlan(new SelectPlanRequest("plan-ready", "Annual"), CancellationToken.None);
        var nextPending = await _db.SubscriptionRequests.FirstAsync(r => r.UserId == user.Id && r.Status == SubscriptionRequestStatus.PendingApproval);
        await _adminController.ApproveSubscriptionRequest(nextPending.Id, new ReviewSubscriptionRequestBody("Verified"), CancellationToken.None);

        var activeSubAfterApprove = await _db.UserSubscriptions.AsNoTracking().FirstAsync(s => s.UserId == user.Id);
        Assert.Equal("plan-ready", activeSubAfterApprove.PlanId);
        Assert.Equal(SubscriptionStatus.Active, activeSubAfterApprove.Status);
        Assert.Equal("Annual", activeSubAfterApprove.BillingInterval);
    }

    [Fact]
    public async Task CancelPendingRequest_ClearsPendingWithoutCancellingActiveSubscription()
    {
        var userId = Guid.NewGuid();
        _db.UserSubscriptions.Add(UserSubscription.Create(userId, "plan-mini", SubscriptionStatus.Active, "Monthly"));
        await _db.SaveChangesAsync();

        SetUser(_subsController, userId);
        await _subsController.SelectPlan(new SelectPlanRequest("plan-high", "Monthly"), CancellationToken.None);

        await _subsController.CancelPendingRequest(CancellationToken.None);

        var pendingCount = await _db.SubscriptionRequests.CountAsync(r => r.UserId == userId && r.Status == SubscriptionRequestStatus.PendingApproval);
        var sub = await _db.UserSubscriptions.FirstAsync(s => s.UserId == userId);

        Assert.Equal(0, pendingCount);
        Assert.Equal("plan-mini", sub.PlanId);
        Assert.Equal(SubscriptionStatus.Active, sub.Status);
    }
}
