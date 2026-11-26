using LearnCS.Application.Features.LearningPaths.DTOs;
using LearnCS.Application.Features.LearningPaths.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnCS.API.Controllers;

[ApiController]
[Route("api/learningpaths")]
public class LearningPathsController(ILearningPathService learningPathService) : ApiControllerBase
{
    /// <summary>
    /// Retrieves all published learning paths for catalog discovery.
    /// </summary>
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IReadOnlyList<LearningPathSummaryDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetPublishedLearningPaths(CancellationToken cancellationToken)
    {
        var result = await learningPathService.GetPublishedLearningPathsAsync(cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves active path enrollments for the current authenticated learner.
    /// </summary>
    [HttpGet("my-enrollments")]
    [Authorize]
    [ProducesResponseType(typeof(IReadOnlyList<EnrollmentDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetMyEnrollments(CancellationToken cancellationToken)
    {
        var result = await learningPathService.GetMyEnrollmentsAsync(GetUserId(), cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves full detailed track/module/lesson hierarchy for a learning path by ID.
    /// </summary>
    [HttpGet("{id:guid}/details")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(LearningPathDetailsDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetLearningPathDetailsById(
        [FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        var result = await learningPathService.GetLearningPathByIdAsync(id, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Enrolls the current authenticated learner in an eligible published learning path.
    /// </summary>
    [HttpPost("{id:guid}/enroll")]
    [Authorize]
    [ProducesResponseType(typeof(EnrollmentDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> EnrollInLearningPath(
        [FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        var result = await learningPathService.EnrollAsync(GetUserId(), id, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves full details for a learning path by its unique slug.
    /// </summary>
    [HttpGet("{slug}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(LearningPathDetailsDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetLearningPathBySlug(
        [FromRoute] string slug,
        CancellationToken cancellationToken)
    {
        var result = await learningPathService.GetLearningPathBySlugAsync(slug, cancellationToken);
        return HandleResult(result);
    }
}
