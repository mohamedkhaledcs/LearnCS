using System.Security.Claims;
using LearnCS.API.Controllers;
using LearnCS.Application.Common;
using LearnCS.Application.Features.Assessments.DTOs;
using LearnCS.Application.Features.Assessments.Services;
using LearnCS.Domain.Assessment;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Controllers;

public class AssessmentsControllerTests
{
    private readonly Mock<IAssessmentService> _assessmentServiceMock = new();
    private readonly AssessmentsController _sut;

    public AssessmentsControllerTests()
    {
        _sut = new AssessmentsController(_assessmentServiceMock.Object);
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
    public async Task GetAvailableAssessments_Success_ReturnsOkResult()
    {
        // Arrange
        var assessments = new List<AssessmentSummaryDto>
        {
            new(Guid.NewGuid(), "C# Basics Quiz", "Test your C# knowledge", "Quiz", 15, 70, 5)
        };

        _assessmentServiceMock.Setup(s => s.GetAvailableAssessmentsAsync(null, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<IReadOnlyList<AssessmentSummaryDto>>.Success(assessments));

        // Act
        var actionResult = await _sut.GetAvailableAssessments(null, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<List<AssessmentSummaryDto>>(okResult.Value);
        Assert.Single(responseValue);
        Assert.Equal("C# Basics Quiz", responseValue[0].Title);
    }

    [Fact]
    public async Task GetAssessmentById_Success_ReturnsOkResult()
    {
        // Arrange
        var assessmentId = Guid.NewGuid();
        var summary = new AssessmentSummaryDto(assessmentId, "C# Basics Quiz", "Description", "Quiz", 15, 70, 5);

        _assessmentServiceMock.Setup(s => s.GetAssessmentByIdAsync(assessmentId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AssessmentSummaryDto>.Success(summary));

        // Act
        var actionResult = await _sut.GetAssessmentById(assessmentId, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<AssessmentSummaryDto>(okResult.Value);
        Assert.Equal(assessmentId, responseValue.Id);
    }

    [Fact]
    public async Task GetAssessmentById_NotFound_ReturnsNotFoundWithProblemDetails()
    {
        // Arrange
        var assessmentId = Guid.NewGuid();

        _assessmentServiceMock.Setup(s => s.GetAssessmentByIdAsync(assessmentId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AssessmentSummaryDto>.Failure("Assessment not found.", "NOT_FOUND"));

        // Act
        var actionResult = await _sut.GetAssessmentById(assessmentId, CancellationToken.None);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(notFoundResult.Value);
        Assert.Equal(404, problem.Status);
        Assert.Equal("NOT_FOUND", problem.Extensions["code"]);
    }

    [Fact]
    public async Task StartAttempt_Authenticated_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var assessmentId = Guid.NewGuid();
        SetUserContext(userId);

        var attempt = new AssessmentAttemptDto(
            Guid.NewGuid(), assessmentId, "C# Basics Quiz", DateTime.UtcNow, "InProgress", 15, new List<QuestionForTakingDto>()
        );

        _assessmentServiceMock.Setup(s => s.StartAttemptAsync(userId, assessmentId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AssessmentAttemptDto>.Success(attempt));

        // Act
        var actionResult = await _sut.StartAttempt(assessmentId, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<AssessmentAttemptDto>(okResult.Value);
        Assert.Equal(assessmentId, responseValue.AssessmentId);
    }

    [Fact]
    public async Task StartAttempt_Unauthenticated_ReturnsUnauthorized()
    {
        // Arrange
        _sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = new ClaimsPrincipal() }
        };

        _assessmentServiceMock.Setup(s => s.StartAttemptAsync(Guid.Empty, It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AssessmentAttemptDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED"));

        // Act
        var actionResult = await _sut.StartAttempt(Guid.NewGuid(), CancellationToken.None);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(unauthorizedResult.Value);
        Assert.Equal(401, problem.Status);
        Assert.Equal("UNAUTHORIZED", problem.Extensions["code"]);
    }

    [Fact]
    public async Task GetActiveAttempt_Forbidden_IDOR_ReturnsForbidden()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var attemptId = Guid.NewGuid();
        SetUserContext(userId);

        _assessmentServiceMock.Setup(s => s.GetActiveAttemptAsync(userId, attemptId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AssessmentAttemptDto>.Failure("Access denied to this assessment attempt.", "FORBIDDEN"));

        // Act
        var actionResult = await _sut.GetActiveAttempt(attemptId, CancellationToken.None);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(actionResult);
        Assert.Equal(403, objectResult.StatusCode);
        var problem = Assert.IsType<ProblemDetails>(objectResult.Value);
        Assert.Equal(403, problem.Status);
        Assert.Equal("FORBIDDEN", problem.Extensions["code"]);
    }

    [Fact]
    public async Task SubmitAttempt_Success_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var attemptId = Guid.NewGuid();
        SetUserContext(userId);

        var request = new SubmitAssessmentRequest(new List<SubmitAnswerItem>());
        var resultDto = new AssessmentResultDto(
            attemptId, Guid.NewGuid(), "C# Basics Quiz", "Completed", 100, 100, 100.0m, 70, true, DateTime.UtcNow.AddMinutes(-10), DateTime.UtcNow, new List<QuestionResultDto>()
        );

        _assessmentServiceMock.Setup(s => s.SubmitAttemptAsync(userId, attemptId, request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AssessmentResultDto>.Success(resultDto));

        // Act
        var actionResult = await _sut.SubmitAttempt(attemptId, request, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<AssessmentResultDto>(okResult.Value);
        Assert.True(responseValue.Passed);
        Assert.Equal(100.0m, responseValue.ScorePercent);
    }

    [Fact]
    public async Task GetMyAttemptHistory_Authenticated_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        SetUserContext(userId);

        var history = new List<AssessmentResultDto>
        {
            new(Guid.NewGuid(), Guid.NewGuid(), "C# Basics Quiz", "Completed", 90, 100, 90.0m, 70, true, DateTime.UtcNow.AddHours(-1), DateTime.UtcNow, new List<QuestionResultDto>())
        };

        _assessmentServiceMock.Setup(s => s.GetMyAttemptHistoryAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<IReadOnlyList<AssessmentResultDto>>.Success(history));

        // Act
        var actionResult = await _sut.GetMyAttemptHistory(CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<List<AssessmentResultDto>>(okResult.Value);
        Assert.Single(responseValue);
        Assert.Equal(90.0m, responseValue[0].ScorePercent);
    }
}
