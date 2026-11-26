using LearnCS.Application.Contracts.Persistence;
using LearnCS.Domain.Identity;
using LearnCS.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.Infrastructure.Repositories;

internal sealed class UserProfileRepository(AppDbContext db) : IUserProfileRepository
{
    public Task<UserProfile?> GetByUserIdAsync(Guid userId, bool trackForUpdate = false, CancellationToken cancellationToken = default)
    {
        var query = db.UserProfiles.AsQueryable();
        if (!trackForUpdate)
            query = query.AsNoTracking();

        return query.FirstOrDefaultAsync(p => p.UserId == userId, cancellationToken);
    }

    // NOTE: No AsNoTracking, callers may update settings and then SaveChanges.
    public Task<UserSettings?> GetSettingsByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        => db.UserSettings
             .FirstOrDefaultAsync(s => s.UserId == userId, cancellationToken);

    public void Add(UserProfile profile)
        => db.UserProfiles.Add(profile);

    public void Add(UserSettings settings)
        => db.UserSettings.Add(settings);
}
