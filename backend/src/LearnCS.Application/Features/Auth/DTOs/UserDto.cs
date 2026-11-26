namespace LearnCS.Application.Features.Auth.DTOs;

/// <summary>
/// Safe user summary DTO returning public identity fields without exposing password/token hashes.
/// </summary>
public record UserDto(
    Guid Id,
    string Username,
    string Email,
    string AccountStatus,
    bool EmailVerified,
    IReadOnlyList<string> Roles
);
