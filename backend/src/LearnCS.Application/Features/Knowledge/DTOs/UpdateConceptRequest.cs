using LearnCS.Domain.Knowledge;

namespace LearnCS.Application.Features.Knowledge.DTOs;

/// <summary>
/// Privileged request DTO to update an existing concept.
/// Authorization Rule: Restricted to Mentors and Owners.
/// </summary>
public record UpdateConceptRequest(
    string Title,
    string Category,
    ConceptDifficulty Difficulty,
    string? Description = null,
    int? EstimatedMinutes = null
);
