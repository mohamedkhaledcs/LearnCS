using System.Security.Claims;
using LearnCS.API.Controllers;
using LearnCS.Application.Common;
using LearnCS.Application.Features.Projects.DTOs;
using LearnCS.Application.Features.Projects.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Controllers;

public class ProjectsControllerTests
{
    private readonly Mock<IProjectService> _projectServiceMock = new();
    private readonly ProjectsController _sut;

    public ProjectsControllerTests()
    {
        _sut = new ProjectsController(_projectServiceMock.Object);
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
    public async Task GetPublishedProjects_Success_ReturnsOkResult()
    {
        // Arrange
        var projects = new List<ProjectSummaryDto>
        {
            new(Guid.NewGuid(), "CLI Calculator", "cli-calculator", "Build a calculator", "Beginner", 4, "Published")
        };

        _projectServiceMock.Setup(s => s.GetPublishedProjectsAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<IReadOnlyList<ProjectSummaryDto>>.Success(projects));

        // Act
        var actionResult = await _sut.GetPublishedProjects(CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<List<ProjectSummaryDto>>(okResult.Value);
        Assert.Single(responseValue);
        Assert.Equal("cli-calculator", responseValue[0].Slug);
    }

    [Fact]
    public async Task GetProjectBySlug_Success_ReturnsOkResult()
    {
        // Arrange
        var slug = "cli-calculator";
        var details = new ProjectDetailsDto(
            Guid.NewGuid(), "CLI Calculator", slug, "Description", "Beginner", "Build a C# CLI Calculator", 4, "Published", new List<Guid>()
        );

        _projectServiceMock.Setup(s => s.GetProjectBySlugAsync(slug, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<ProjectDetailsDto>.Success(details));

        // Act
        var actionResult = await _sut.GetProjectBySlug(slug, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<ProjectDetailsDto>(okResult.Value);
        Assert.Equal(slug, responseValue.Slug);
    }

    [Fact]
    public async Task GetProjectBySlug_NotFound_ReturnsNotFoundWithProblemDetails()
    {
        // Arrange
        var slug = "non-existent-project";

        _projectServiceMock.Setup(s => s.GetProjectBySlugAsync(slug, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<ProjectDetailsDto>.Failure($"Project '{slug}' not found.", "NOT_FOUND"));

        // Act
        var actionResult = await _sut.GetProjectBySlug(slug, CancellationToken.None);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(notFoundResult.Value);
        Assert.Equal(404, problem.Status);
        Assert.Equal("NOT_FOUND", problem.Extensions["code"]);
    }

    [Fact]
    public async Task GetMySubmissions_Authenticated_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        SetUserContext(userId);

        var submissions = new List<ProjectSubmissionDto>
        {
            new(Guid.NewGuid(), userId, Guid.NewGuid(), "CLI Calculator", "Submitted", "https://github.com/test/repo", null, "My submission notes", null, DateTime.UtcNow, null)
        };

        _projectServiceMock.Setup(s => s.GetMySubmissionsAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<IReadOnlyList<ProjectSubmissionDto>>.Success(submissions));

        // Act
        var actionResult = await _sut.GetMySubmissions(CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<List<ProjectSubmissionDto>>(okResult.Value);
        Assert.Single(responseValue);
        Assert.Equal(userId, responseValue[0].UserId);
    }

    [Fact]
    public async Task GetMySubmissions_Unauthenticated_ReturnsUnauthorized()
    {
        // Arrange
        _sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = new ClaimsPrincipal() }
        };

        _projectServiceMock.Setup(s => s.GetMySubmissionsAsync(Guid.Empty, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<IReadOnlyList<ProjectSubmissionDto>>.Failure("Invalid user identifier context.", "UNAUTHORIZED"));

        // Act
        var actionResult = await _sut.GetMySubmissions(CancellationToken.None);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(unauthorizedResult.Value);
        Assert.Equal(401, problem.Status);
        Assert.Equal("UNAUTHORIZED", problem.Extensions["code"]);
    }

    [Fact]
    public async Task GetMySubmissionForProject_Success_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var projectId = Guid.NewGuid();
        SetUserContext(userId);

        var submission = new ProjectSubmissionDto(
            Guid.NewGuid(), userId, projectId, "CLI Calculator", "Submitted", "https://github.com/test/repo", null, "Notes", null, DateTime.UtcNow, null
        );

        _projectServiceMock.Setup(s => s.GetMySubmissionForProjectAsync(userId, projectId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<ProjectSubmissionDto>.Success(submission));

        // Act
        var actionResult = await _sut.GetMySubmissionForProject(projectId, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<ProjectSubmissionDto>(okResult.Value);
        Assert.Equal(projectId, responseValue.ProjectId);
    }

    [Fact]
    public async Task GetMySubmissionForProject_NotFound_ReturnsNotFound()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var projectId = Guid.NewGuid();
        SetUserContext(userId);

        _projectServiceMock.Setup(s => s.GetMySubmissionForProjectAsync(userId, projectId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<ProjectSubmissionDto>.Failure("No submission found for this project.", "NOT_FOUND"));

        // Act
        var actionResult = await _sut.GetMySubmissionForProject(projectId, CancellationToken.None);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(notFoundResult.Value);
        Assert.Equal(404, problem.Status);
        Assert.Equal("NOT_FOUND", problem.Extensions["code"]);
    }

    [Fact]
    public async Task SubmitProject_Authenticated_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var projectId = Guid.NewGuid();
        SetUserContext(userId);

        var request = new SubmitProjectRequest("https://github.com/user/cli-calc", "https://demo.app", "Built using C# 12");
        var submission = new ProjectSubmissionDto(
            Guid.NewGuid(), userId, projectId, "CLI Calculator", "Submitted", request.RepositoryUrl, request.LiveUrl, request.Notes, null, DateTime.UtcNow, null
        );

        _projectServiceMock.Setup(s => s.SubmitProjectAsync(userId, projectId, request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<ProjectSubmissionDto>.Success(submission));

        // Act
        var actionResult = await _sut.SubmitProject(projectId, request, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<ProjectSubmissionDto>(okResult.Value);
        Assert.Equal(request.RepositoryUrl, responseValue.RepositoryUrl);
    }

    [Fact]
    public async Task SubmitProject_Unauthenticated_ReturnsUnauthorized()
    {
        // Arrange
        _sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = new ClaimsPrincipal() }
        };

        _projectServiceMock.Setup(s => s.SubmitProjectAsync(Guid.Empty, It.IsAny<Guid>(), It.IsAny<SubmitProjectRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<ProjectSubmissionDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED"));

        // Act
        var actionResult = await _sut.SubmitProject(Guid.NewGuid(), new SubmitProjectRequest(), CancellationToken.None);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(unauthorizedResult.Value);
        Assert.Equal(401, problem.Status);
        Assert.Equal("UNAUTHORIZED", problem.Extensions["code"]);
    }
}
