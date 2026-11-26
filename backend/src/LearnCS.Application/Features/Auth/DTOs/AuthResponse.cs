namespace LearnCS.Application.Features.Auth.DTOs;

/// <summary>
/// Successful authentication payload containing signed JWT access token, raw refresh token, and user DTO.
/// </summary>
public record AuthResponse(
    string AccessToken,
    DateTime AccessTokenExpiresAt,
    string RefreshToken,
    UserDto User
);
