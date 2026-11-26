namespace LearnCS.Infrastructure.Authentication;

/// <summary>
/// Strongly typed options for JWT access token and refresh token configuration.
/// </summary>
public class JwtOptions
{
    public const string SectionName = "Jwt";

    public string SecretKey { get; set; } = string.Empty;
    public string Issuer { get; set; } = "learncs-api";
    public string Audience { get; set; } = "learncs-client";
    public int AccessTokenExpiryMinutes { get; set; } = 60;
    public int RefreshTokenExpiryDays { get; set; } = 30;
}
