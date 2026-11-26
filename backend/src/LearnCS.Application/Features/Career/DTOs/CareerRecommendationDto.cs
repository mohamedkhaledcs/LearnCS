namespace LearnCS.Application.Features.Career.DTOs;

/// <summary>
/// A recommended career profile result with match percentage score and rank.
/// </summary>
public record CareerRecommendationDto(
    Guid CareerProfileId,
    string ProfileName,
    string ProfileSlug,
    string? Description,
    string? IconUrl,
    decimal ScorePercent,
    int Rank
);
