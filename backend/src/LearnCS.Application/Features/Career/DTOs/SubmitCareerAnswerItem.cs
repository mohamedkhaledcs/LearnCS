namespace LearnCS.Application.Features.Career.DTOs;

/// <summary>
/// A single submitted answer choice for a career discovery question.
/// </summary>
public record SubmitCareerAnswerItem(
    Guid QuestionId,
    Guid SelectedOptionId
);
