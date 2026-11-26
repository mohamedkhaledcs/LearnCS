namespace LearnCS.Application.Features.Career.DTOs;

/// <summary>
/// Question presented to learners during the career discovery assessment.
/// </summary>
public record CareerQuestionDto(
    Guid Id,
    string Text,
    string? HelpText,
    string? CategoryTag,
    int DisplayOrder,
    IReadOnlyList<CareerQuestionOptionDto> Options
);
