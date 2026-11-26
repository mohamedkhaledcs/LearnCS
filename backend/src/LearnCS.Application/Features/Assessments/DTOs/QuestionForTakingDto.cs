namespace LearnCS.Application.Features.Assessments.DTOs;

/// <summary>
/// Question presented to a learner during an active assessment attempt.
/// </summary>
public record QuestionForTakingDto(
    Guid Id,
    string Text,
    string Type,
    string Difficulty,
    int Points,
    string? CodeSnippet,
    IReadOnlyList<QuestionOptionForTakingDto> Options
);
