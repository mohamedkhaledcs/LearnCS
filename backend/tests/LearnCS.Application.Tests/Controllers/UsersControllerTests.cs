using System.Security.Claims;
using LearnCS.API.Controllers;
using LearnCS.Application.Common;
using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.Auth.DTOs;
using LearnCS.Application.Features.Profile.DTOs;
using LearnCS.Application.Features.Profile.Services;
using LearnCS.Domain.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Controllers;

public class UsersControllerTests
{
    private readonly Mock<IProfileService> _profileServiceMock = new();
    private readonly Mock<IUserRepository> _userRepositoryMock = new();
    private readonly UsersController _sut;

    public UsersControllerTests()
    {
        _sut = new UsersController(_profileServiceMock.Object);
    }

    private void SetUserContext(Guid userId)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, userId.ToString())
        };
        var identity = new ClaimsIdentity(claims, "TestAuth");
        var claimsPrincipal = new ClaimsPrincipal(identity);

        _sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = claimsPrincipal }
        };
    }

    [Fact]
    public async Task GetCurrentUser_Authenticated_ReturnsOkResultWithUserProfile()
    {
        // Arrange
        var userId = Guid.NewGuid();
        SetUserContext(userId);

        var mockUser = User.Create("learner1", "learner1@example.com", "hash");
        mockUser.VerifyEmail(); // sets EmailVerified=true and AccountStatus=Active

        _userRepositoryMock.Setup(r => r.FindByIdWithRolesAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(mockUser);

        // Act
        var actionResult = await _sut.GetCurrentUser(_userRepositoryMock.Object, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<UserDto>(okResult.Value);
        Assert.Equal("learner1", responseValue.Username);
        Assert.Equal("learner1@example.com", responseValue.Email);
    }

    [Fact]
    public async Task GetMyProfile_Authenticated_ReturnsOkResultWithUserProfile()
    {
        // Arrange
        var userId = Guid.NewGuid();
        SetUserContext(userId);

        var profileDto = new UserProfileDto(userId, "learner1", "learner1@example.com", "Jane", "Doe", "Jane Doe", "JaneD", null, null, null, null, null, null, null);

        _profileServiceMock.Setup(s => s.GetMyProfileAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<UserProfileDto>.Success(profileDto));

        // Act
        var actionResult = await _sut.GetMyProfile(CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<UserProfileDto>(okResult.Value);
        Assert.Equal(userId, responseValue.UserId);
    }

    [Fact]
    public async Task UpdateMyProfile_Success_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        SetUserContext(userId);

        var request = new UpdateProfileRequest("Jane", "Smith", "JaneS", "Updated bio", "Egypt", "Cairo", "UTC+2", null, null);
        var updatedDto = new UserProfileDto(userId, "learner1", "learner1@example.com", "Jane", "Smith", "Jane Smith", "JaneS", "Updated bio", null, "Egypt", "Cairo", "UTC+2", null, null);

        _profileServiceMock.Setup(s => s.UpdateMyProfileAsync(userId, request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<UserProfileDto>.Success(updatedDto));

        // Act
        var actionResult = await _sut.UpdateMyProfile(request, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<UserProfileDto>(okResult.Value);
        Assert.Equal("Smith", responseValue.LastName);
    }

    [Fact]
    public async Task UpdateMyProfile_InvalidInput_ReturnsBadRequest()
    {
        // Arrange
        var userId = Guid.NewGuid();
        SetUserContext(userId);

        var request = new UpdateProfileRequest("", "Smith");

        _profileServiceMock.Setup(s => s.UpdateMyProfileAsync(userId, request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<UserProfileDto>.Failure("First name is required.", "INVALID_INPUT"));

        // Act
        var actionResult = await _sut.UpdateMyProfile(request, CancellationToken.None);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(badRequestResult.Value);
        Assert.Equal(400, problem.Status);
        Assert.Equal("INVALID_INPUT", problem.Extensions["code"]);
    }

    [Fact]
    public async Task GetMySettings_Authenticated_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        SetUserContext(userId);

        var settingsDto = new UserSettingsDto(userId, "en", "dark", true, true, false);

        _profileServiceMock.Setup(s => s.GetMySettingsAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<UserSettingsDto>.Success(settingsDto));

        // Act
        var actionResult = await _sut.GetMySettings(CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<UserSettingsDto>(okResult.Value);
        Assert.Equal("dark", responseValue.Theme);
    }

    [Fact]
    public async Task UpdateMySettings_Success_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        SetUserContext(userId);

        var request = new UpdateSettingsRequest("en", "light", true, true, true);
        var updatedDto = new UserSettingsDto(userId, "en", "light", true, true, true);

        _profileServiceMock.Setup(s => s.UpdateMySettingsAsync(userId, request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<UserSettingsDto>.Success(updatedDto));

        // Act
        var actionResult = await _sut.UpdateMySettings(request, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<UserSettingsDto>(okResult.Value);
        Assert.Equal("light", responseValue.Theme);
    }

    [Fact]
    public async Task GetMyProfile_Unauthenticated_ReturnsUnauthorizedResult()
    {
        // Arrange - empty ClaimsPrincipal (unauthenticated)
        _sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = new ClaimsPrincipal() }
        };

        _profileServiceMock.Setup(s => s.GetMyProfileAsync(Guid.Empty, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<UserProfileDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED"));

        // Act
        var actionResult = await _sut.GetMyProfile(CancellationToken.None);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(unauthorizedResult.Value);
        Assert.Equal(401, problem.Status);
        Assert.Equal("UNAUTHORIZED", problem.Extensions["code"]);
    }
}
