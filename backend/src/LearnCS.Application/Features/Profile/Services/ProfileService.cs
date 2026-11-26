using LearnCS.Application.Common;
using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.Profile.DTOs;
using LearnCS.Domain.Identity;

namespace LearnCS.Application.Features.Profile.Services;

public class ProfileService(
    IUserRepository userRepository,
    IUserProfileRepository userProfileRepository,
    IUnitOfWork unitOfWork) : IProfileService
{
    public async Task<Result<UserProfileDto>> GetMyProfileAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<UserProfileDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var user = await userRepository.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            return Result<UserProfileDto>.Failure("User account not found.", "USER_NOT_FOUND");
        }

        var profile = await userProfileRepository.GetByUserIdAsync(userId, trackForUpdate: false, cancellationToken);
        if (profile == null)
        {
            // Auto-create default profile if missing for existing user
            profile = UserProfile.Create(user.Id, user.Username, string.Empty);
            userProfileRepository.Add(profile);
            await unitOfWork.SaveChangesAsync(cancellationToken);
        }

        return Result<UserProfileDto>.Success(MapToDto(user, profile));
    }

    public async Task<Result<UserProfileDto>> UpdateMyProfileAsync(Guid userId, UpdateProfileRequest request, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<UserProfileDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        if (string.IsNullOrWhiteSpace(request.FirstName))
        {
            return Result<UserProfileDto>.Failure("First name is required.", "INVALID_INPUT");
        }

        if (string.IsNullOrWhiteSpace(request.LastName))
        {
            return Result<UserProfileDto>.Failure("Last name is required.", "INVALID_INPUT");
        }

        var user = await userRepository.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            return Result<UserProfileDto>.Failure("User account not found.", "USER_NOT_FOUND");
        }

        var profile = await userProfileRepository.GetByUserIdAsync(userId, trackForUpdate: true, cancellationToken);
        if (profile == null)
        {
            profile = UserProfile.Create(userId, request.FirstName.Trim(), request.LastName.Trim());
            profile.Update(
                request.FirstName.Trim(),
                request.LastName.Trim(),
                request.DisplayName?.Trim(),
                request.Bio?.Trim(),
                request.Country?.Trim(),
                request.City?.Trim(),
                request.Timezone?.Trim(),
                request.Website?.Trim(),
                request.DateOfBirth
            );
            userProfileRepository.Add(profile);
        }
        else
        {
            profile.Update(
                request.FirstName.Trim(),
                request.LastName.Trim(),
                request.DisplayName?.Trim(),
                request.Bio?.Trim(),
                request.Country?.Trim(),
                request.City?.Trim(),
                request.Timezone?.Trim(),
                request.Website?.Trim(),
                request.DateOfBirth
            );
        }

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<UserProfileDto>.Success(MapToDto(user, profile));
    }

    public async Task<Result<UserSettingsDto>> GetMySettingsAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<UserSettingsDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var user = await userRepository.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            return Result<UserSettingsDto>.Failure("User account not found.", "USER_NOT_FOUND");
        }

        var settings = await userProfileRepository.GetSettingsByUserIdAsync(userId, cancellationToken);
        if (settings == null)
        {
            settings = UserSettings.CreateDefaults(userId);
            userProfileRepository.Add(settings);
            await unitOfWork.SaveChangesAsync(cancellationToken);
        }

        return Result<UserSettingsDto>.Success(MapToDto(settings));
    }

    public async Task<Result<UserSettingsDto>> UpdateMySettingsAsync(Guid userId, UpdateSettingsRequest request, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<UserSettingsDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        if (string.IsNullOrWhiteSpace(request.Language))
        {
            return Result<UserSettingsDto>.Failure("Language preference is required.", "INVALID_INPUT");
        }

        if (string.IsNullOrWhiteSpace(request.Theme))
        {
            return Result<UserSettingsDto>.Failure("Theme preference is required.", "INVALID_INPUT");
        }

        var user = await userRepository.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            return Result<UserSettingsDto>.Failure("User account not found.", "USER_NOT_FOUND");
        }

        var settings = await userProfileRepository.GetSettingsByUserIdAsync(userId, cancellationToken);
        if (settings == null)
        {
            settings = UserSettings.CreateDefaults(userId);
            settings.Update(
                request.Language.Trim(),
                request.Theme.Trim(),
                request.EmailNotifications,
                request.PushNotifications,
                request.MarketingEmails
            );
            userProfileRepository.Add(settings);
        }
        else
        {
            settings.Update(
                request.Language.Trim(),
                request.Theme.Trim(),
                request.EmailNotifications,
                request.PushNotifications,
                request.MarketingEmails
            );
        }

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<UserSettingsDto>.Success(MapToDto(settings));
    }

    private static UserProfileDto MapToDto(User user, UserProfile profile)
    {
        return new UserProfileDto(
            user.Id,
            user.Username,
            user.Email,
            profile.FirstName,
            profile.LastName,
            profile.FullName,
            profile.DisplayName,
            profile.Bio,
            profile.AvatarUrl,
            profile.Country,
            profile.City,
            profile.Timezone,
            profile.Website,
            profile.DateOfBirth,
            user.CreatedAt
        );
    }

    private static UserSettingsDto MapToDto(UserSettings settings)
    {
        return new UserSettingsDto(
            settings.UserId,
            settings.Language,
            settings.Theme,
            settings.EmailNotifications,
            settings.PushNotifications,
            settings.MarketingEmails
        );
    }
}
