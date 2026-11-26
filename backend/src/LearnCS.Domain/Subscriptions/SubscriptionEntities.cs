using LearnCS.Domain.Common;

namespace LearnCS.Domain.Subscriptions;

public enum SubscriptionStatus
{
    Active = 0,
    PendingPayment = 1,
    PendingApproval = 2,
    Expired = 3,
    Cancelled = 4
}

public enum SubscriptionRequestStatus
{
    PendingApproval = 0,
    Approved = 1,
    Rejected = 2,
    Superseded = 3,
    Cancelled = 4
}

public class SubscriptionPlan
{
    public string Id { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public string? Badge { get; private set; }
    public string DescriptionEn { get; private set; } = string.Empty;
    public string DescriptionAr { get; private set; } = string.Empty;
    public decimal MonthlyPrice { get; private set; }
    public decimal? OriginalMonthlyPrice { get; private set; }
    public decimal AnnualPrice { get; private set; }
    public decimal? OriginalAnnualPrice { get; private set; }
    public string FeaturesEnJson { get; private set; } = "[]";
    public string FeaturesArJson { get; private set; } = "[]";
    public string EntitlementsJson { get; private set; } = "{}";
    public bool IsPopular { get; private set; }
    public bool IsActive { get; private set; } = true;
    public int DisplayOrder { get; private set; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; private set; }

    private SubscriptionPlan() { }

    public static SubscriptionPlan Create(
        string id,
        string name,
        string descriptionEn,
        string descriptionAr,
        decimal monthlyPrice,
        decimal? originalMonthlyPrice,
        decimal annualPrice,
        decimal? originalAnnualPrice,
        string featuresEnJson,
        string featuresArJson,
        string entitlementsJson,
        int displayOrder,
        string? badge = null,
        bool isPopular = false)
    {
        return new SubscriptionPlan
        {
            Id = id.Trim().ToLowerInvariant(),
            Name = name,
            Badge = badge,
            DescriptionEn = descriptionEn,
            DescriptionAr = descriptionAr,
            MonthlyPrice = monthlyPrice,
            OriginalMonthlyPrice = originalMonthlyPrice,
            AnnualPrice = annualPrice,
            OriginalAnnualPrice = originalAnnualPrice,
            FeaturesEnJson = featuresEnJson,
            FeaturesArJson = featuresArJson,
            EntitlementsJson = entitlementsJson,
            DisplayOrder = displayOrder,
            IsPopular = isPopular
        };
    }

    public void Update(
        string name,
        string? badge,
        string descriptionEn,
        string descriptionAr,
        decimal monthlyPrice,
        decimal? originalMonthlyPrice,
        decimal annualPrice,
        decimal? originalAnnualPrice,
        string featuresEnJson,
        string featuresArJson,
        string entitlementsJson,
        bool isPopular,
        bool isActive,
        int displayOrder)
    {
        Name = name;
        Badge = badge;
        DescriptionEn = descriptionEn;
        DescriptionAr = descriptionAr;
        MonthlyPrice = monthlyPrice;
        OriginalMonthlyPrice = originalMonthlyPrice;
        AnnualPrice = annualPrice;
        OriginalAnnualPrice = originalAnnualPrice;
        FeaturesEnJson = featuresEnJson;
        FeaturesArJson = featuresArJson;
        EntitlementsJson = entitlementsJson;
        IsPopular = isPopular;
        IsActive = isActive;
        DisplayOrder = displayOrder;
        UpdatedAt = DateTime.UtcNow;
    }
}

public class UserSubscription : BaseEntity
{
    public Guid UserId { get; private set; }
    public string PlanId { get; private set; } = "plan-free";
    public SubscriptionStatus Status { get; private set; } = SubscriptionStatus.Active;
    public string BillingInterval { get; private set; } = "Monthly"; // Monthly | Annual | AdminAssigned | Free
    public DateTime StartedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? ExpiresAt { get; private set; }
    public Guid? AssignedByUserId { get; private set; }
    public string? PaymentStatus { get; private set; }
    public string? Notes { get; private set; }

    public SubscriptionPlan? Plan { get; private set; }

    private UserSubscription() { }

