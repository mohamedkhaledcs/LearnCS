namespace LearnCS.Application.Features.Assessments.DTOs;

/// <summary>
/// Final result payload for a completed assessment attempt.
/// </summary>
public record AssessmentResultDto(
    Guid AttemptId,
    Guid AssessmentId,
    string AssessmentTitle,
    string Status,
    decimal Score,
    decimal MaxScore,
    decimal ScorePercent,
    decimal PassScore,
    bool Passed,
    DateTime StartedAt,
    DateTime? CompletedAt,
    IReadOnlyList<QuestionResultDto> QuestionResults
);
