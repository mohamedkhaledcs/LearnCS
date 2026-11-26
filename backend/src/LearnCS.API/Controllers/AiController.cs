using LearnCS.Application.Features.AI.DTOs;
using LearnCS.Application.Features.AI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnCS.API.Controllers;

[ApiController]
[Route("api/ai")]
[Authorize]
public class AiController(IAiConversationService aiConversationService) : ApiControllerBase
{
    /// <summary>
    /// Starts a new AI mentor conversation session for the current authenticated learner.
    /// </summary>
    [HttpPost("conversations")]
    [ProducesResponseType(typeof(AiConversationDetailsDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> StartConversation(
        [FromBody] StartAiConversationRequest request,
        CancellationToken cancellationToken)
    {
        var result = await aiConversationService.StartConversationAsync(GetUserId(), request, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves active AI conversation sessions for the current authenticated learner.
    /// </summary>
    [HttpGet("conversations")]
    [ProducesResponseType(typeof(IReadOnlyList<AiConversationSummaryDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetMyConversations(CancellationToken cancellationToken)
    {
        var result = await aiConversationService.GetMyConversationsAsync(GetUserId(), cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves full details and message history for an AI conversation belonging to the current authenticated learner.
    /// </summary>
    [HttpGet("conversations/{conversationId:guid}")]
    [ProducesResponseType(typeof(AiConversationDetailsDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetConversationById(
        [FromRoute] Guid conversationId,
        CancellationToken cancellationToken)
    {
        var result = await aiConversationService.GetConversationByIdAsync(GetUserId(), conversationId, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Sends a prompt to an active AI conversation, generates an AI completion, and returns the response message.
    /// </summary>
    [HttpPost("conversations/{conversationId:guid}/messages")]
    [ProducesResponseType(typeof(AiMessageDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> SendMessage(
        [FromRoute] Guid conversationId,
        [FromBody] SendAiMessageRequest request,
        CancellationToken cancellationToken)
    {
        var result = await aiConversationService.SendMessageAsync(GetUserId(), conversationId, request, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Closes an active AI conversation session for the current authenticated learner.
    /// </summary>
    [HttpPost("conversations/{conversationId:guid}/close")]
    [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> CloseConversation(
        [FromRoute] Guid conversationId,
        CancellationToken cancellationToken)
    {
        var result = await aiConversationService.CloseConversationAsync(GetUserId(), conversationId, cancellationToken);
        return HandleResult(result);
    }
}
