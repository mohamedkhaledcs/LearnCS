namespace LearnCS.Application.Features.LearningPaths.DTOs;

/// <summary>
/// Learner path enrollment status DTO.
/// </summary>
public record EnrollmentDto(
    Guid Id,
    Guid UserId,
    Guid LearningPathId,
    string LearningPathTitle,
    string LearningPathSlug,
    DateTime EnrolledAt,
    string Status,
    decimal ProgressPercent,
    DateTime? CompletedAt
);
