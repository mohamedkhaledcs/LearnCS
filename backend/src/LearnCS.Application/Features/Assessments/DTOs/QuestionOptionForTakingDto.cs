namespace LearnCS.Application.Features.Assessments.DTOs;

/// <summary>
/// Question option DTO presented to a learner during an active assessment attempt.
/// Security Notice: NEVER includes IsCorrect or answer key explanations.
/// </summary>
public record QuestionOptionForTakingDto(
    Guid Id,
    string Text,
    int DisplayOrder
);
