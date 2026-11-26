using LearnCS.Application.Common;
using LearnCS.Application.Features.Auth.DTOs;

namespace LearnCS.Application.Features.Auth.Services;

/// <summary>
/// Service contract for authentication use cases (Register, Login, Refresh Token).
/// Orchestrates domain entities, repositories, security abstractions, and persistence.
/// </summary>
public interface IAuthService
{
    /// <summary>
    /// Self-registers a new learner account with default User role.
    /// </summary>
    Task<Result<AuthResponse>> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default);

    /// <summary>
    /// Authenticates user credentials and issues access & refresh tokens.
    /// </summary>
    Task<Result<AuthResponse>> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);

    /// <summary>
    /// Validates an active refresh token, revokes it, and issues a new token pair.
    /// </summary>
    Task<Result<AuthResponse>> RefreshTokenAsync(RefreshTokenRequest request, CancellationToken cancellationToken = default);

    /// <summary>
    /// Changes the password for the authenticated user after verifying the current password.
    /// </summary>
    Task<Result<bool>> ChangePasswordAsync(Guid userId, ChangePasswordRequest request, CancellationToken cancellationToken = default);
}

public record ChangePasswordRequest(string CurrentPassword, string NewPassword);
