namespace LearnCS.Application.Features.Assessments.DTOs;

/// <summary>
/// Request payload for submitting answers to complete an assessment attempt.
/// </summary>
public record SubmitAssessmentRequest(
    IReadOnlyList<SubmitAnswerItem> Answers
);
