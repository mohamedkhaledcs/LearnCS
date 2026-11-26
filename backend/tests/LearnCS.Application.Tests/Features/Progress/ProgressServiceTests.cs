using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.Progress.DTOs;
using LearnCS.Application.Features.Progress.Services;
using LearnCS.Domain.Gamification;
using LearnCS.Domain.Identity;
using LearnCS.Domain.Intelligence;
using LearnCS.Domain.Knowledge;
using LearnCS.Domain.Learning;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Features.Progress;

public class ProgressServiceTests
{
    private readonly Mock<ILearningPathRepository> _pathRepoMock = new();
    private readonly Mock<IIntelligenceRepository> _intelRepoMock = new();
    private readonly Mock<IGamificationRepository> _gamiRepoMock = new();
    private readonly Mock<IConceptRepository> _conceptRepoMock = new();
    private readonly Mock<IUserRepository> _userRepoMock = new();
    private readonly Mock<IUnitOfWork> _unitOfWorkMock = new();
    private readonly ProgressService _sut;

    public ProgressServiceTests()
    {
        _sut = new ProgressService(
            _pathRepoMock.Object,
            _intelRepoMock.Object,
            _gamiRepoMock.Object,
            _conceptRepoMock.Object,
            _userRepoMock.Object,
            _unitOfWorkMock.Object
        );
    }

    [Fact]
    public async Task GetMyProgressSummary_ValidUser_ReturnsOverallSummary()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var user = User.Create("learner1", "learner1@example.com", "hash");

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);
        _intelRepoMock.Setup(r => r.GetLearnerLevelAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((LearnerLevelRecord?)null);
        _gamiRepoMock.Setup(r => r.GetTotalXpAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(150L);
        _gamiRepoMock.Setup(r => r.GetStreakAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((StudyStreak?)null);
        _pathRepoMock.Setup(r => r.GetCompletedLessonsCountForUserAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(3);
        _intelRepoMock.Setup(r => r.GetAllMasteryForUserAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<ConceptMastery>());
        _conceptRepoMock.Setup(r => r.GetAllPublishedAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<Concept>());

        // Act
        var result = await _sut.GetMyProgressSummaryAsync(userId);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal(150L, result.Value.TotalXp);
        Assert.Equal(3, result.Value.CompletedLessonsCount);
        Assert.Equal("Beginner", result.Value.Level);
    }

    [Fact]
    public async Task RecordLessonProgress_NewCompletion_AwardsXpUpdatesConceptMasteryAndEnrollmentProgress()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var lessonId = Guid.NewGuid();
        var moduleId = Guid.NewGuid();
        var conceptId = Guid.NewGuid();

        var lesson = Lesson.Create(moduleId, "Variables & Types", "variables-types", LessonType.Text, displayOrder: 1, conceptId: conceptId);
        typeof(Lesson).GetProperty("Id")!.SetValue(lesson, lessonId);

        _pathRepoMock.Setup(r => r.FindLessonByIdAsync(lessonId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(lesson);
        _pathRepoMock.Setup(r => r.GetLessonProgressAsync(userId, lessonId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((LessonProgress?)null);
        _gamiRepoMock.Setup(r => r.GetStreakAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((StudyStreak?)null);
        _intelRepoMock.Setup(r => r.GetConceptMasteryAsync(userId, conceptId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((ConceptMastery?)null);

        var request = new RecordLessonProgressRequest(lessonId, TimeSpentSeconds: 120);

        // Act
        var result = await _sut.RecordLessonProgressAsync(userId, request);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal("Completed", result.Value.Status);
        Assert.Equal(50, result.Value.XpEarned); // 50 XP for new completion
        _gamiRepoMock.Verify(g => g.AddXpEvent(It.IsAny<UserXpEvent>()), Times.Once);
        _intelRepoMock.Verify(i => i.AddConceptMastery(It.IsAny<ConceptMastery>()), Times.Once);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task RecordLessonProgress_DuplicateCompletion_IsIdempotentWithoutDuplicateXp()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var lessonId = Guid.NewGuid();
        var moduleId = Guid.NewGuid();

        var lesson = Lesson.Create(moduleId, "Variables & Types", "variables-types", LessonType.Text, displayOrder: 1);
        typeof(Lesson).GetProperty("Id")!.SetValue(lesson, lessonId);

        var existingProgress = LessonProgress.Create(userId, lessonId);
        existingProgress.Start();
        existingProgress.Complete(100); // Already completed!

        _pathRepoMock.Setup(r => r.FindLessonByIdAsync(lessonId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(lesson);
        _pathRepoMock.Setup(r => r.GetLessonProgressAsync(userId, lessonId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(existingProgress);

        var request = new RecordLessonProgressRequest(lessonId, TimeSpentSeconds: 120);

        // Act
        var result = await _sut.RecordLessonProgressAsync(userId, request);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal("Completed", result.Value.Status);
        Assert.Equal(0, result.Value.XpEarned); // 0 duplicate XP!
        _gamiRepoMock.Verify(g => g.AddXpEvent(It.IsAny<UserXpEvent>()), Times.Never);
    }

    [Fact]
    public async Task RecordLessonProgress_NonExistentLesson_ReturnsNotFoundFailure()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var lessonId = Guid.NewGuid();

        _pathRepoMock.Setup(r => r.FindLessonByIdAsync(lessonId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((Lesson?)null);

        var request = new RecordLessonProgressRequest(lessonId);

        // Act
        var result = await _sut.RecordLessonProgressAsync(userId, request);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("NOT_FOUND", result.ErrorCode);
    }

    [Fact]
    public async Task GetMyProgressSummary_UnauthenticatedGuidEmpty_ReturnsUnauthorizedFailure()
    {
        // Act
        var result = await _sut.GetMyProgressSummaryAsync(Guid.Empty);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("UNAUTHORIZED", result.ErrorCode);
    }
}
