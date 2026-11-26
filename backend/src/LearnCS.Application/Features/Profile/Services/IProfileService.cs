using LearnCS.Application.Common;
using LearnCS.Application.Features.Profile.DTOs;

namespace LearnCS.Application.Features.Profile.Services;

/// <summary>
/// Application service interface for User Profile and Settings self-service use cases.
/// Security Rule: Must be called with authenticated user identity context only.
/// </summary>
public interface IProfileService
{
    /// <summary>
    /// Retrieves the profile for the current authenticated user.
    /// </summary>
    Task<Result<UserProfileDto>> GetMyProfileAsync(Guid userId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Updates user-editable profile fields for the current authenticated user.
    /// </summary>
    Task<Result<UserProfileDto>> UpdateMyProfileAsync(Guid userId, UpdateProfileRequest request, CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves application settings for the current authenticated user.
    /// </summary>
    Task<Result<UserSettingsDto>> GetMySettingsAsync(Guid userId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Updates application settings for the current authenticated user.
    /// </summary>
    Task<Result<UserSettingsDto>> UpdateMySettingsAsync(Guid userId, UpdateSettingsRequest request, CancellationToken cancellationToken = default);
}
