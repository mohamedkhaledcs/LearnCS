using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.Profile.DTOs;
using LearnCS.Application.Features.Profile.Services;
using LearnCS.Domain.Identity;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Features.Profile;

public class ProfileServiceTests
{
    private readonly Mock<IUserRepository> _userRepoMock = new();
    private readonly Mock<IUserProfileRepository> _profileRepoMock = new();
    private readonly Mock<IUnitOfWork> _unitOfWorkMock = new();
    private readonly ProfileService _sut;

    public ProfileServiceTests()
    {
        _sut = new ProfileService(_userRepoMock.Object, _profileRepoMock.Object, _unitOfWorkMock.Object);
    }

    [Fact]
    public async Task GetMyProfileAsync_ValidUser_ReturnsProfileDto()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var user = User.Create("john_doe", "john@example.com", "hashed_password");
        var profile = UserProfile.Create(userId, "John", "Doe");

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        _profileRepoMock.Setup(r => r.GetByUserIdAsync(userId, false, It.IsAny<CancellationToken>()))
            .ReturnsAsync(profile);

        // Act
        var result = await _sut.GetMyProfileAsync(userId);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal("john_doe", result.Value.Username);
        Assert.Equal("john@example.com", result.Value.Email);
        Assert.Equal("John", result.Value.FirstName);
        Assert.Equal("Doe", result.Value.LastName);
    }

    [Fact]
    public async Task GetMyProfileAsync_EmptyUserId_ReturnsUnauthorizedFailure()
    {
        // Act
        var result = await _sut.GetMyProfileAsync(Guid.Empty);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("UNAUTHORIZED", result.ErrorCode);
    }

    [Fact]
    public async Task GetMyProfileAsync_NonExistentUser_ReturnsNotFoundFailure()
    {
        // Arrange
        var userId = Guid.NewGuid();
        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((User?)null);

        // Act
        var result = await _sut.GetMyProfileAsync(userId);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("USER_NOT_FOUND", result.ErrorCode);
    }

    [Fact]
    public async Task UpdateMyProfileAsync_ValidUpdate_MutatesProfileAndSaves()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var user = User.Create("john_doe", "john@example.com", "hashed_password");
        var profile = UserProfile.Create(userId, "John", "Doe");

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        _profileRepoMock.Setup(r => r.GetByUserIdAsync(userId, true, It.IsAny<CancellationToken>()))
            .ReturnsAsync(profile);

        var updateReq = new UpdateProfileRequest(
            FirstName: "Jonathan",
            LastName: "Doe",
            Bio: "Learning CS algorithms!",
            Country: "Egypt"
        );

        // Act
        var result = await _sut.UpdateMyProfileAsync(userId, updateReq);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.Equal("Jonathan", result.Value!.FirstName);
        Assert.Equal("Learning CS algorithms!", result.Value.Bio);
        Assert.Equal("Egypt", result.Value.Country);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task UpdateMyProfileAsync_BlankFirstName_ReturnsInvalidInputFailure()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var updateReq = new UpdateProfileRequest(FirstName: "", LastName: "Doe");

        // Act
        var result = await _sut.UpdateMyProfileAsync(userId, updateReq);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("INVALID_INPUT", result.ErrorCode);
    }

    [Fact]
    public async Task GetMySettingsAsync_ValidUser_ReturnsSettingsDto()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var user = User.Create("john_doe", "john@example.com", "hashed_password");
        var settings = UserSettings.CreateDefaults(userId);

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        _profileRepoMock.Setup(r => r.GetSettingsByUserIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(settings);

        // Act
        var result = await _sut.GetMySettingsAsync(userId);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.Equal("en", result.Value!.Language);
        Assert.Equal("system", result.Value.Theme);
        Assert.True(result.Value.EmailNotifications);
    }

    [Fact]
    public async Task UpdateMySettingsAsync_ValidUpdate_UpdatesAndSaves()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var user = User.Create("john_doe", "john@example.com", "hashed_password");
        var settings = UserSettings.CreateDefaults(userId);

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        _profileRepoMock.Setup(r => r.GetSettingsByUserIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(settings);

        var updateReq = new UpdateSettingsRequest(
            Language: "ar",
            Theme: "dark",
            EmailNotifications: false,
            PushNotifications: true,
            MarketingEmails: false
        );

        // Act
        var result = await _sut.UpdateMySettingsAsync(userId, updateReq);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.Equal("ar", result.Value!.Language);
        Assert.Equal("dark", result.Value.Theme);
        Assert.False(result.Value.EmailNotifications);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public void SecurityTest_UserProfileDto_NeverExposesSensitiveDataFields()
    {
        // Verify via Reflection that UserProfileDto does not contain sensitive security properties
        var properties = typeof(UserProfileDto).GetProperties().Select(p => p.Name).ToList();

        Assert.DoesNotContain("PasswordHash", properties);
        Assert.DoesNotContain("TokenHash", properties);
        Assert.DoesNotContain("RefreshToken", properties);
        Assert.DoesNotContain("AccountStatus", properties);
    }

    [Fact]
    public void SecurityTest_UpdateProfileRequest_DoesNotAllowMassAssignmentOfPrivileges()
    {
        // Verify via Reflection that UpdateProfileRequest does not accept security fields
        var properties = typeof(UpdateProfileRequest).GetProperties().Select(p => p.Name).ToList();

        Assert.DoesNotContain("UserId", properties);
        Assert.DoesNotContain("Role", properties);
        Assert.DoesNotContain("Roles", properties);
        Assert.DoesNotContain("AccountStatus", properties);
        Assert.DoesNotContain("IsActive", properties);
        Assert.DoesNotContain("IsDeleted", properties);
    }
}
