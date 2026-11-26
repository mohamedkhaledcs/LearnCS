using LearnCS.Application.Features.Projects.DTOs;
using LearnCS.Application.Features.Projects.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnCS.API.Controllers;

[ApiController]
[Route("api/projects")]
public class ProjectsController(IProjectService projectService) : ApiControllerBase
{
    /// <summary>
    /// Retrieves all published practical projects for course catalogue discovery.
    /// </summary>
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IReadOnlyList<ProjectSummaryDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetPublishedProjects(CancellationToken cancellationToken)
    {
        var result = await projectService.GetPublishedProjectsAsync(cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves all project submissions for the current authenticated learner across all practical projects.
    /// </summary>
    [HttpGet("my-submissions")]
    [Authorize]
    [ProducesResponseType(typeof(IReadOnlyList<ProjectSubmissionDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetMySubmissions(CancellationToken cancellationToken)
    {
        var result = await projectService.GetMySubmissionsAsync(GetUserId(), cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves full details, instructions, and required concepts for a specific practical project by slug.
    /// </summary>
    [HttpGet("{slug}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ProjectDetailsDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetProjectBySlug(
        [FromRoute] string slug,
        CancellationToken cancellationToken)
    {
        var result = await projectService.GetProjectBySlugAsync(slug, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves the current authenticated learner's submission status for a specific project.
    /// </summary>
    [HttpGet("{id:guid}/my-submission")]
    [Authorize]
    [ProducesResponseType(typeof(ProjectSubmissionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetMySubmissionForProject(
        [FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        var result = await projectService.GetMySubmissionForProjectAsync(GetUserId(), id, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Submits or updates a practical project repository/demo submission for the current authenticated learner.
    /// </summary>
    [HttpPost("{id:guid}/submit")]
    [Authorize]
    [ProducesResponseType(typeof(ProjectSubmissionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> SubmitProject(
        [FromRoute] Guid id,
        [FromBody] SubmitProjectRequest request,
        CancellationToken cancellationToken)
    {
        var result = await projectService.SubmitProjectAsync(GetUserId(), id, request, cancellationToken);
        return HandleResult(result);
    }
}
