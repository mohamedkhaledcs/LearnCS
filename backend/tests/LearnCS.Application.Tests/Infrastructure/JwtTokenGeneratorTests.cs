using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LearnCS.Domain.Identity;
using LearnCS.Infrastructure.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Xunit;

namespace LearnCS.Application.Tests.Infrastructure;

public class JwtTokenGeneratorTests
{
    private const string ValidSecretKey = "LearnCS-Dev-Secret-Key-2026-Replace-In-Production-Must-Be-32-Chars-Min";

    [Fact]
    public void GenerateAccessToken_ValidUser_ReturnsValidJwtResult()
    {
        // Arrange
        var options = Options.Create(new JwtOptions
        {
            SecretKey = ValidSecretKey,
            Issuer = "learncs-api",
            Audience = "learncs-client",
            AccessTokenExpiryMinutes = 60
        });

        var sut = new JwtTokenGenerator(options);
        var user = User.Create("learner1", "learner1@example.com", "HashedPassword123!");
        var roles = new[] { "Learner", "BetaUser" };

        // Act
        var tokenResult = sut.GenerateAccessToken(user, roles);

        // Assert
        Assert.NotNull(tokenResult);
        Assert.False(string.IsNullOrWhiteSpace(tokenResult.AccessToken));
        Assert.True(tokenResult.ExpiresAt > DateTime.UtcNow);

        // Validate Token Claims
        var tokenHandler = new JwtSecurityTokenHandler();
        var principal = tokenHandler.ValidateToken(tokenResult.AccessToken, new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ValidSecretKey)),
            ValidateIssuer = true,
            ValidIssuer = "learncs-api",
            ValidateAudience = true,
            ValidAudience = "learncs-client",
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        }, out _);

        Assert.NotNull(principal);
        Assert.Equal(user.Id.ToString(), principal.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        Assert.Equal(user.Username, principal.FindFirst(ClaimTypes.Name)?.Value);
        Assert.Equal(user.Email, principal.FindFirst(ClaimTypes.Email)?.Value);

        var roleClaims = principal.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList();
        Assert.Contains("Learner", roleClaims);
        Assert.Contains("BetaUser", roleClaims);
    }

    [Fact]
    public void GenerateAccessToken_ShortSecretKey_ThrowsInvalidOperationException()
    {
        // Arrange
        var options = Options.Create(new JwtOptions
        {
            SecretKey = "too-short"
        });

        var sut = new JwtTokenGenerator(options);
        var user = User.Create("learner1", "learner1@example.com", "HashedPassword123!");

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(() => sut.GenerateAccessToken(user, Array.Empty<string>()));
        Assert.Contains("at least 256 bits", ex.Message);
    }

    [Fact]
    public void GenerateAccessToken_MissingSecretKey_ThrowsInvalidOperationException()
    {
        // Arrange
        var options = Options.Create(new JwtOptions
        {
            SecretKey = ""
        });

        var sut = new JwtTokenGenerator(options);
        var user = User.Create("learner1", "learner1@example.com", "HashedPassword123!");

        // Act & Assert
        var ex = Assert.Throws<InvalidOperationException>(() => sut.GenerateAccessToken(user, Array.Empty<string>()));
        Assert.Contains("not configured", ex.Message);
    }

    [Fact]
    public void GenerateRefreshToken_ReturnsNonEmptyTokenAndValidHash()
    {
        // Arrange
        var options = Options.Create(new JwtOptions
        {
            SecretKey = ValidSecretKey,
            RefreshTokenExpiryDays = 30
        });

        var sut = new JwtTokenGenerator(options);

        // Act
        var refreshResult = sut.GenerateRefreshToken();

        // Assert
        Assert.NotNull(refreshResult);
        Assert.False(string.IsNullOrWhiteSpace(refreshResult.RawToken));
        Assert.False(string.IsNullOrWhiteSpace(refreshResult.TokenHash));
        Assert.True(refreshResult.ExpiresAt > DateTime.UtcNow);

        // Hash verification
        var computedHash = sut.HashRefreshToken(refreshResult.RawToken);
        Assert.Equal(refreshResult.TokenHash, computedHash);
    }
}
