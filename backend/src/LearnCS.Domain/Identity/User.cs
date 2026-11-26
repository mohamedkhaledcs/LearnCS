using LearnCS.Domain.Common;

namespace LearnCS.Domain.Identity;

public class User : SoftDeletableEntity
{
    public string Username { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string PasswordHash { get; private set; } = string.Empty;
    public AccountStatus AccountStatus { get; private set; } = AccountStatus.PendingVerification;
    public bool EmailVerified { get; private set; }
    public bool TwoFactorEnabled { get; private set; }
    public int FailedLoginAttempts { get; private set; }
    public DateTime? LockoutUntil { get; private set; }
    public DateTime? LastLoginAt { get; private set; }

    // Navigation properties
    public UserProfile? Profile { get; private set; }
    public UserSettings? Settings { get; private set; }
    public ICollection<UserRole> UserRoles { get; private set; } = new List<UserRole>();
    public ICollection<RefreshToken> RefreshTokens { get; private set; } = new List<RefreshToken>();
    public ICollection<UserGoal> Goals { get; private set; } = new List<UserGoal>();

    private User() { }

    public static User Create(string username, string email, string passwordHash)
    {
        return new User
        {
            Username = username.Trim().ToLowerInvariant(),
            Email = email.Trim().ToLowerInvariant(),
            PasswordHash = passwordHash,
            AccountStatus = AccountStatus.PendingVerification
        };
    }

    public void VerifyEmail()
    {
        EmailVerified = true;
        AccountStatus = AccountStatus.Active;
        SetUpdated();
    }

    public void RecordLogin()
    {
        LastLoginAt = DateTime.UtcNow;
        FailedLoginAttempts = 0;
        LockoutUntil = null;
        SetUpdated();
    }

    public void RecordFailedLogin()
    {
        FailedLoginAttempts++;
        if (FailedLoginAttempts >= 5)
            LockoutUntil = DateTime.UtcNow.AddMinutes(15);
        SetUpdated();
    }

    public bool IsLockedOut() => LockoutUntil.HasValue && LockoutUntil > DateTime.UtcNow;

    public void Activate()
    {
        AccountStatus = AccountStatus.Active;
        SetUpdated();
    }

    public void Suspend()
    {
        AccountStatus = AccountStatus.Suspended;
        SetUpdated();
    }

    public void UpdatePasswordHash(string newHash)
    {
        PasswordHash = newHash;
        SetUpdated();
    }

    public void ClearLockout()
    {
        FailedLoginAttempts = 0;
        LockoutUntil = null;
        SetUpdated();
    }
}
