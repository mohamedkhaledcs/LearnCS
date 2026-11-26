namespace LearnCS.Application.Features.Knowledge.DTOs;

/// <summary>
/// Knowledge Graph edge representation connecting two concepts.
/// </summary>
public record ConceptRelationshipDto(
    Guid Id,
    Guid SourceConceptId,
    string SourceTitle,
    Guid TargetConceptId,
    string TargetTitle,
    string RelationType,
    decimal Weight
);
