namespace LearnCS.Application.Features.Profile.DTOs;

/// <summary>
/// Safe profile view DTO. Exposes non-sensitive user identity and profile fields only.
/// Password hashes, refresh token data, and internal security fields are NEVER included.
/// </summary>
public record UserProfileDto(
    Guid UserId,
    string Username,
    string Email,
    string FirstName,
    string LastName,
    string FullName,
    string? DisplayName,
    string? Bio,
    string? AvatarUrl,
    string? Country,
    string? City,
    string? Timezone,
    string? Website,
    DateOnly? DateOfBirth,
    DateTime? JoinedAt = null
);
