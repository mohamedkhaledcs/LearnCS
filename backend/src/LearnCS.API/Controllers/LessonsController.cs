using LearnCS.Application.Features.LearningPaths.DTOs;
using LearnCS.Application.Features.LearningPaths.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnCS.API.Controllers;

[ApiController]
[Route("api/lessons")]
public class LessonsController(ILearningPathService learningPathService) : ApiControllerBase
{
    /// <summary>
    /// Retrieves full details for a published lesson by its unique GUID identifier.
    /// </summary>
    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(LessonDetailsDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetLessonById(
        [FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        var result = await learningPathService.GetLessonByIdAsync(id, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves full details for a published lesson by its unique URL slug.
    /// </summary>
    [HttpGet("{slug}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(LessonDetailsDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetLessonBySlug(
        [FromRoute] string slug,
        CancellationToken cancellationToken)
    {
        var result = await learningPathService.GetLessonBySlugAsync(slug, cancellationToken);
        return HandleResult(result);
    }
}
