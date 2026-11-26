namespace LearnCS.Application.Features.LearningPaths.DTOs;

/// <summary>
/// Detailed view of a learning path including tracks, modules, and lesson trees.
/// </summary>
public record LearningPathDetailsDto(
    Guid Id,
    string Title,
    string Slug,
    string? Description,
    string? ThumbnailUrl,
    string Difficulty,
    int EstimatedHours,
    string Status,
    bool IsFeatured,
    IReadOnlyList<TrackDetailsDto> Tracks
);
