namespace LearnCS.Application.Features.LearningPaths.DTOs;

/// <summary>
/// Track representation including modules.
/// </summary>
public record TrackDetailsDto(
    Guid Id,
    string Title,
    string? Description,
    int DisplayOrder,
    IReadOnlyList<ModuleDetailsDto> Modules
);
