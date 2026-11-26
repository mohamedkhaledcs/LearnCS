using LearnCS.API.Controllers;
using LearnCS.Application.Common;
using LearnCS.Application.Features.Auth.DTOs;
using LearnCS.Application.Features.Auth.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Controllers;

public class AuthControllerTests
{
    private readonly Mock<IAuthService> _authServiceMock = new();
    private readonly AuthController _sut;

    public AuthControllerTests()
    {
        _sut = new AuthController(_authServiceMock.Object);
    }

    [Fact]
    public async Task Register_Success_ReturnsOkObjectResultWithAuthResponse()
    {
        // Arrange
        var request = new RegisterRequest("learner1", "learner1@example.com", "Password123!");
        var userDto = new UserDto(Guid.NewGuid(), "learner1", "learner1@example.com", "Active", false, new[] { "User" });
        var authResponse = new AuthResponse("access_token", DateTime.UtcNow.AddHours(1), "refresh_token", userDto);

        _authServiceMock.Setup(s => s.RegisterAsync(request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AuthResponse>.Success(authResponse));

        // Act
        var actionResult = await _sut.Register(request, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<AuthResponse>(okResult.Value);
        Assert.Equal("access_token", responseValue.AccessToken);
        Assert.Equal("learner1", responseValue.User.Username);
    }

    [Fact]
    public async Task Register_DuplicateUsername_ReturnsBadRequestWithProblemDetails()
    {
        // Arrange
        var request = new RegisterRequest("existinguser", "email@example.com", "Password123!");

        _authServiceMock.Setup(s => s.RegisterAsync(request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AuthResponse>.Failure("Username 'existinguser' is already taken.", "DUPLICATE_USERNAME"));

        // Act
        var actionResult = await _sut.Register(request, CancellationToken.None);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(badRequestResult.Value);
        Assert.Equal(400, problem.Status);
        Assert.Equal("DUPLICATE_USERNAME", problem.Extensions["code"]);
    }

    [Fact]
    public async Task Login_Success_ReturnsOkObjectResultWithAuthResponse()
    {
        // Arrange
        var request = new LoginRequest("learner1@example.com", "Password123!");
        var userDto = new UserDto(Guid.NewGuid(), "learner1", "learner1@example.com", "Active", false, new[] { "User" });
        var authResponse = new AuthResponse("access_token", DateTime.UtcNow.AddHours(1), "refresh_token", userDto);

        _authServiceMock.Setup(s => s.LoginAsync(request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AuthResponse>.Success(authResponse));

        // Act
        var actionResult = await _sut.Login(request, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<AuthResponse>(okResult.Value);
        Assert.Equal("access_token", responseValue.AccessToken);
    }

    [Fact]
    public async Task Login_InvalidCredentials_ReturnsUnauthorizedWithProblemDetails()
    {
        // Arrange
        var request = new LoginRequest("wrong@example.com", "WrongPassword");

        _authServiceMock.Setup(s => s.LoginAsync(request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AuthResponse>.Failure("Invalid credentials.", "INVALID_CREDENTIALS"));

        // Act
        var actionResult = await _sut.Login(request, CancellationToken.None);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(unauthorizedResult.Value);
        Assert.Equal(401, problem.Status);
        Assert.Equal("INVALID_CREDENTIALS", problem.Extensions["code"]);
    }

    [Fact]
    public async Task RefreshToken_Success_ReturnsOkObjectResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var request = new RefreshTokenRequest(userId, "valid_refresh_token");
        var userDto = new UserDto(userId, "learner1", "learner1@example.com", "Active", false, new[] { "User" });
        var authResponse = new AuthResponse("new_access_token", DateTime.UtcNow.AddHours(1), "new_refresh_token", userDto);

        _authServiceMock.Setup(s => s.RefreshTokenAsync(request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AuthResponse>.Success(authResponse));

        // Act
        var actionResult = await _sut.RefreshToken(request, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<AuthResponse>(okResult.Value);
        Assert.Equal("new_access_token", responseValue.AccessToken);
    }

    [Fact]
    public async Task RefreshToken_InvalidToken_ReturnsUnauthorized()
    {
        // Arrange
        var request = new RefreshTokenRequest(Guid.NewGuid(), "invalid_token");

        _authServiceMock.Setup(s => s.RefreshTokenAsync(request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AuthResponse>.Failure("Invalid or expired refresh token.", "UNAUTHORIZED"));

        // Act
        var actionResult = await _sut.RefreshToken(request, CancellationToken.None);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(unauthorizedResult.Value);
        Assert.Equal(401, problem.Status);
        Assert.Equal("UNAUTHORIZED", problem.Extensions["code"]);
    }
}
