using LearnCS.Application.Common;
using LearnCS.Application.Features.AI.DTOs;

namespace LearnCS.Application.Features.AI.Services;

/// <summary>
/// Service contract for AI conversation management and completion generation.
/// Interacts with ILlmProvider and persists conversation message history.
/// </summary>
public interface IAiConversationService
{
    /// <summary>
    /// Starts a new AI conversation session for the authenticated learner.
    /// Optionally processes an initial user prompt and returns the assistant's reply.
    /// </summary>
    Task<Result<AiConversationDetailsDto>> StartConversationAsync(Guid userId, StartAiConversationRequest request, CancellationToken cancellationToken = default);

    /// <summary>
    /// Sends a user message to an active AI conversation, generates an AI completion,
    /// persists messages, and returns the assistant message.
    /// Security Rule: Enforces conversation ownership (IDOR protection) and message role integrity.
    /// </summary>
    Task<Result<AiMessageDto>> SendMessageAsync(Guid userId, Guid conversationId, SendAiMessageRequest request, CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves active AI conversations for the authenticated learner.
    /// </summary>
    Task<Result<IReadOnlyList<AiConversationSummaryDto>>> GetMyConversationsAsync(Guid userId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves full details and message history for a specific AI conversation.
    /// Security Rule: Enforces conversation ownership (IDOR protection).
    /// </summary>
    Task<Result<AiConversationDetailsDto>> GetConversationByIdAsync(Guid userId, Guid conversationId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Closes an active AI conversation for the authenticated learner.
    /// </summary>
    Task<Result<bool>> CloseConversationAsync(Guid userId, Guid conversationId, CancellationToken cancellationToken = default);
}
