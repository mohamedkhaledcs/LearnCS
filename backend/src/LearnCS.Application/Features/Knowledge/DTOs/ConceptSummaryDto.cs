namespace LearnCS.Application.Features.Knowledge.DTOs;

/// <summary>
/// Summary representation of a concept node for lists, search, and category views.
/// </summary>
public record ConceptSummaryDto(
    Guid Id,
    string Title,
    string Slug,
    string Category,
    string Difficulty,
    string Status,
    int? EstimatedMinutes
);
