namespace LearnCS.Application.Features.Projects.DTOs;

/// <summary>
/// Summary view of a practical project.
/// </summary>
public record ProjectSummaryDto(
    Guid Id,
    string Title,
    string Slug,
    string? Description,
    string Difficulty,
    int EstimatedHours,
    string Status
);
