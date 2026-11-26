namespace LearnCS.Application.Features.AI.DTOs;

/// <summary>
/// Detailed view of an AI conversation including ordered message history.
/// </summary>
public record AiConversationDetailsDto(
    Guid Id,
    Guid UserId,
    string Mode,
    string? Title,
    Guid? ConceptId,
    Guid? LessonId,
    Guid? LearningPathId,
    bool IsActive,
    DateTime CreatedAt,
    IReadOnlyList<AiMessageDto> Messages
);
