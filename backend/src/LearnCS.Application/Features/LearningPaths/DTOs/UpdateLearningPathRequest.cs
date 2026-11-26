using LearnCS.Domain.Knowledge;

namespace LearnCS.Application.Features.LearningPaths.DTOs;

/// <summary>
/// Privileged request DTO to update an existing learning path.
/// Authorization Rule: Restricted to Mentors and Owners.
/// </summary>
public record UpdateLearningPathRequest(
    string Title,
    ConceptDifficulty Difficulty,
    int EstimatedHours,
    string? Description = null,
    string? ThumbnailUrl = null,
    bool? IsFeatured = null
);
