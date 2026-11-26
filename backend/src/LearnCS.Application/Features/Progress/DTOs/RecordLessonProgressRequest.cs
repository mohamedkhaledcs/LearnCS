namespace LearnCS.Application.Features.Progress.DTOs;

/// <summary>
/// Request payload to record or complete lesson progress.
/// </summary>
public record RecordLessonProgressRequest(
    Guid LessonId,
    int TimeSpentSeconds = 0
);
