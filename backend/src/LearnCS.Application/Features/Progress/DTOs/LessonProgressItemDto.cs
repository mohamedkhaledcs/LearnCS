namespace LearnCS.Application.Features.Progress.DTOs;

/// <summary>
/// Individual lesson completion and progress item.
/// </summary>
public record LessonProgressItemDto(
    Guid LessonId,
    string LessonTitle,
    string Status,
    DateTime? StartedAt,
    DateTime? CompletedAt,
    int TimeSpentSeconds
);
