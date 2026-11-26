namespace LearnCS.Application.Features.Progress.DTOs;

/// <summary>
/// Overall progress and mastery overview for the authenticated learner.
/// </summary>
public record LearnerProgressSummaryDto(
    Guid UserId,
    string Level,
    long TotalXp,
    int CurrentStreakDays,
    int LongestStreakDays,
    int CompletedLessonsCount,
    int MasteredConceptsCount,
    decimal OverallMasteryScore,
    IReadOnlyList<ConceptMasteryItemDto> TopMasteredConcepts
);
