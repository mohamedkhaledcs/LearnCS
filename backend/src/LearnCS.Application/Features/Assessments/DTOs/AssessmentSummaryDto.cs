namespace LearnCS.Application.Features.Assessments.DTOs;

/// <summary>
/// Summary representation of an assessment available for learners.
/// </summary>
public record AssessmentSummaryDto(
    Guid Id,
    string Title,
    string? Description,
    string Type,
    int? TimeLimitMinutes,
    decimal PassScore,
    int QuestionsCount
);
