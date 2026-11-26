using LearnCS.Domain.Identity;

namespace LearnCS.Application.Contracts.Persistence;

/// <summary>
/// Persistence contract for User aggregate.
/// Covers identity, authentication, and refresh-token persistence needs.
/// </summary>
public interface IUserRepository
{
    /// <summary>Find an active (non-deleted) user by their unique identifier.</summary>
    Task<User?> FindByIdAsync(Guid id, CancellationToken cancellationToken = default);

    /// <summary>Find an active user by email (case-insensitive).</summary>
    Task<User?> FindByEmailAsync(string email, CancellationToken cancellationToken = default);

    /// <summary>Find an active user by username (case-insensitive).</summary>
    Task<User?> FindByUsernameAsync(string username, CancellationToken cancellationToken = default);

    /// <summary>
    /// Find an active user with their roles eagerly loaded.
    /// Used during token generation to embed role claims.
    /// </summary>
    Task<User?> FindByIdWithRolesAsync(Guid id, CancellationToken cancellationToken = default);

    /// <summary>Returns true if an active user with this email already exists.</summary>
    Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken = default);

    /// <summary>Returns true if an active user with this username already exists.</summary>
    Task<bool> ExistsByUsernameAsync(string username, CancellationToken cancellationToken = default);

    /// <summary>Stages a new User for insertion. Call IUnitOfWork.SaveChangesAsync to persist.</summary>
    void Add(User user);

    /// <summary>Stages an updated User. Call IUnitOfWork.SaveChangesAsync to persist.</summary>
    void Update(User user);

    // ── Roles ──────────────────────────────────────────────────────────────────

    /// <summary>Find a role by name (case-insensitive).</summary>
    Task<Role?> FindRoleByNameAsync(string roleName, CancellationToken cancellationToken = default);

    /// <summary>Stages a new Role for insertion.</summary>
    void AddRole(Role role);

    /// <summary>Stages a UserRole assignment for insertion.</summary>
    void AddUserRole(UserRole userRole);

    // ── Refresh Tokens ─────────────────────────────────────────────────────────

    /// <summary>Find a non-revoked, non-expired refresh token by its hash for the given user.</summary>
    Task<RefreshToken?> FindActiveRefreshTokenAsync(Guid userId, string tokenHash, CancellationToken cancellationToken = default);

    /// <summary>Stages a new RefreshToken for insertion.</summary>
    void AddRefreshToken(RefreshToken token);
}
