namespace LearnCS.Application.Features.Assessments.DTOs;

/// <summary>
/// Question option review DTO returned AFTER assessment completion.
/// Includes correctness flags and learner selection indicator.
/// </summary>
public record QuestionOptionResultDto(
    Guid Id,
    string Text,
    bool IsCorrect,
    bool IsSelected,
    int DisplayOrder
);
