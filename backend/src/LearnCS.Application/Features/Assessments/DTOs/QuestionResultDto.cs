namespace LearnCS.Application.Features.Assessments.DTOs;

/// <summary>
/// Question breakdown result returned AFTER attempt completion, including points, correctness, and explanation.
/// </summary>
public record QuestionResultDto(
    Guid QuestionId,
    string QuestionText,
    string QuestionType,
    int PointsEarned,
    int MaxPoints,
    bool IsCorrect,
    string? Explanation,
    IReadOnlyList<QuestionOptionResultDto> Options
);
