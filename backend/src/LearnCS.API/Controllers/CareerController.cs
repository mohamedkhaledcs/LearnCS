using LearnCS.Application.Features.Career.DTOs;
using LearnCS.Application.Features.Career.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnCS.API.Controllers;

[ApiController]
[Route("api/career")]
public class CareerController(ICareerService careerService) : ApiControllerBase
{
    /// <summary>
    /// Retrieves all active career profiles catalogued in the platform.
    /// </summary>
    [HttpGet("profiles")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IReadOnlyList<CareerProfileDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCareerProfiles(CancellationToken cancellationToken)
    {
        var result = await careerService.GetCareerProfilesAsync(cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves active questions and options for taking the career discovery assessment.
    /// </summary>
    [HttpGet("assessment/questions")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IReadOnlyList<CareerQuestionDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCareerQuestions(CancellationToken cancellationToken)
    {
        var result = await careerService.GetCareerQuestionsAsync(cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves the most recent career assessment result and recommendations for the current authenticated learner.
    /// </summary>
    [HttpGet("assessment/my-result")]
    [Authorize]
    [ProducesResponseType(typeof(CareerAssessmentResultDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetMyLatestResult(CancellationToken cancellationToken)
    {
        var result = await careerService.GetMyLatestResultAsync(GetUserId(), cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Submits career assessment responses for the current authenticated learner and calculates profile recommendations.
    /// </summary>
    [HttpPost("assessment/submit")]
    [Authorize]
    [ProducesResponseType(typeof(CareerAssessmentResultDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> SubmitCareerAssessment(
        [FromBody] SubmitCareerAssessmentRequest request,
        CancellationToken cancellationToken)
    {
        var result = await careerService.SubmitCareerAssessmentAsync(GetUserId(), request, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves an active career profile by its unique URL slug.
    /// </summary>
    [HttpGet("profiles/{slug}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(CareerProfileDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCareerProfileBySlug(
        [FromRoute] string slug,
        CancellationToken cancellationToken)
    {
        var result = await careerService.GetCareerProfileBySlugAsync(slug, cancellationToken);
        return HandleResult(result);
    }
}
