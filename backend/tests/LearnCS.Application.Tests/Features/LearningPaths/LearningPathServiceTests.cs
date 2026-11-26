using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.LearningPaths.DTOs;
using LearnCS.Application.Features.LearningPaths.Services;
using LearnCS.Domain.Identity;
using LearnCS.Domain.Knowledge;
using LearnCS.Domain.Learning;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Features.LearningPaths;

public class LearningPathServiceTests
{
    private readonly Mock<ILearningPathRepository> _pathRepoMock = new();
    private readonly Mock<IUserRepository> _userRepoMock = new();
    private readonly Mock<IUnitOfWork> _unitOfWorkMock = new();
    private readonly LearningPathService _sut;

    public LearningPathServiceTests()
    {
        _sut = new LearningPathService(_pathRepoMock.Object, _userRepoMock.Object, _unitOfWorkMock.Object);
    }

    [Fact]
    public async Task GetPublishedLearningPaths_ReturnsOnlyPublishedPaths()
    {
        // Arrange
        var p1 = LearningPath.Create("CS Foundations", "cs-foundations", ConceptDifficulty.Beginner, 40);
        p1.Publish();

        _pathRepoMock.Setup(r => r.GetAllPublishedAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<LearningPath> { p1 });

        // Act
        var result = await _sut.GetPublishedLearningPathsAsync();

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Single(result.Value);
        Assert.Equal("CS Foundations", result.Value[0].Title);
        Assert.Equal("cs-foundations", result.Value[0].Slug);
    }

    [Fact]
    public async Task GetLearningPathBySlug_PublishedPath_ReturnsDetails()
    {
        // Arrange
        var path = LearningPath.Create("CS Foundations", "cs-foundations", ConceptDifficulty.Beginner, 40, "Core CS concepts.");
        path.Publish();

        _pathRepoMock.Setup(r => r.FindBySlugWithTracksAsync("cs-foundations", It.IsAny<CancellationToken>()))
            .ReturnsAsync(path);

        // Act
        var result = await _sut.GetLearningPathBySlugAsync("cs-foundations");

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal("CS Foundations", result.Value.Title);
        Assert.Equal("cs-foundations", result.Value.Slug);
    }

    [Fact]
    public async Task GetLearningPathBySlug_DraftPath_ReturnsNotFoundFailure()
    {
        // Arrange (Draft status)
        var path = LearningPath.Create("Draft Path", "draft-path", ConceptDifficulty.Beginner, 10);

        _pathRepoMock.Setup(r => r.FindBySlugWithTracksAsync("draft-path", It.IsAny<CancellationToken>()))
            .ReturnsAsync(path);

        // Act
        var result = await _sut.GetLearningPathBySlugAsync("draft-path");

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("NOT_FOUND", result.ErrorCode);
    }

