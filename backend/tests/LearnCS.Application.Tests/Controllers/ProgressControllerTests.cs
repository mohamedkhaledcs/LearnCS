using System.Security.Claims;
using LearnCS.API.Controllers;
using LearnCS.Application.Common;
using LearnCS.Application.Features.Progress.DTOs;
using LearnCS.Application.Features.Progress.Services;
using LearnCS.Infrastructure.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Controllers;

public class ProgressControllerTests : IDisposable
{
    private readonly Mock<IProgressService> _progressServiceMock = new();
    private readonly AppDbContext _dbContext;
    private readonly ProgressController _sut;

    public ProgressControllerTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDb_{Guid.NewGuid()}")
            .Options;
        _dbContext = new AppDbContext(options);
        _sut = new ProgressController(_progressServiceMock.Object, _dbContext);
    }

    public void Dispose() => _dbContext.Dispose();

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
    public async Task GetMyProgressSummary_Authenticated_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        SetUserContext(userId);

        var summary = new LearnerProgressSummaryDto(
            userId, "Beginner", 150, 3, 5, 5, 2, 85.0m, new List<ConceptMasteryItemDto>()
        );

        _progressServiceMock.Setup(s => s.GetMyProgressSummaryAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<LearnerProgressSummaryDto>.Success(summary));

        // Act
        var actionResult = await _sut.GetMyProgressSummary(CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<LearnerProgressSummaryDto>(okResult.Value);
        Assert.Equal(userId, responseValue.UserId);
        Assert.Equal(150, responseValue.TotalXp);
    }

    [Fact]
    public async Task GetMyProgressSummary_Unauthenticated_ReturnsUnauthorized()
    {
        // Arrange
        _sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = new ClaimsPrincipal() }
        };

        _progressServiceMock.Setup(s => s.GetMyProgressSummaryAsync(Guid.Empty, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<LearnerProgressSummaryDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED"));

        // Act
        var actionResult = await _sut.GetMyProgressSummary(CancellationToken.None);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(unauthorizedResult.Value);
        Assert.Equal(401, problem.Status);
        Assert.Equal("UNAUTHORIZED", problem.Extensions["code"]);
    }

    [Fact]
    public async Task CompleteLesson_Success_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var lessonId = Guid.NewGuid();
        SetUserContext(userId);

        var request = new RecordLessonProgressRequest(lessonId, 300);
        var responseDto = new RecordLessonProgressResponseDto(lessonId, "Completed", 50, 25.0m, DateTime.UtcNow);

        _progressServiceMock.Setup(s => s.RecordLessonProgressAsync(userId, request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<RecordLessonProgressResponseDto>.Success(responseDto));

        // Act
        var actionResult = await _sut.CompleteLesson(request, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<RecordLessonProgressResponseDto>(okResult.Value);
        Assert.Equal(lessonId, responseValue.LessonId);
        Assert.Equal(50, responseValue.XpEarned);
    }

    [Fact]
    public async Task CompleteLesson_NotFound_ReturnsNotFoundWithProblemDetails()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var lessonId = Guid.NewGuid();
        SetUserContext(userId);

        var request = new RecordLessonProgressRequest(lessonId, 300);

        _progressServiceMock.Setup(s => s.RecordLessonProgressAsync(userId, request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<RecordLessonProgressResponseDto>.Failure("Lesson not found.", "NOT_FOUND"));

        // Act
        var actionResult = await _sut.CompleteLesson(request, CancellationToken.None);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(notFoundResult.Value);
        Assert.Equal(404, problem.Status);
        Assert.Equal("NOT_FOUND", problem.Extensions["code"]);
    }

    [Fact]
    public async Task GetMyConceptMastery_Authenticated_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        SetUserContext(userId);

        var masteryList = new List<ConceptMasteryItemDto>
        {
            new(Guid.NewGuid(), "Variables & Data Types", 90.0m, 0.85m, true, false, 3, DateTime.UtcNow)
        };

        _progressServiceMock.Setup(s => s.GetMyConceptMasteryAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<IReadOnlyList<ConceptMasteryItemDto>>.Success(masteryList));

        // Act
        var actionResult = await _sut.GetMyConceptMastery(CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<List<ConceptMasteryItemDto>>(okResult.Value);
        Assert.Single(responseValue);
        Assert.True(responseValue[0].IsMastered);
    }

    [Fact]
    public async Task GetPathProgress_Success_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var pathId = Guid.NewGuid();
        SetUserContext(userId);

        var details = new PathProgressDetailsDto(
            pathId, "C# Foundations", "Active", 25.0m, 2, 8, DateTime.UtcNow, null, new List<LessonProgressItemDto>()
        );

        _progressServiceMock.Setup(s => s.GetPathProgressAsync(userId, pathId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<PathProgressDetailsDto>.Success(details));

        // Act
        var actionResult = await _sut.GetPathProgress(pathId, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<PathProgressDetailsDto>(okResult.Value);
        Assert.Equal(pathId, responseValue.LearningPathId);
        Assert.Equal(25.0m, responseValue.ProgressPercent);
    }

    [Fact]
    public async Task GetPathProgress_NotFound_ReturnsNotFoundWithProblemDetails()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var pathId = Guid.NewGuid();
        SetUserContext(userId);

        _progressServiceMock.Setup(s => s.GetPathProgressAsync(userId, pathId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<PathProgressDetailsDto>.Failure("Learning path not found.", "NOT_FOUND"));

        // Act
        var actionResult = await _sut.GetPathProgress(pathId, CancellationToken.None);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(notFoundResult.Value);
        Assert.Equal(404, problem.Status);
        Assert.Equal("NOT_FOUND", problem.Extensions["code"]);
    }
}
