using LearnCS.Domain.Knowledge;

namespace LearnCS.Application.Features.Knowledge.DTOs;

/// <summary>
/// Privileged request DTO to create a new concept node in the Knowledge Graph.
/// Authorization Rule: Restricted to Mentors and Owners. Normal Users/Learners cannot create concepts.
/// </summary>
public record CreateConceptRequest(
    string Title,
    string Slug,
    string Category,
    ConceptDifficulty Difficulty,
    string? Description = null,
    int? EstimatedMinutes = null,
    bool Publish = false
);