    [Fact]
    public async Task CreateLearningPath_LearnerUserRole_ReturnsForbiddenFailure()
    {
        // Arrange
        var req = new CreateLearningPathRequest("Data Structures", "data-structures", ConceptDifficulty.Intermediate, 50);
        var learnerRoles = new[] { "User" };

        // Act
        var result = await _sut.CreateLearningPathAsync(req, learnerRoles);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("FORBIDDEN", result.ErrorCode);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task CreateLearningPath_MentorRole_CreatesPathSuccessfully()
    {
        // Arrange
        var req = new CreateLearningPathRequest("Algorithms", "algorithms", ConceptDifficulty.Intermediate, 60, "Master algorithms.", null, true);
        var mentorRoles = new[] { "Mentor" };

        _pathRepoMock.Setup(r => r.ExistsBySlugAsync("algorithms", It.IsAny<CancellationToken>()))
            .ReturnsAsync(false);

        // Act
        var result = await _sut.CreateLearningPathAsync(req, mentorRoles);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.Equal("Algorithms", result.Value!.Title);
        Assert.Equal("Published", result.Value.Status);
        _pathRepoMock.Verify(r => r.Add(It.IsAny<LearningPath>()), Times.Once);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task CreateLearningPath_DuplicateSlug_ReturnsSlugExistsFailure()
    {
        // Arrange
        var req = new CreateLearningPathRequest("CS Foundations", "cs-foundations", ConceptDifficulty.Beginner, 40);
        var mentorRoles = new[] { "Mentor" };

        _pathRepoMock.Setup(r => r.ExistsBySlugAsync("cs-foundations", It.IsAny<CancellationToken>()))
            .ReturnsAsync(true);

        // Act
        var result = await _sut.CreateLearningPathAsync(req, mentorRoles);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("SLUG_EXISTS", result.ErrorCode);
    }

    [Fact]
    public async Task UpdateLearningPath_LearnerRole_ReturnsForbiddenFailure()
    {
        // Arrange
        var pathId = Guid.NewGuid();
        var req = new UpdateLearningPathRequest("New Title", ConceptDifficulty.Beginner, 30);
        var learnerRoles = new[] { "User" };

        // Act
        var result = await _sut.UpdateLearningPathAsync(pathId, req, learnerRoles);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("FORBIDDEN", result.ErrorCode);
    }

    [Fact]
    public async Task Enroll_ValidLearnerAndPublishedPath_EnrollsSuccessfully()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var pathId = Guid.NewGuid();

        var user = User.Create("learner1", "learner1@example.com", "hash");
        var path = LearningPath.Create("CS Foundations", "cs-foundations", ConceptDifficulty.Beginner, 40);
        path.Publish();

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        _pathRepoMock.Setup(r => r.FindByIdAsync(pathId, false, It.IsAny<CancellationToken>()))
            .ReturnsAsync(path);
        _pathRepoMock.Setup(r => r.GetEnrollmentAsync(userId, pathId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((PathEnrollment?)null);

        // Act
        var result = await _sut.EnrollAsync(userId, pathId);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal("CS Foundations", result.Value.LearningPathTitle);
        Assert.Equal("Active", result.Value.Status);
        _pathRepoMock.Verify(r => r.AddEnrollment(It.IsAny<PathEnrollment>()), Times.Once);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Enroll_UnpublishedPath_ReturnsPathNotEligibleFailure()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var pathId = Guid.NewGuid();

        var user = User.Create("learner1", "learner1@example.com", "hash");
        var draftPath = LearningPath.Create("Draft Path", "draft-path", ConceptDifficulty.Beginner, 10);

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        _pathRepoMock.Setup(r => r.FindByIdAsync(pathId, false, It.IsAny<CancellationToken>()))
            .ReturnsAsync(draftPath);

        // Act
        var result = await _sut.EnrollAsync(userId, pathId);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("PATH_NOT_ELIGIBLE", result.ErrorCode);
    }

    [Fact]
    public async Task Enroll_AlreadyActivelyEnrolled_ReturnsAlreadyEnrolledFailure()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var pathId = Guid.NewGuid();

        var user = User.Create("learner1", "learner1@example.com", "hash");
        var path = LearningPath.Create("CS Foundations", "cs-foundations", ConceptDifficulty.Beginner, 40);
        path.Publish();

        var existingEnrollment = PathEnrollment.Create(userId, pathId);

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        _pathRepoMock.Setup(r => r.FindByIdAsync(pathId, false, It.IsAny<CancellationToken>()))
            .ReturnsAsync(path);
        _pathRepoMock.Setup(r => r.GetEnrollmentAsync(userId, pathId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(existingEnrollment);

        // Act
        var result = await _sut.EnrollAsync(userId, pathId);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("ALREADY_ENROLLED", result.ErrorCode);
    }

    [Fact]
    public async Task Enroll_PausedEnrollment_ResumesEnrollmentSuccessfully()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var pathId = Guid.NewGuid();

        var user = User.Create("learner1", "learner1@example.com", "hash");
        var path = LearningPath.Create("CS Foundations", "cs-foundations", ConceptDifficulty.Beginner, 40);
        path.Publish();

        var pausedEnrollment = PathEnrollment.Create(userId, pathId);
        pausedEnrollment.Pause();

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        _pathRepoMock.Setup(r => r.FindByIdAsync(pathId, false, It.IsAny<CancellationToken>()))
            .ReturnsAsync(path);
        _pathRepoMock.Setup(r => r.GetEnrollmentAsync(userId, pathId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(pausedEnrollment);

        // Act
        var result = await _sut.EnrollAsync(userId, pathId);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.Equal("Active", result.Value!.Status);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task GetMyEnrollments_ValidUser_ReturnsActiveEnrollments()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var pathId = Guid.NewGuid();

        var user = User.Create("learner1", "learner1@example.com", "hash");
        var path = LearningPath.Create("CS Foundations", "cs-foundations", ConceptDifficulty.Beginner, 40);
        path.Publish();

        var enrollment = PathEnrollment.Create(userId, pathId);

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        _pathRepoMock.Setup(r => r.GetEnrollmentsForUserAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<PathEnrollment> { enrollment });

        // Act
        var result = await _sut.GetMyEnrollmentsAsync(userId);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.Single(result.Value!);
    }
}
