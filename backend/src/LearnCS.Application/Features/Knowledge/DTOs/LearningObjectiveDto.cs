namespace LearnCS.Application.Features.Knowledge.DTOs;

/// <summary>
/// DTO representing a measurable learning objective aligned with Bloom's taxonomy.
/// </summary>
public record LearningObjectiveDto(
    Guid Id,
    string Title,
    string? Description,
    string BloomLevel,
    int DisplayOrder
);