    public static UserSubscription Create(
        Guid userId,
        string planId,
        SubscriptionStatus status,
        string billingInterval,
        DateTime? expiresAt = null,
        Guid? assignedByUserId = null,
        string? paymentStatus = null,
        string? notes = null)
    {
        return new UserSubscription
        {
            UserId = userId,
            PlanId = planId.Trim().ToLowerInvariant(),
            Status = status,
            BillingInterval = billingInterval,
            StartedAt = DateTime.UtcNow,
            ExpiresAt = expiresAt,
            AssignedByUserId = assignedByUserId,
            PaymentStatus = paymentStatus,
            Notes = notes
        };
    }

    public void UpdateAssignment(
        string planId,
        SubscriptionStatus status,
        string billingInterval,
        DateTime? expiresAt,
        Guid? assignedByUserId,
        string? paymentStatus,
        string? notes)
    {
        PlanId = planId.Trim().ToLowerInvariant();
        Status = status;
        BillingInterval = billingInterval;
        StartedAt = DateTime.UtcNow;
        ExpiresAt = expiresAt;
        AssignedByUserId = assignedByUserId;
        PaymentStatus = paymentStatus;
        Notes = notes;
        SetUpdated();
    }
}

public class SubscriptionHistory : BaseEntity
{
    public Guid UserId { get; private set; }
    public string PlanId { get; private set; } = string.Empty;
    public string? PreviousPlanId { get; private set; }
    public string Action { get; private set; } = string.Empty;
    public string BillingInterval { get; private set; } = "Monthly";
    public string Status { get; private set; } = "Active";
    public Guid? PerformedByUserId { get; private set; }
    public string? Notes { get; private set; }

    private SubscriptionHistory() { }

    public static SubscriptionHistory Create(
        Guid userId,
        string planId,
        string? previousPlanId,
        string action,
        string billingInterval,
        string status,
        Guid? performedByUserId = null,
        string? notes = null)
    {
        return new SubscriptionHistory
        {
            UserId = userId,
            PlanId = planId,
            PreviousPlanId = previousPlanId,
            Action = action,
            BillingInterval = billingInterval,
            Status = status,
            PerformedByUserId = performedByUserId,
            Notes = notes
        };
    }
}

public class SubscriptionRequest : BaseEntity
{
    public Guid UserId { get; private set; }
    public string RequestedPlanId { get; private set; } = string.Empty;
    public string? PreviousActivePlanId { get; private set; }
    public string BillingInterval { get; private set; } = "Monthly";
    public SubscriptionRequestStatus Status { get; private set; } = SubscriptionRequestStatus.PendingApproval;
    public string? Notes { get; private set; }
    public Guid? ReviewedByUserId { get; private set; }
    public DateTime? ReviewedAt { get; private set; }

    public SubscriptionPlan? RequestedPlan { get; private set; }

    private SubscriptionRequest() { }

    public static SubscriptionRequest Create(
        Guid userId,
        string requestedPlanId,
        string? previousActivePlanId,
        string billingInterval,
        string? notes = null)
    {
        return new SubscriptionRequest
        {
            UserId = userId,
            RequestedPlanId = requestedPlanId.Trim().ToLowerInvariant(),
            PreviousActivePlanId = previousActivePlanId?.Trim().ToLowerInvariant(),
            BillingInterval = billingInterval,
            Status = SubscriptionRequestStatus.PendingApproval,
            Notes = notes
        };
    }

    public void MarkSuperseded(string replacedByPlanId)
    {
        Status = SubscriptionRequestStatus.Superseded;
        ReviewedAt = DateTime.UtcNow;
        Notes = $"Superseded by new plan selection ({replacedByPlanId}).";
        SetUpdated();
    }

    public void MarkCancelled(string? reason = null)
    {
        Status = SubscriptionRequestStatus.Cancelled;
        ReviewedAt = DateTime.UtcNow;
        Notes = string.IsNullOrWhiteSpace(reason) ? "Cancelled by learner." : reason;
        SetUpdated();
    }

    public void Approve(Guid reviewerId, string? note = null)
    {
        Status = SubscriptionRequestStatus.Approved;
        ReviewedByUserId = reviewerId;
        ReviewedAt = DateTime.UtcNow;
        if (!string.IsNullOrWhiteSpace(note)) Notes = note;
        SetUpdated();
    }

    public void Reject(Guid reviewerId, string? note = null)
    {
        Status = SubscriptionRequestStatus.Rejected;
        ReviewedByUserId = reviewerId;
        ReviewedAt = DateTime.UtcNow;
        Notes = string.IsNullOrWhiteSpace(note) ? "Rejected by administrator." : note;
        SetUpdated();
    }
}
