namespace LearnCS.Application.Features.Profile.DTOs;

/// <summary>
/// Request DTO for updating user-editable profile information.
/// Security Notice: Does NOT accept UserId, Roles, AccountStatus, or Password credentials.
/// </summary>
public record UpdateProfileRequest(
    string FirstName,
    string LastName,
    string? DisplayName = null,
    string? Bio = null,
    string? Country = null,
    string? City = null,
    string? Timezone = null,
    string? Website = null,
    DateOnly? DateOfBirth = null
);
