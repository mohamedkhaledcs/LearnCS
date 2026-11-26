using LearnCS.Domain.Common;

namespace LearnCS.Domain.Identity;

public class Role : BaseEntity
{
    public string Name { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public bool IsSystemRole { get; private set; }

    public ICollection<UserRole> UserRoles { get; private set; } = new List<UserRole>();

    private Role() { }

    public static Role Create(string name, string? description = null, bool isSystemRole = false)
        => new Role { Name = name, Description = description, IsSystemRole = isSystemRole };
}

public class UserRole
{
    public Guid UserId { get; private set; }
    public Guid RoleId { get; private set; }
    public DateTime AssignedAt { get; private set; } = DateTime.UtcNow;
    public Guid? AssignedBy { get; private set; }

    public User? User { get; private set; }
    public Role? Role { get; private set; }

    private UserRole() { }

    public static UserRole Create(Guid userId, Guid roleId, Guid? assignedBy = null)
        => new UserRole { UserId = userId, RoleId = roleId, AssignedBy = assignedBy };
}

public class RefreshToken : BaseEntity
{
    public Guid UserId { get; private set; }
    public string TokenHash { get; private set; } = string.Empty;
    public DateTime ExpiresAt { get; private set; }
    public DateTime? RevokedAt { get; private set; }
    public Guid? ReplacedByTokenId { get; private set; }
    public string? CreatedFromIp { get; private set; }
    public string? RevokedFromIp { get; private set; }
    public string? UserAgent { get; private set; }

    public User? User { get; private set; }

    private RefreshToken() { }

    public static RefreshToken Create(Guid userId, string tokenHash, DateTime expiresAt, string? ip = null, string? userAgent = null)
        => new RefreshToken
        {
            UserId = userId, TokenHash = tokenHash,
            ExpiresAt = expiresAt, CreatedFromIp = ip, UserAgent = userAgent
        };

    public bool IsActive => RevokedAt == null && DateTime.UtcNow < ExpiresAt;

    public void Revoke(string? ip = null, Guid? replacedById = null)
    {
        RevokedAt = DateTime.UtcNow;
        RevokedFromIp = ip;
        ReplacedByTokenId = replacedById;
    }
}
