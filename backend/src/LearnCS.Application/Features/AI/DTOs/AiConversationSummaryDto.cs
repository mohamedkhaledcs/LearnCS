namespace LearnCS.Application.Features.AI.DTOs;

/// <summary>
/// Summary representation of an active or past AI conversation.
/// </summary>
public record AiConversationSummaryDto(
    Guid Id,
    Guid UserId,
    string Mode,
    string? Title,
    Guid? ConceptId,
    Guid? LessonId,
    Guid? LearningPathId,
    bool IsActive,
    DateTime CreatedAt,
    int MessagesCount,
    DateTime? LastMessageAt
);
