namespace LearnCS.Application.Features.LearningPaths.DTOs;

/// <summary>
/// Summary representation of a learning path for card lists and discovery feeds.
/// </summary>
public record LearningPathSummaryDto(
    Guid Id,
    string Title,
    string Slug,
    string? Description,
    string? ThumbnailUrl,
    string Difficulty,
    int EstimatedHours,
    string Status,
    bool IsFeatured,
    int TracksCount,
    int TotalLessonsCount
);
