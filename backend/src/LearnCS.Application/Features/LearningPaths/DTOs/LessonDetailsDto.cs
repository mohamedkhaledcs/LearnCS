namespace LearnCS.Application.Features.LearningPaths.DTOs;

/// <summary>
/// Detailed view of a single lesson including Markdown content, resources, and linked concept ID.
/// </summary>
public record LessonDetailsDto(
    Guid Id,
    Guid ModuleId,
    string Title,
    string Slug,
    string? ContentMarkdown,
    string? ExternalUrl,
    string Type,
    string Status,
    int DisplayOrder,
    int? EstimatedMinutes,
    bool IsFree,
    Guid? ConceptId
);
