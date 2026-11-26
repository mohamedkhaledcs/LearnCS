namespace LearnCS.Application.Features.Career.DTOs;

/// <summary>
/// Answer option representation for a career discovery question.
/// </summary>
public record CareerQuestionOptionDto(
    Guid Id,
    string Text,
    int DisplayOrder
);
