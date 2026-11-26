namespace LearnCS.Application.Features.Knowledge.DTOs;

/// <summary>
/// Detailed view of a concept including full description, learning objectives, tags, and prerequisite information.
/// </summary>
public record ConceptDetailsDto(
    Guid Id,
    string Title,
    string Slug,
    string? Description,
    string Category,
    string Difficulty,
    string Status,
    int? EstimatedMinutes,
    IReadOnlyList<LearningObjectiveDto> LearningObjectives,
    IReadOnlyList<TagDto> Tags,
    IReadOnlyList<ConceptSummaryDto> Prerequisites
);
