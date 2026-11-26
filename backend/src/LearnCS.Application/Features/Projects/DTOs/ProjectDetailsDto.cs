namespace LearnCS.Application.Features.Projects.DTOs;

/// <summary>
/// Detailed view of a practical project including instructions and required concept IDs.
/// </summary>
public record ProjectDetailsDto(
    Guid Id,
    string Title,
    string Slug,
    string? Description,
    string Difficulty,
    string? Instructions,
    int EstimatedHours,
    string Status,
    IReadOnlyList<Guid> RequiredConceptIds
);
