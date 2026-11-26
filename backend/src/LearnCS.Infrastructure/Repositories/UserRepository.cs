using LearnCS.Application.Contracts.Persistence;
using LearnCS.Domain.Identity;
using LearnCS.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.Infrastructure.Repositories;

internal sealed class UserRepository(AppDbContext db) : IUserRepository
{
    // ── User Lookups ───────────────────────────────────────────────────────────

    public Task<User?> FindByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => db.Users
             .AsNoTracking()
             .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);

    public Task<User?> FindByEmailAsync(string email, CancellationToken cancellationToken = default)
        => db.Users
             .AsNoTracking()
             .FirstOrDefaultAsync(u => u.Email == email.ToLowerInvariant(), cancellationToken);

    public Task<User?> FindByUsernameAsync(string username, CancellationToken cancellationToken = default)
        => db.Users
             .AsNoTracking()
             .FirstOrDefaultAsync(u => u.Username == username.ToLowerInvariant(), cancellationToken);

    public Task<User?> FindByIdWithRolesAsync(Guid id, CancellationToken cancellationToken = default)
        => db.Users
             .AsNoTracking()
             .Include(u => u.UserRoles)
                 .ThenInclude(ur => ur.Role)
             .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);

    public Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken = default)
        => db.Users.AnyAsync(u => u.Email == email.ToLowerInvariant(), cancellationToken);

    public Task<bool> ExistsByUsernameAsync(string username, CancellationToken cancellationToken = default)
        => db.Users.AnyAsync(u => u.Username == username.ToLowerInvariant(), cancellationToken);

    public void Add(User user)
        => db.Users.Add(user);

    public void Update(User user)
        => db.Users.Update(user);

    // ── Roles ──────────────────────────────────────────────────────────────────

    public Task<Role?> FindRoleByNameAsync(string roleName, CancellationToken cancellationToken = default)
        => db.Roles.FirstOrDefaultAsync(r => r.Name.ToLower() == roleName.Trim().ToLower(), cancellationToken);

    public void AddRole(Role role)
        => db.Roles.Add(role);

    public void AddUserRole(UserRole userRole)
        => db.UserRoles.Add(userRole);

    // ── Refresh Tokens ─────────────────────────────────────────────────────────

    // NOTE: FindActiveRefreshTokenAsync intentionally does NOT use AsNoTracking
    // because the use case will call Revoke() on the returned token and then SaveChangesAsync.
    public Task<RefreshToken?> FindActiveRefreshTokenAsync(Guid userId, string tokenHash, CancellationToken cancellationToken = default)
        => db.RefreshTokens
             .FirstOrDefaultAsync(
                 t => t.UserId == userId
                      && t.TokenHash == tokenHash
                      && t.RevokedAt == null
                      && t.ExpiresAt > DateTime.UtcNow,
                 cancellationToken);

    public void AddRefreshToken(RefreshToken token)
        => db.RefreshTokens.Add(token);
}
