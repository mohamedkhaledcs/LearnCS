namespace LearnCS.Application.Features.LearningPaths.DTOs;

/// <summary>
/// Lesson node representation within a module tree.
/// </summary>
public record LessonSummaryDto(
    Guid Id,
    string Title,
    string Slug,
    string Type,
    int DisplayOrder,
    int EstimatedMinutes,
    bool IsFree,
    Guid? ConceptId
);
