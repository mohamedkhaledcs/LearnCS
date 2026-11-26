using LearnCS.Domain.Gamification;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearnCS.Infrastructure.Configurations.Gamification;

public class BadgeConfiguration : IEntityTypeConfiguration<Badge>
{
    public void Configure(EntityTypeBuilder<Badge> builder)
    {
        builder.ToTable("badges", "gamification");
        builder.HasKey(b => b.Id);
        builder.Property(b => b.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(b => b.Name).HasColumnName("name").HasMaxLength(100).IsRequired();
        builder.Property(b => b.Description).HasColumnName("description").HasMaxLength(500).IsRequired();
        builder.Property(b => b.IconUrl).HasColumnName("icon_url").HasMaxLength(500);
        builder.Property(b => b.CriteriaJson).HasColumnName("criteria_json");
        builder.Property(b => b.IsActive).HasColumnName("is_active");
        builder.Property(b => b.CreatedAt).HasColumnName("created_at");
        builder.Property(b => b.UpdatedAt).HasColumnName("updated_at");
    }
}

public class AchievementConfiguration : IEntityTypeConfiguration<Achievement>
{
    public void Configure(EntityTypeBuilder<Achievement> builder)
    {
        builder.ToTable("achievements", "gamification");
        builder.HasKey(a => a.Id);
        builder.Property(a => a.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(a => a.Code).HasColumnName("code").HasMaxLength(100);
        builder.Property(a => a.Name).HasColumnName("name").HasMaxLength(150).IsRequired();
        builder.Property(a => a.TitleAr).HasColumnName("title_ar").HasMaxLength(150);
        builder.Property(a => a.Description).HasColumnName("description").HasMaxLength(500).IsRequired();
        builder.Property(a => a.DescriptionAr).HasColumnName("description_ar").HasMaxLength(500);
        builder.Property(a => a.Category).HasColumnName("category").HasMaxLength(80);
        builder.Property(a => a.Threshold).HasColumnName("threshold").HasDefaultValue(1);
        builder.Property(a => a.BadgeId).HasColumnName("badge_id");
        builder.Property(a => a.XpReward).HasColumnName("xp_reward");
        builder.Property(a => a.TriggerType).HasColumnName("trigger_type").HasConversion<int>();
        builder.Property(a => a.TriggerConditionJson).HasColumnName("trigger_condition_json");
        builder.Property(a => a.IsActive).HasColumnName("is_active");
        builder.Property(a => a.CreatedAt).HasColumnName("created_at");
        builder.Property(a => a.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(a => a.Code).IsUnique().HasDatabaseName("ix_achievements_code");
        builder.HasOne(a => a.Badge).WithMany()
            .HasForeignKey(a => a.BadgeId).OnDelete(DeleteBehavior.SetNull).IsRequired(false);
    }
}

public class UserAchievementConfiguration : IEntityTypeConfiguration<UserAchievement>
{
    public void Configure(EntityTypeBuilder<UserAchievement> builder)
    {
        builder.ToTable("user_achievements", "gamification");
        builder.HasKey(ua => ua.Id);
        builder.Property(ua => ua.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(ua => ua.UserId).HasColumnName("user_id");
        builder.Property(ua => ua.AchievementId).HasColumnName("achievement_id");
        builder.Property(ua => ua.EarnedAt).HasColumnName("earned_at");
        builder.Property(ua => ua.CreatedAt).HasColumnName("created_at");
        builder.HasOne(ua => ua.Achievement).WithMany(a => a.UserAchievements)
            .HasForeignKey(ua => ua.AchievementId).OnDelete(DeleteBehavior.Restrict);
        builder.HasIndex(ua => new { ua.UserId, ua.AchievementId }).IsUnique()
            .HasDatabaseName("ix_user_achievements_user_achievement");
        builder.HasIndex(ua => ua.UserId).HasDatabaseName("ix_user_achievements_user_id");
    }
}

public class UserXpEventConfiguration : IEntityTypeConfiguration<UserXpEvent>
{
    public void Configure(EntityTypeBuilder<UserXpEvent> builder)
    {
        builder.ToTable("user_xp_events", "gamification");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(e => e.UserId).HasColumnName("user_id");
        builder.Property(e => e.XpAmount).HasColumnName("xp_amount");
        builder.Property(e => e.Source).HasColumnName("source").HasMaxLength(100);
        builder.Property(e => e.ReferenceId).HasColumnName("reference_id");
        builder.Property(e => e.Note).HasColumnName("note").HasMaxLength(500);
        builder.Property(e => e.CreatedAt).HasColumnName("created_at");
        builder.HasIndex(e => e.UserId).HasDatabaseName("ix_user_xp_events_user_id");
    }
}

public class StudyStreakConfiguration : IEntityTypeConfiguration<StudyStreak>
{
    public void Configure(EntityTypeBuilder<StudyStreak> builder)
    {
        builder.ToTable("study_streaks", "gamification");
        builder.HasKey(s => s.Id);
        builder.Property(s => s.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(s => s.UserId).HasColumnName("user_id");
        builder.Property(s => s.CurrentStreak).HasColumnName("current_streak");
        builder.Property(s => s.LongestStreak).HasColumnName("longest_streak");
        builder.Property(s => s.LastStudyDate).HasColumnName("last_study_date");
        builder.Property(s => s.CreatedAt).HasColumnName("created_at");
        builder.Property(s => s.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(s => s.UserId).IsUnique().HasDatabaseName("ix_study_streaks_user_id");
    }
}
