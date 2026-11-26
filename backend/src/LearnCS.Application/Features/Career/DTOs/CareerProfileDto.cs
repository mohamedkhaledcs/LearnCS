namespace LearnCS.Application.Features.Career.DTOs;

/// <summary>
/// Representation of a Computer Science career path / specialization.
/// </summary>
public record CareerProfileDto(
    Guid Id,
    string Name,
    string Slug,
    string? Description,
    string? IconUrl
);
