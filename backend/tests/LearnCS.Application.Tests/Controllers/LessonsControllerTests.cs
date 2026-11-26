using LearnCS.API.Controllers;
using LearnCS.Application.Common;
using LearnCS.Application.Features.LearningPaths.DTOs;
using LearnCS.Application.Features.LearningPaths.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Controllers;

public class LessonsControllerTests
{
    private readonly Mock<ILearningPathService> _learningPathServiceMock = new();
    private readonly LessonsController _sut;

    public LessonsControllerTests()
    {
        _sut = new LessonsController(_learningPathServiceMock.Object);
    }

    [Fact]
    public async Task GetLessonBySlug_Success_ReturnsOkResultWithLessonDetails()
    {
        // Arrange
        var slug = "variables-types";
        var details = new LessonDetailsDto(
            Guid.NewGuid(), Guid.NewGuid(), "Variables & Types", slug, "# Markdown Content", null, "Text", "Published", 1, 15, true, Guid.NewGuid()
        );

        _learningPathServiceMock.Setup(s => s.GetLessonBySlugAsync(slug, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<LessonDetailsDto>.Success(details));

        // Act
        var actionResult = await _sut.GetLessonBySlug(slug, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<LessonDetailsDto>(okResult.Value);
        Assert.Equal(slug, responseValue.Slug);
        Assert.Equal("Variables & Types", responseValue.Title);
    }

    [Fact]
    public async Task GetLessonBySlug_NotFound_ReturnsNotFoundWithProblemDetails()
    {
        // Arrange
        var slug = "non-existent-lesson";

        _learningPathServiceMock.Setup(s => s.GetLessonBySlugAsync(slug, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<LessonDetailsDto>.Failure("Lesson not found.", "NOT_FOUND"));

        // Act
        var actionResult = await _sut.GetLessonBySlug(slug, CancellationToken.None);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(notFoundResult.Value);
        Assert.Equal(404, problem.Status);
        Assert.Equal("NOT_FOUND", problem.Extensions["code"]);
    }

    [Fact]
    public async Task GetLessonById_Success_ReturnsOkResultWithLessonDetails()
    {
        // Arrange
        var lessonId = Guid.NewGuid();
        var details = new LessonDetailsDto(
            lessonId, Guid.NewGuid(), "Variables & Types", "variables-types", "# Markdown Content", null, "Text", "Published", 1, 15, true, Guid.NewGuid()
        );

        _learningPathServiceMock.Setup(s => s.GetLessonByIdAsync(lessonId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<LessonDetailsDto>.Success(details));

        // Act
        var actionResult = await _sut.GetLessonById(lessonId, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<LessonDetailsDto>(okResult.Value);
        Assert.Equal(lessonId, responseValue.Id);
    }

    [Fact]
    public async Task GetLessonById_NotFound_ReturnsNotFoundWithProblemDetails()
    {
        // Arrange
        var lessonId = Guid.NewGuid();

        _learningPathServiceMock.Setup(s => s.GetLessonByIdAsync(lessonId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<LessonDetailsDto>.Failure("Lesson not found.", "NOT_FOUND"));

        // Act
        var actionResult = await _sut.GetLessonById(lessonId, CancellationToken.None);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(notFoundResult.Value);
        Assert.Equal(404, problem.Status);
        Assert.Equal("NOT_FOUND", problem.Extensions["code"]);
    }
}
