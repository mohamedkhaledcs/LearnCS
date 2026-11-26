namespace LearnCS.Application.Features.Career.DTOs;

/// <summary>
/// Request wrapper for submitting career discovery assessment responses.
/// </summary>
public record SubmitCareerAssessmentRequest(
    IReadOnlyList<SubmitCareerAnswerItem> Answers
);
