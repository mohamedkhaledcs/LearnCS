using LearnCS.Domain.Platform;

namespace LearnCS.Application.Features.AI.DTOs;

/// <summary>
/// Request payload to start a new AI conversation session.
/// </summary>
public record StartAiConversationRequest(
    AiMentorMode Mode,
    string? Title = null,
    Guid? ConceptId = null,
    Guid? LessonId = null,
    Guid? LearningPathId = null,
    string? InitialMessage = null
);
