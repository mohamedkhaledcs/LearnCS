using LearnCS.Domain.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearnCS.Infrastructure.Configurations.Identity;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("users", "identity");
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(u => u.Username).HasColumnName("username").HasMaxLength(50).IsRequired();
        builder.Property(u => u.Email).HasColumnName("email").HasMaxLength(255).IsRequired();
        builder.Property(u => u.PasswordHash).HasColumnName("password_hash").HasMaxLength(255).IsRequired();
        builder.Property(u => u.AccountStatus).HasColumnName("account_status").HasConversion<int>();
        builder.Property(u => u.EmailVerified).HasColumnName("email_verified");
        builder.Property(u => u.TwoFactorEnabled).HasColumnName("two_factor_enabled");
        builder.Property(u => u.FailedLoginAttempts).HasColumnName("failed_login_attempts");
        builder.Property(u => u.LockoutUntil).HasColumnName("lockout_until");
        builder.Property(u => u.LastLoginAt).HasColumnName("last_login_at");
        builder.Property(u => u.CreatedAt).HasColumnName("created_at");
        builder.Property(u => u.UpdatedAt).HasColumnName("updated_at");
        builder.Property(u => u.DeletedAt).HasColumnName("deleted_at");

        builder.HasIndex(u => u.Email).IsUnique().HasDatabaseName("ix_users_email");
        builder.HasIndex(u => u.Username).IsUnique().HasDatabaseName("ix_users_username");
        builder.HasIndex(u => u.AccountStatus).HasDatabaseName("ix_users_status");
        builder.HasIndex(u => u.CreatedAt).HasDatabaseName("ix_users_created_at");
        builder.HasIndex(u => u.DeletedAt).HasDatabaseName("ix_users_deleted_at");

        // Global query filter for soft delete
        builder.HasQueryFilter(u => u.DeletedAt == null);

        builder.HasMany(u => u.UserRoles).WithOne(ur => ur.User).HasForeignKey(ur => ur.UserId);
        builder.HasMany(u => u.RefreshTokens).WithOne(rt => rt.User).HasForeignKey(rt => rt.UserId);
        builder.HasMany(u => u.Goals).WithOne(g => g.User).HasForeignKey(g => g.UserId);
        builder.HasOne(u => u.Profile).WithOne(p => p.User).HasForeignKey<UserProfile>(p => p.UserId);
        builder.HasOne(u => u.Settings).WithOne(s => s.User).HasForeignKey<UserSettings>(s => s.UserId);
    }
}

public class UserProfileConfiguration : IEntityTypeConfiguration<UserProfile>
{
    public void Configure(EntityTypeBuilder<UserProfile> builder)
    {
        builder.ToTable("user_profiles", "identity");
        builder.HasKey(p => p.UserId);
        builder.Property(p => p.UserId).HasColumnName("user_id").ValueGeneratedNever();
        builder.Property(p => p.Id).HasColumnName("id");
        builder.Property(p => p.FirstName).HasColumnName("first_name").HasMaxLength(100).IsRequired();
        builder.Property(p => p.LastName).HasColumnName("last_name").HasMaxLength(100).IsRequired();
        builder.Property(p => p.DisplayName).HasColumnName("display_name").HasMaxLength(150);
        builder.Property(p => p.Bio).HasColumnName("bio").HasMaxLength(1000);
        builder.Property(p => p.AvatarUrl).HasColumnName("avatar_url").HasMaxLength(500);
        builder.Property(p => p.Country).HasColumnName("country").HasMaxLength(100);
        builder.Property(p => p.City).HasColumnName("city").HasMaxLength(100);
        builder.Property(p => p.Timezone).HasColumnName("timezone").HasMaxLength(100);
        builder.Property(p => p.Website).HasColumnName("website").HasMaxLength(255);
        builder.Property(p => p.DateOfBirth).HasColumnName("date_of_birth");
        builder.Property(p => p.CreatedAt).HasColumnName("created_at");
        builder.Property(p => p.UpdatedAt).HasColumnName("updated_at");

        builder.Ignore(p => p.FullName);
        builder.HasIndex(p => p.Country).HasDatabaseName("ix_user_profiles_country");
    }
}

