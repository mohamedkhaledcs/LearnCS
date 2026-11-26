using LearnCS.Domain.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearnCS.Infrastructure.Configurations.Subscriptions;

public class SubscriptionPlanConfiguration : IEntityTypeConfiguration<SubscriptionPlan>
{
    public void Configure(EntityTypeBuilder<SubscriptionPlan> builder)
    {
        builder.ToTable("subscription_plans", "platform");
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id).HasColumnName("id").HasMaxLength(60);
        builder.Property(p => p.Name).HasColumnName("name").HasMaxLength(120).IsRequired();
        builder.Property(p => p.Badge).HasColumnName("badge").HasMaxLength(60);
        builder.Property(p => p.DescriptionEn).HasColumnName("description_en").HasMaxLength(1000).IsRequired();
        builder.Property(p => p.DescriptionAr).HasColumnName("description_ar").HasMaxLength(1000).IsRequired();
        builder.Property(p => p.MonthlyPrice).HasColumnName("monthly_price").HasPrecision(10, 2);
        builder.Property(p => p.OriginalMonthlyPrice).HasColumnName("original_monthly_price").HasPrecision(10, 2);
        builder.Property(p => p.AnnualPrice).HasColumnName("annual_price").HasPrecision(10, 2);
        builder.Property(p => p.OriginalAnnualPrice).HasColumnName("original_annual_price").HasPrecision(10, 2);
        builder.Property(p => p.FeaturesEnJson).HasColumnName("features_en_json");
        builder.Property(p => p.FeaturesArJson).HasColumnName("features_ar_json");
        builder.Property(p => p.EntitlementsJson).HasColumnName("entitlements_json");
        builder.Property(p => p.IsPopular).HasColumnName("is_popular");
        builder.Property(p => p.IsActive).HasColumnName("is_active");
        builder.Property(p => p.DisplayOrder).HasColumnName("display_order");
        builder.Property(p => p.CreatedAt).HasColumnName("created_at");
        builder.Property(p => p.UpdatedAt).HasColumnName("updated_at");
    }
}

public class UserSubscriptionConfiguration : IEntityTypeConfiguration<UserSubscription>
{
    public void Configure(EntityTypeBuilder<UserSubscription> builder)
    {
        builder.ToTable("user_subscriptions", "platform");
        builder.HasKey(s => s.Id);
        builder.Property(s => s.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(s => s.UserId).HasColumnName("user_id");
        builder.Property(s => s.PlanId).HasColumnName("plan_id").HasMaxLength(60).IsRequired();
        builder.Property(s => s.Status).HasColumnName("status").HasConversion<int>();
        builder.Property(s => s.BillingInterval).HasColumnName("billing_interval").HasMaxLength(40).IsRequired();
        builder.Property(s => s.StartedAt).HasColumnName("started_at");
        builder.Property(s => s.ExpiresAt).HasColumnName("expires_at");
        builder.Property(s => s.AssignedByUserId).HasColumnName("assigned_by_user_id");
        builder.Property(s => s.PaymentStatus).HasColumnName("payment_status").HasMaxLength(80);
        builder.Property(s => s.Notes).HasColumnName("notes").HasMaxLength(500);
        builder.Property(s => s.CreatedAt).HasColumnName("created_at");
        builder.Property(s => s.UpdatedAt).HasColumnName("updated_at");
        builder.HasOne(s => s.Plan).WithMany().HasForeignKey(s => s.PlanId).OnDelete(DeleteBehavior.Restrict);
        builder.HasIndex(s => s.UserId).IsUnique().HasDatabaseName("ix_user_subscriptions_user_id");
    }
}

public class SubscriptionHistoryConfiguration : IEntityTypeConfiguration<SubscriptionHistory>
{
    public void Configure(EntityTypeBuilder<SubscriptionHistory> builder)
    {
        builder.ToTable("subscription_history", "platform");
        builder.HasKey(h => h.Id);
        builder.Property(h => h.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(h => h.UserId).HasColumnName("user_id");
        builder.Property(h => h.PlanId).HasColumnName("plan_id").HasMaxLength(60).IsRequired();
        builder.Property(h => h.PreviousPlanId).HasColumnName("previous_plan_id").HasMaxLength(60);
        builder.Property(h => h.Action).HasColumnName("action").HasMaxLength(80).IsRequired();
        builder.Property(h => h.BillingInterval).HasColumnName("billing_interval").HasMaxLength(40).IsRequired();
        builder.Property(h => h.Status).HasColumnName("status").HasMaxLength(40).IsRequired();
        builder.Property(h => h.PerformedByUserId).HasColumnName("performed_by_user_id");
        builder.Property(h => h.Notes).HasColumnName("notes").HasMaxLength(500);
        builder.Property(h => h.CreatedAt).HasColumnName("created_at");
        builder.Property(h => h.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(h => h.UserId).HasDatabaseName("ix_subscription_history_user_id");
    }
}

public class SubscriptionRequestConfiguration : IEntityTypeConfiguration<SubscriptionRequest>
{
    public void Configure(EntityTypeBuilder<SubscriptionRequest> builder)
    {
        builder.ToTable("subscription_requests", "platform");
        builder.HasKey(r => r.Id);
        builder.Property(r => r.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(r => r.UserId).HasColumnName("user_id");
        builder.Property(r => r.RequestedPlanId).HasColumnName("requested_plan_id").HasMaxLength(60).IsRequired();
        builder.Property(r => r.PreviousActivePlanId).HasColumnName("previous_active_plan_id").HasMaxLength(60);
        builder.Property(r => r.BillingInterval).HasColumnName("billing_interval").HasMaxLength(40).IsRequired();
        builder.Property(r => r.Status).HasColumnName("status").HasConversion<int>();
        builder.Property(r => r.Notes).HasColumnName("notes").HasMaxLength(500);
        builder.Property(r => r.ReviewedByUserId).HasColumnName("reviewed_by_user_id");
        builder.Property(r => r.ReviewedAt).HasColumnName("reviewed_at");
        builder.Property(r => r.CreatedAt).HasColumnName("created_at");
        builder.Property(r => r.UpdatedAt).HasColumnName("updated_at");
        builder.HasOne(r => r.RequestedPlan).WithMany().HasForeignKey(r => r.RequestedPlanId).OnDelete(DeleteBehavior.Restrict);
        builder.HasIndex(r => new { r.Status, r.CreatedAt }).HasDatabaseName("ix_subscription_requests_status_created");
        // Enforce at most ONE active PendingApproval (status = 0) plan-change request per user at DB level
        builder.HasIndex(r => r.UserId)
            .IsUnique()
            .HasFilter("status = 0")
            .HasDatabaseName("ix_subscription_requests_user_active_pending");
    }
}
