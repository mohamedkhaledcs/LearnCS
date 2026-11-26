using LearnCS.Application.Features.Assessments.DTOs;
using LearnCS.Application.Features.Assessments.Services;
using LearnCS.Domain.Assessment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnCS.API.Controllers;

[ApiController]
[Route("api/assessments")]
public class AssessmentsController(IAssessmentService assessmentService) : ApiControllerBase
{
    /// <summary>
    /// Retrieves available published assessments, optionally filtered by AssessmentType.
    /// </summary>
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IReadOnlyList<AssessmentSummaryDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAvailableAssessments(
        [FromQuery] AssessmentType? type,
        CancellationToken cancellationToken)
    {
        var result = await assessmentService.GetAvailableAssessmentsAsync(type, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves assessment attempt history for the current authenticated learner.
    /// </summary>
    [HttpGet("my-attempts")]
    [Authorize]
    [ProducesResponseType(typeof(IReadOnlyList<AssessmentResultDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetMyAttemptHistory(CancellationToken cancellationToken)
    {
        var result = await assessmentService.GetMyAttemptHistoryAsync(GetUserId(), cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves summary details for a published assessment by its unique ID.
    /// </summary>
    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(AssessmentSummaryDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetAssessmentById(
        [FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        var result = await assessmentService.GetAssessmentByIdAsync(id, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Starts a new assessment attempt for the current authenticated learner.
    /// Questions and options are returned without exposing answer keys.
    /// </summary>
    [HttpPost("{id:guid}/start")]
    [Authorize]
    [ProducesResponseType(typeof(AssessmentAttemptDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> StartAttempt(
        [FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        var result = await assessmentService.StartAttemptAsync(GetUserId(), id, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves an active in-progress assessment attempt belonging to the current authenticated learner.
    /// </summary>
    [HttpGet("attempts/{attemptId:guid}")]
    [Authorize]
    [ProducesResponseType(typeof(AssessmentAttemptDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetActiveAttempt(
        [FromRoute] Guid attemptId,
        CancellationToken cancellationToken)
    {
        var result = await assessmentService.GetActiveAttemptAsync(GetUserId(), attemptId, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Submits answers to complete an in-progress attempt and calculates the learner's score.
    /// </summary>
    [HttpPost("attempts/{attemptId:guid}/submit")]
    [Authorize]
    [ProducesResponseType(typeof(AssessmentResultDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> SubmitAttempt(
        [FromRoute] Guid attemptId,
        [FromBody] SubmitAssessmentRequest request,
        CancellationToken cancellationToken)
    {
        var result = await assessmentService.SubmitAttemptAsync(GetUserId(), attemptId, request, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves the score and detailed result breakdown for a completed attempt.
    /// </summary>
    [HttpGet("attempts/{attemptId:guid}/result")]
    [Authorize]
    [ProducesResponseType(typeof(AssessmentResultDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetAttemptResult(
        [FromRoute] Guid attemptId,
        CancellationToken cancellationToken)
    {
        var result = await assessmentService.GetAttemptResultAsync(GetUserId(), attemptId, cancellationToken);
        return HandleResult(result);
    }
}