public class UserSettingsConfiguration : IEntityTypeConfiguration<UserSettings>
{
    public void Configure(EntityTypeBuilder<UserSettings> builder)
    {
        builder.ToTable("user_settings", "identity");
        builder.HasKey(s => s.UserId);
        builder.Property(s => s.UserId).HasColumnName("user_id").ValueGeneratedNever();
        builder.Property(s => s.Id).HasColumnName("id");
        builder.Property(s => s.Language).HasColumnName("language").HasMaxLength(10);
        builder.Property(s => s.Theme).HasColumnName("theme").HasMaxLength(20);
        builder.Property(s => s.EmailNotifications).HasColumnName("email_notifications");
        builder.Property(s => s.PushNotifications).HasColumnName("push_notifications");
        builder.Property(s => s.MarketingEmails).HasColumnName("marketing_emails");
        builder.Property(s => s.CreatedAt).HasColumnName("created_at");
        builder.Property(s => s.UpdatedAt).HasColumnName("updated_at");
    }
}

public class UserGoalConfiguration : IEntityTypeConfiguration<UserGoal>
{
    public void Configure(EntityTypeBuilder<UserGoal> builder)
    {
        builder.ToTable("user_goals", "identity");
        builder.HasKey(g => g.Id);
        builder.Property(g => g.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(g => g.UserId).HasColumnName("user_id");
        builder.Property(g => g.Title).HasColumnName("title").HasMaxLength(200).IsRequired();
        builder.Property(g => g.Description).HasColumnName("description").HasMaxLength(1000);
        builder.Property(g => g.TargetDate).HasColumnName("target_date");
        builder.Property(g => g.Status).HasColumnName("status").HasConversion<int>();
        builder.Property(g => g.CreatedAt).HasColumnName("created_at");
        builder.Property(g => g.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(g => g.UserId).HasDatabaseName("ix_user_goals_user_id");
    }
}

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.ToTable("roles", "identity");
        builder.HasKey(r => r.Id);
        builder.Property(r => r.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(r => r.Name).HasColumnName("name").HasMaxLength(100).IsRequired();
        builder.Property(r => r.Description).HasColumnName("description").HasMaxLength(500);
        builder.Property(r => r.IsSystemRole).HasColumnName("is_system_role");
        builder.Property(r => r.CreatedAt).HasColumnName("created_at");
        builder.Property(r => r.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(r => r.Name).IsUnique().HasDatabaseName("ix_roles_name");
    }
}

public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
{
    public void Configure(EntityTypeBuilder<UserRole> builder)
    {
        builder.ToTable("user_roles", "identity");
        builder.HasKey(ur => new { ur.UserId, ur.RoleId });
        builder.Property(ur => ur.UserId).HasColumnName("user_id");
        builder.Property(ur => ur.RoleId).HasColumnName("role_id");
        builder.Property(ur => ur.AssignedAt).HasColumnName("assigned_at");
        builder.Property(ur => ur.AssignedBy).HasColumnName("assigned_by");
        builder.HasOne(ur => ur.Role).WithMany(r => r.UserRoles).HasForeignKey(ur => ur.RoleId);
    }
}

public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
{
    public void Configure(EntityTypeBuilder<RefreshToken> builder)
    {
        builder.ToTable("refresh_tokens", "identity");
        builder.HasKey(rt => rt.Id);
        builder.Property(rt => rt.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(rt => rt.UserId).HasColumnName("user_id");
        builder.Property(rt => rt.TokenHash).HasColumnName("token_hash").HasMaxLength(512).IsRequired();
        builder.Property(rt => rt.ExpiresAt).HasColumnName("expires_at");
        builder.Property(rt => rt.RevokedAt).HasColumnName("revoked_at");
        builder.Property(rt => rt.ReplacedByTokenId).HasColumnName("replaced_by_token_id");
        builder.Property(rt => rt.CreatedFromIp).HasColumnName("created_from_ip").HasMaxLength(45);
        builder.Property(rt => rt.RevokedFromIp).HasColumnName("revoked_from_ip").HasMaxLength(45);
        builder.Property(rt => rt.UserAgent).HasColumnName("user_agent").HasMaxLength(500);
        builder.Property(rt => rt.CreatedAt).HasColumnName("created_at");
        builder.HasIndex(rt => rt.UserId).HasDatabaseName("ix_refresh_tokens_user_id");
        builder.HasIndex(rt => rt.ExpiresAt).HasDatabaseName("ix_refresh_tokens_expires_at");
    }
}
