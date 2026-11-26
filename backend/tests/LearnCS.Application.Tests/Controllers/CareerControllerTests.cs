using System.Security.Claims;
using LearnCS.API.Controllers;
using LearnCS.Application.Common;
using LearnCS.Application.Features.Career.DTOs;
using LearnCS.Application.Features.Career.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Controllers;

public class CareerControllerTests
{
    private readonly Mock<ICareerService> _careerServiceMock = new();
    private readonly CareerController _sut;

    public CareerControllerTests()
    {
        _sut = new CareerController(_careerServiceMock.Object);
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
    public async Task GetCareerProfiles_Success_ReturnsOkResult()
    {
        // Arrange
        var profiles = new List<CareerProfileDto>
        {
            new(Guid.NewGuid(), "Backend Engineer", "backend-engineer", "Build scalable APIs", "icon_url")
        };

        _careerServiceMock.Setup(s => s.GetCareerProfilesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<IReadOnlyList<CareerProfileDto>>.Success(profiles));

        // Act
        var actionResult = await _sut.GetCareerProfiles(CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<List<CareerProfileDto>>(okResult.Value);
        Assert.Single(responseValue);
        Assert.Equal("backend-engineer", responseValue[0].Slug);
    }

    [Fact]
    public async Task GetCareerProfileBySlug_Success_ReturnsOkResult()
    {
        // Arrange
        var slug = "backend-engineer";
        var profile = new CareerProfileDto(Guid.NewGuid(), "Backend Engineer", slug, "Description", "icon_url");

        _careerServiceMock.Setup(s => s.GetCareerProfileBySlugAsync(slug, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<CareerProfileDto>.Success(profile));

        // Act
        var actionResult = await _sut.GetCareerProfileBySlug(slug, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<CareerProfileDto>(okResult.Value);
        Assert.Equal(slug, responseValue.Slug);
    }

    [Fact]
    public async Task GetCareerProfileBySlug_NotFound_ReturnsNotFoundWithProblemDetails()
    {
        // Arrange
        var slug = "non-existent-profile";

        _careerServiceMock.Setup(s => s.GetCareerProfileBySlugAsync(slug, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<CareerProfileDto>.Failure("Career profile not found.", "NOT_FOUND"));

        // Act
        var actionResult = await _sut.GetCareerProfileBySlug(slug, CancellationToken.None);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(notFoundResult.Value);
        Assert.Equal(404, problem.Status);
        Assert.Equal("NOT_FOUND", problem.Extensions["code"]);
    }

    [Fact]
    public async Task GetCareerQuestions_Success_ReturnsOkResult()
    {
        // Arrange
        var questions = new List<CareerQuestionDto>
        {
            new(Guid.NewGuid(), "What work environment do you prefer?", "Help text", "Preference", 1, new List<CareerQuestionOptionDto>())
        };

        _careerServiceMock.Setup(s => s.GetCareerQuestionsAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<IReadOnlyList<CareerQuestionDto>>.Success(questions));

        // Act
        var actionResult = await _sut.GetCareerQuestions(CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<List<CareerQuestionDto>>(okResult.Value);
        Assert.Single(responseValue);
    }

    [Fact]
    public async Task SubmitCareerAssessment_Authenticated_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        SetUserContext(userId);

        var request = new SubmitCareerAssessmentRequest(new List<SubmitCareerAnswerItem>());
        var resultDto = new CareerAssessmentResultDto(
            Guid.NewGuid(), userId, "Completed", DateTime.UtcNow, DateTime.UtcNow, new List<CareerRecommendationDto>()
        );

        _careerServiceMock.Setup(s => s.SubmitCareerAssessmentAsync(userId, request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<CareerAssessmentResultDto>.Success(resultDto));

        // Act
        var actionResult = await _sut.SubmitCareerAssessment(request, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<CareerAssessmentResultDto>(okResult.Value);
        Assert.Equal(userId, responseValue.UserId);
    }

    [Fact]
    public async Task SubmitCareerAssessment_Unauthenticated_ReturnsUnauthorized()
    {
        // Arrange
        _sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = new ClaimsPrincipal() }
        };

        _careerServiceMock.Setup(s => s.SubmitCareerAssessmentAsync(Guid.Empty, It.IsAny<SubmitCareerAssessmentRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<CareerAssessmentResultDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED"));

        // Act
        var actionResult = await _sut.SubmitCareerAssessment(new SubmitCareerAssessmentRequest(new List<SubmitCareerAnswerItem>()), CancellationToken.None);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(unauthorizedResult.Value);
        Assert.Equal(401, problem.Status);
        Assert.Equal("UNAUTHORIZED", problem.Extensions["code"]);
    }

    [Fact]
    public async Task GetMyLatestResult_Authenticated_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        SetUserContext(userId);

        var resultDto = new CareerAssessmentResultDto(
            Guid.NewGuid(), userId, "Completed", DateTime.UtcNow.AddHours(-1), DateTime.UtcNow, new List<CareerRecommendationDto>()
        );

        _careerServiceMock.Setup(s => s.GetMyLatestResultAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<CareerAssessmentResultDto>.Success(resultDto));

        // Act
        var actionResult = await _sut.GetMyLatestResult(CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<CareerAssessmentResultDto>(okResult.Value);
        Assert.Equal(userId, responseValue.UserId);
    }

    [Fact]
    public async Task GetMyLatestResult_Unauthenticated_ReturnsUnauthorized()
    {
        // Arrange
        _sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = new ClaimsPrincipal() }
        };

        _careerServiceMock.Setup(s => s.GetMyLatestResultAsync(Guid.Empty, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<CareerAssessmentResultDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED"));

        // Act
        var actionResult = await _sut.GetMyLatestResult(CancellationToken.None);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(unauthorizedResult.Value);
        Assert.Equal(401, problem.Status);
        Assert.Equal("UNAUTHORIZED", problem.Extensions["code"]);
    }
}
