namespace LearnCS.Application.Features.AI.DTOs;

/// <summary>
/// DTO representing a single message in an AI conversation.
/// </summary>
public record AiMessageDto(
    Guid Id,
    Guid ConversationId,
    string Role,
    string Content,
    DateTime CreatedAt,
    int? InputTokens,
    int? OutputTokens,
    string? ModelUsed
);
