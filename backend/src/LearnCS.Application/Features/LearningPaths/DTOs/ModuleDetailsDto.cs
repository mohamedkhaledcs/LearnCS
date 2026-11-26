namespace LearnCS.Application.Features.LearningPaths.DTOs;

/// <summary>
/// Module representation including lessons.
/// </summary>
public record ModuleDetailsDto(
    Guid Id,
    string Title,
    string? Description,
    int DisplayOrder,
    int EstimatedMinutes,
    IReadOnlyList<LessonSummaryDto> Lessons
);
