using LearnCS.Domain.Identity;

namespace LearnCS.Application.Contracts.Persistence;

/// <summary>
/// Persistence contract for UserProfile and UserSettings.
/// Separated from IUserRepository because profile/settings updates are distinct use cases.
/// </summary>
public interface IUserProfileRepository
{
    Task<UserProfile?> GetByUserIdAsync(Guid userId, bool trackForUpdate = false, CancellationToken cancellationToken = default);
    Task<UserSettings?> GetSettingsByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);

    void Add(UserProfile profile);
    void Add(UserSettings settings);
}
