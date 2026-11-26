using LearnCS.Domain.Knowledge;

namespace LearnCS.Application.Features.LearningPaths.DTOs;

/// <summary>
/// Privileged request DTO to create a new learning path.
/// Authorization Rule: Restricted to Mentors and Owners. Normal Users/Learners cannot create learning paths.
/// </summary>
public record CreateLearningPathRequest(
    string Title,
    string Slug,
    ConceptDifficulty Difficulty,
    int EstimatedHours,
    string? Description = null,
    string? ThumbnailUrl = null,
    bool Publish = false
);
