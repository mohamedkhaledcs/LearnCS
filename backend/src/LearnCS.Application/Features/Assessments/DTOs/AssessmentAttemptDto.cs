namespace LearnCS.Application.Features.Assessments.DTOs;

/// <summary>
/// Active assessment attempt representation presented to the learner to take the test.
/// </summary>
public record AssessmentAttemptDto(
    Guid AttemptId,
    Guid AssessmentId,
    string AssessmentTitle,
    DateTime StartedAt,
    string Status,
    int? TimeLimitMinutes,
    IReadOnlyList<QuestionForTakingDto> Questions
);
