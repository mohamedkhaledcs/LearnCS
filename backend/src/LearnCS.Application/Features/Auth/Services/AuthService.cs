using LearnCS.Application.Common;
using LearnCS.Application.Contracts.Authentication;
using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.Auth.DTOs;
using LearnCS.Domain.Identity;

namespace LearnCS.Application.Features.Auth.Services;

public class AuthService(
    IUserRepository userRepository,
    IUserProfileRepository userProfileRepository,
    IPasswordHasher passwordHasher,
    IJwtTokenGenerator jwtTokenGenerator,
    IUnitOfWork unitOfWork) : IAuthService
{
    public async Task<Result<AuthResponse>> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default)
    {
        // 1. Basic validation
        if (string.IsNullOrWhiteSpace(request.Username) || request.Username.Trim().Length < 3)
        {
            return Result<AuthResponse>.Failure("Username must be at least 3 characters long.", "INVALID_USERNAME");
        }

        if (string.IsNullOrWhiteSpace(request.Email) || !request.Email.Contains('@'))
        {
            return Result<AuthResponse>.Failure("A valid email address is required.", "INVALID_EMAIL");
        }

        if (string.IsNullOrWhiteSpace(request.Password) || request.Password.Length < 6)
        {
            return Result<AuthResponse>.Failure("Password must be at least 6 characters long.", "INVALID_PASSWORD");
        }

        var normalizedEmail = request.Email.Trim().ToLowerInvariant();
        var normalizedUsername = request.Username.Trim().ToLowerInvariant();

        // 2. Uniqueness checks
        if (await userRepository.ExistsByEmailAsync(normalizedEmail, cancellationToken))
        {
            return Result<AuthResponse>.Failure("An account with this email already exists.", "DUPLICATE_EMAIL");
        }

        if (await userRepository.ExistsByUsernameAsync(normalizedUsername, cancellationToken))
        {
            return Result<AuthResponse>.Failure("Username is already taken.", "DUPLICATE_USERNAME");
        }

        // 3. Hash password
        var passwordHash = passwordHasher.HashPassword(request.Password);

        // 4. Create User entity (Enforces: Self-registration strictly creates standard User / Learner)
        var user = User.Create(normalizedUsername, normalizedEmail, passwordHash);
        user.Activate(); // Activate for immediate access in dev environment

        userRepository.Add(user);

        // 5. Create default UserProfile & UserSettings
        var profile = UserProfile.Create(
            user.Id,
            string.IsNullOrWhiteSpace(request.FirstName) ? normalizedUsername : request.FirstName.Trim(),
            request.LastName?.Trim() ?? string.Empty
        );
        userProfileRepository.Add(profile);

        var settings = UserSettings.CreateDefaults(user.Id);
        userProfileRepository.Add(settings);

        // 6. Default RBAC role assignment (persisted in identity.user_roles)
        var defaultRole = await userRepository.FindRoleByNameAsync("User", cancellationToken);
        if (defaultRole == null)
        {
            defaultRole = Role.Create("User", "Standard learner account", isSystemRole: true);
            userRepository.AddRole(defaultRole);
        }
        userRepository.AddUserRole(UserRole.Create(user.Id, defaultRole.Id));
        var roles = new[] { defaultRole.Name };

        // 7. Token generation
        var jwtResult = jwtTokenGenerator.GenerateAccessToken(user, roles);
        var refreshResult = jwtTokenGenerator.GenerateRefreshToken();

        var refreshTokenEntity = RefreshToken.Create(
            user.Id,
            refreshResult.TokenHash,
            refreshResult.ExpiresAt
        );
        userRepository.AddRefreshToken(refreshTokenEntity);

        // 8. Commit persistence unit of work
        await unitOfWork.SaveChangesAsync(cancellationToken);

        // 9. Build safe DTO
        var userDto = new UserDto(
            user.Id,
            user.Username,
            user.Email,
            user.AccountStatus.ToString(),
            user.EmailVerified,
            roles
        );

        return Result<AuthResponse>.Success(new AuthResponse(
            jwtResult.AccessToken,
            jwtResult.ExpiresAt,
            refreshResult.RawToken,
            userDto
        ));
    }

    public async Task<Result<AuthResponse>> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(request.EmailOrUsername) || string.IsNullOrWhiteSpace(request.Password))
        {
            return Result<AuthResponse>.Failure("Email/username and password are required.", "INVALID_INPUT");
        }

        var input = request.EmailOrUsername.Trim().ToLowerInvariant();

        // 1. Locate user by email or username
        var user = input.Contains('@')
            ? await userRepository.FindByEmailAsync(input, cancellationToken)
            : await userRepository.FindByUsernameAsync(input, cancellationToken);

        if (user == null)
        {
            return Result<AuthResponse>.Failure("Invalid email/username or password.", "INVALID_CREDENTIALS");
        }

        // 2. Check lockout status
        if (user.IsLockedOut())
        {
            return Result<AuthResponse>.Failure("Account is temporarily locked due to multiple failed attempts. Please try again later.", "ACCOUNT_LOCKED");
        }

        // 3. Verify password
        if (!passwordHasher.VerifyPassword(request.Password, user.PasswordHash))
        {
            user.RecordFailedLogin();
            userRepository.Update(user);
            await unitOfWork.SaveChangesAsync(cancellationToken);
            return Result<AuthResponse>.Failure("Invalid email/username or password.", "INVALID_CREDENTIALS");
        }

        // 4. Verify account status
        if (user.AccountStatus == AccountStatus.Suspended)
        {
            return Result<AuthResponse>.Failure("Account is suspended. Please contact support.", "FORBIDDEN");
        }

        // 5. Record successful login and eager load roles (Tracked entity)
        var userWithRoles = await userRepository.FindByIdWithRolesAsync(user.Id, cancellationToken) ?? user;
        
        userWithRoles.RecordLogin();
        userRepository.Update(userWithRoles);

        var roleNames = userWithRoles.UserRoles
            .Select(ur => ur.Role?.Name ?? "User")
            .Where(r => !string.IsNullOrWhiteSpace(r))
            .Distinct()
            .ToList();

        if (roleNames.Count == 0)
        {
            roleNames.Add("User");
        }

        // 7. Token generation
        var jwtResult = jwtTokenGenerator.GenerateAccessToken(userWithRoles, roleNames);
        var refreshResult = jwtTokenGenerator.GenerateRefreshToken();

        var refreshTokenEntity = RefreshToken.Create(
            user.Id,
            refreshResult.TokenHash,
            refreshResult.ExpiresAt
        );
        userRepository.AddRefreshToken(refreshTokenEntity);

        // 8. Save changes
        await unitOfWork.SaveChangesAsync(cancellationToken);

        // 9. Build response payload
        var userDto = new UserDto(
            user.Id,
            user.Username,
            user.Email,
            user.AccountStatus.ToString(),
            user.EmailVerified,
            roleNames
        );

        return Result<AuthResponse>.Success(new AuthResponse(
            jwtResult.AccessToken,
            jwtResult.ExpiresAt,
            refreshResult.RawToken,
            userDto
        ));
    }

    public async Task<Result<AuthResponse>> RefreshTokenAsync(RefreshTokenRequest request, CancellationToken cancellationToken = default)
    {
        if (request.UserId == Guid.Empty || string.IsNullOrWhiteSpace(request.RefreshToken))
        {
            return Result<AuthResponse>.Failure("Invalid refresh token request.", "INVALID_REQUEST");
        }

        // 1. Hash incoming raw refresh token string for lookup
        var tokenHash = jwtTokenGenerator.HashRefreshToken(request.RefreshToken);

        // 2. Locate active non-expired refresh token in persistence
        var existingRefreshToken = await userRepository.FindActiveRefreshTokenAsync(request.UserId, tokenHash, cancellationToken);
        if (existingRefreshToken == null || !existingRefreshToken.IsActive)
        {
            return Result<AuthResponse>.Failure("Invalid, expired, or revoked refresh token.", "INVALID_REFRESH_TOKEN");
        }

        // 3. Locate user with roles
        var userWithRoles = await userRepository.FindByIdWithRolesAsync(request.UserId, cancellationToken);
        if (userWithRoles == null || userWithRoles.AccountStatus == AccountStatus.Suspended)
        {
            return Result<AuthResponse>.Failure("User account is inactive or suspended.", "USER_INACTIVE");
        }

        // 4. Generate new refresh token
        var newRefreshResult = jwtTokenGenerator.GenerateRefreshToken();
        var newRefreshTokenEntity = RefreshToken.Create(
            userWithRoles.Id,
            newRefreshResult.TokenHash,
            newRefreshResult.ExpiresAt
        );
        userRepository.AddRefreshToken(newRefreshTokenEntity);

        // 5. Revoke old refresh token (link to replaced token)
        existingRefreshToken.Revoke(replacedById: newRefreshTokenEntity.Id);

        // 6. Generate new access token
        var roleNames = userWithRoles.UserRoles
            .Select(ur => ur.Role?.Name ?? "User")
            .Where(r => !string.IsNullOrWhiteSpace(r))
            .Distinct()
            .ToList();

        if (roleNames.Count == 0)
        {
            roleNames.Add("User");
        }

        var jwtResult = jwtTokenGenerator.GenerateAccessToken(userWithRoles, roleNames);

        // 7. Save changes
        await unitOfWork.SaveChangesAsync(cancellationToken);

        var userDto = new UserDto(
            userWithRoles.Id,
            userWithRoles.Username,
            userWithRoles.Email,
            userWithRoles.AccountStatus.ToString(),
            userWithRoles.EmailVerified,
            roleNames
        );

        return Result<AuthResponse>.Success(new AuthResponse(
            jwtResult.AccessToken,
            jwtResult.ExpiresAt,
            newRefreshResult.RawToken,
            userDto
        ));
    }

    public async Task<Result<bool>> ChangePasswordAsync(Guid userId, ChangePasswordRequest request, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<bool>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        if (string.IsNullOrWhiteSpace(request.CurrentPassword) || string.IsNullOrWhiteSpace(request.NewPassword) || request.NewPassword.Length < 6)
        {
            return Result<bool>.Failure("Current password and a new password (min 6 chars) are required.", "INVALID_INPUT");
        }

        var user = await userRepository.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            return Result<bool>.Failure("User account not found.", "USER_NOT_FOUND");
        }

        if (!passwordHasher.VerifyPassword(request.CurrentPassword, user.PasswordHash))
        {
            return Result<bool>.Failure("Current password is incorrect.", "INVALID_CREDENTIALS");
        }

        user.UpdatePasswordHash(passwordHasher.HashPassword(request.NewPassword));
        userRepository.Update(user);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<bool>.Success(true);
    }
}
