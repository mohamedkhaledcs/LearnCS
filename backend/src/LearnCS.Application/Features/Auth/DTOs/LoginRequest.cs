namespace LearnCS.Application.Features.Auth.DTOs;

/// <summary>
/// User login request accepting email or username along with the password.
/// </summary>
public record LoginRequest(
    string EmailOrUsername,
    string Password
);
