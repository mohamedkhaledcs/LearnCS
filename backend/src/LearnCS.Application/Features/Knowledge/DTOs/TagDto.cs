namespace LearnCS.Application.Features.Knowledge.DTOs;

/// <summary>
/// DTO representing a concept tag.
/// </summary>
public record TagDto(
    Guid Id,
    string Name,
    string Slug,
    string? Color
);
