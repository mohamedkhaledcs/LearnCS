namespace LearnCS.Application.Features.Auth.DTOs;

/// <summary>
/// Request to renew an expired access token using a valid refresh token.
/// </summary>
public record RefreshTokenRequest(
    Guid UserId,
    string RefreshToken
);
