namespace LearnCS.Application.Features.Progress.DTOs;

/// <summary>
/// DTO representing a learner's mastery breakdown for a specific computer science concept.
/// </summary>
public record ConceptMasteryItemDto(
    Guid ConceptId,
    string ConceptName,
    decimal MasteryScore,
    decimal Confidence,
    bool IsMastered,
    bool IsWeak,
    int TotalAttempts,
    DateTime LastEvaluatedAt
);
