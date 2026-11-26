namespace LearnCS.Application.Features.Knowledge.DTOs;

/// <summary>
/// Knowledge Graph DTO containing nodes (concepts) and edges (prerequisites/relationships).
/// Used by the interactive learning map.
/// </summary>
public record KnowledgeGraphDto(
    IReadOnlyList<ConceptSummaryDto> Nodes,
    IReadOnlyList<ConceptRelationshipDto> Edges
);
