namespace LearnCS.Application.Features.Auth.DTOs;

/// <summary>
/// Self-registration request.
/// Note: Clients CANNOT specify roles. Self-registration strictly creates standard User (Learner) accounts.
/// </summary>
public record RegisterRequest(
    string Username,
    string Email,
    string Password,
    string? FirstName = null,
    string? LastName = null
);
