using System.Security.Claims;
using LearnCS.API.Controllers;
using LearnCS.Application.Common;
using LearnCS.Application.Features.LearningPaths.DTOs;
using LearnCS.Application.Features.LearningPaths.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Controllers;

public class LearningPathsControllerTests
{
    private readonly Mock<ILearningPathService> _learningPathServiceMock = new();
    private readonly LearningPathsController _sut;

    public LearningPathsControllerTests()
    {
        _sut = new LearningPathsController(_learningPathServiceMock.Object);
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
    public async Task GetPublishedLearningPaths_Success_ReturnsOkResultWithPathList()
    {
        // Arrange
        var paths = new List<LearningPathSummaryDto>
        {
            new(Guid.NewGuid(), "C# Foundations", "csharp-foundations", "Learn C# basics", null, "Beginner", 10, "Published", true, 2, 8)
        };

        _learningPathServiceMock.Setup(s => s.GetPublishedLearningPathsAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<IReadOnlyList<LearningPathSummaryDto>>.Success(paths));

        // Act
        var actionResult = await _sut.GetPublishedLearningPaths(CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<List<LearningPathSummaryDto>>(okResult.Value);
        Assert.Single(responseValue);
        Assert.Equal("csharp-foundations", responseValue[0].Slug);
    }

    [Fact]
    public async Task GetLearningPathBySlug_Success_ReturnsOkResultWithDetails()
    {
        // Arrange
        var slug = "csharp-foundations";
        var details = new LearningPathDetailsDto(
            Guid.NewGuid(), "C# Foundations", slug, "Description", null, "Beginner", 10, "Published", true, new List<TrackDetailsDto>()
        );

        _learningPathServiceMock.Setup(s => s.GetLearningPathBySlugAsync(slug, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<LearningPathDetailsDto>.Success(details));

        // Act
        var actionResult = await _sut.GetLearningPathBySlug(slug, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<LearningPathDetailsDto>(okResult.Value);
        Assert.Equal(slug, responseValue.Slug);
    }

    [Fact]
    public async Task GetLearningPathBySlug_NotFound_ReturnsNotFoundWithProblemDetails()
    {
        // Arrange
        var slug = "non-existent-path";

        _learningPathServiceMock.Setup(s => s.GetLearningPathBySlugAsync(slug, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<LearningPathDetailsDto>.Failure("Learning path not found.", "NOT_FOUND"));

        // Act
        var actionResult = await _sut.GetLearningPathBySlug(slug, CancellationToken.None);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(notFoundResult.Value);
        Assert.Equal(404, problem.Status);
        Assert.Equal("NOT_FOUND", problem.Extensions["code"]);
    }

    [Fact]
    public async Task GetLearningPathDetailsById_Success_ReturnsOkResult()
    {
        // Arrange
        var pathId = Guid.NewGuid();
        var details = new LearningPathDetailsDto(
            pathId, "C# Foundations", "csharp-foundations", "Description", null, "Beginner", 10, "Published", true, new List<TrackDetailsDto>()
        );

        _learningPathServiceMock.Setup(s => s.GetLearningPathByIdAsync(pathId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<LearningPathDetailsDto>.Success(details));

        // Act
        var actionResult = await _sut.GetLearningPathDetailsById(pathId, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<LearningPathDetailsDto>(okResult.Value);
        Assert.Equal(pathId, responseValue.Id);
    }

    [Fact]
    public async Task EnrollInLearningPath_Authenticated_Success_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var pathId = Guid.NewGuid();
        SetUserContext(userId);

        var enrollment = new EnrollmentDto(
            Guid.NewGuid(), userId, pathId, "C# Foundations", "csharp-foundations", DateTime.UtcNow, "Active", 0, null
        );

        _learningPathServiceMock.Setup(s => s.EnrollAsync(userId, pathId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<EnrollmentDto>.Success(enrollment));

        // Act
        var actionResult = await _sut.EnrollInLearningPath(pathId, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<EnrollmentDto>(okResult.Value);
        Assert.Equal(userId, responseValue.UserId);
        Assert.Equal(pathId, responseValue.LearningPathId);
    }

    [Fact]
    public async Task EnrollInLearningPath_Duplicate_ReturnsBadRequest()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var pathId = Guid.NewGuid();
        SetUserContext(userId);

        _learningPathServiceMock.Setup(s => s.EnrollAsync(userId, pathId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<EnrollmentDto>.Failure("User is already actively enrolled in this learning path.", "ALREADY_ENROLLED"));

        // Act
        var actionResult = await _sut.EnrollInLearningPath(pathId, CancellationToken.None);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(badRequestResult.Value);
        Assert.Equal(400, problem.Status);
        Assert.Equal("ALREADY_ENROLLED", problem.Extensions["code"]);
    }

    [Fact]
    public async Task EnrollInLearningPath_Unauthenticated_ReturnsUnauthorized()
    {
        // Arrange
        _sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = new ClaimsPrincipal() }
        };

        _learningPathServiceMock.Setup(s => s.EnrollAsync(Guid.Empty, It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<EnrollmentDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED"));

        // Act
        var actionResult = await _sut.EnrollInLearningPath(Guid.NewGuid(), CancellationToken.None);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(unauthorizedResult.Value);
        Assert.Equal(401, problem.Status);
        Assert.Equal("UNAUTHORIZED", problem.Extensions["code"]);
    }

    [Fact]
    public async Task GetMyEnrollments_Authenticated_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        SetUserContext(userId);

        var enrollments = new List<EnrollmentDto>
        {
            new(Guid.NewGuid(), userId, Guid.NewGuid(), "C# Foundations", "csharp-foundations", DateTime.UtcNow, "Active", 25.0m, null)
        };

        _learningPathServiceMock.Setup(s => s.GetMyEnrollmentsAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<IReadOnlyList<EnrollmentDto>>.Success(enrollments));

        // Act
        var actionResult = await _sut.GetMyEnrollments(CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<List<EnrollmentDto>>(okResult.Value);
        Assert.Single(responseValue);
        Assert.Equal(userId, responseValue[0].UserId);
    }

    [Fact]
    public async Task GetMyEnrollments_Unauthenticated_ReturnsUnauthorized()
    {
        // Arrange
        _sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = new ClaimsPrincipal() }
        };

        _learningPathServiceMock.Setup(s => s.GetMyEnrollmentsAsync(Guid.Empty, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<IReadOnlyList<EnrollmentDto>>.Failure("Invalid user identifier context.", "UNAUTHORIZED"));

        // Act
        var actionResult = await _sut.GetMyEnrollments(CancellationToken.None);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(unauthorizedResult.Value);
        Assert.Equal(401, problem.Status);
        Assert.Equal("UNAUTHORIZED", problem.Extensions["code"]);
    }
}
