namespace LearnCS.Application.Features.Progress.DTOs;

/// <summary>
/// Learner progress status details for a specific learning path/course.
/// </summary>
public record PathProgressDetailsDto(
    Guid LearningPathId,
    string PathTitle,
    string EnrollmentStatus,
    decimal ProgressPercent,
    int CompletedLessons,
    int TotalLessons,
    DateTime EnrolledAt,
    DateTime? CompletedAt,
    IReadOnlyList<LessonProgressItemDto> LessonProgresses
);
