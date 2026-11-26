using LearnCS.Domain.Identity;

namespace LearnCS.Application.Contracts.Authentication;

public record JwtTokenResult(string AccessToken, DateTime ExpiresAt);
public record RefreshTokenResult(string RawToken, string TokenHash, DateTime ExpiresAt);

/// <summary>
/// Abstraction for generating JWT access tokens and cryptographically secure refresh tokens.
/// </summary>
public interface IJwtTokenGenerator
{
    /// <summary>
    /// Generates a signed JWT access token for the given user and roles.
    /// </summary>
    JwtTokenResult GenerateAccessToken(User user, IEnumerable<string> roles);

    /// <summary>
    /// Generates a raw refresh token string along with its deterministic hash and expiration date.
    /// </summary>
    RefreshTokenResult GenerateRefreshToken();

    /// <summary>
    /// Computes the deterministic hash for a raw refresh token string for lookup in persistence.
    /// </summary>
    string HashRefreshToken(string rawToken);
}
