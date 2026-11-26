namespace LearnCS.Application.Features.Assessments.DTOs;

/// <summary>
/// A single submitted answer payload item for a question in an assessment attempt.
/// </summary>
public record SubmitAnswerItem(
    Guid QuestionId,
    Guid? SelectedOptionId = null,
    string? TextAnswer = null,
    int? TimeTakenSeconds = null
);
