using LearnCS.Application.Common;
using LearnCS.Application.Features.Knowledge.DTOs;
using LearnCS.Domain.Knowledge;

namespace LearnCS.Application.Features.Knowledge.Services;

/// <summary>
/// Service contract for Concept & Knowledge Graph use cases.
/// Handles concept retrieval, category & difficulty filtering, prerequisite navigation,
/// graph data export, and privileged concept creation/management (Mentors & Owners only).
/// </summary>
public interface IConceptService
{
    /// <summary>
    /// Returns all published concepts, optionally filtered by category or difficulty level.
    /// Available to all authenticated users/learners.
    /// </summary>
    Task<Result<IReadOnlyList<ConceptSummaryDto>>> GetPublishedConceptsAsync(string? category = null, ConceptDifficulty? maxDifficulty = null, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns full details for a concept by slug, including objectives, tags, and prerequisites.
    /// </summary>
    Task<Result<ConceptDetailsDto>> GetConceptBySlugAsync(string slug, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns the complete Knowledge Graph structure (nodes and edges) for visual map rendering.
    /// </summary>
    Task<Result<KnowledgeGraphDto>> GetKnowledgeGraphAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Creates a new concept node in the Knowledge Graph.
    /// Authorization Rule: Restricted to Mentors and Owners. Normal Users/Learners cannot create concepts.
    /// </summary>
    Task<Result<ConceptSummaryDto>> CreateConceptAsync(CreateConceptRequest request, IEnumerable<string> callerRoles, CancellationToken cancellationToken = default);

    /// <summary>
    /// Updates an existing concept.
    /// Authorization Rule: Restricted to Mentors and Owners.
    /// </summary>
    Task<Result<ConceptSummaryDto>> UpdateConceptAsync(Guid conceptId, UpdateConceptRequest request, IEnumerable<string> callerRoles, CancellationToken cancellationToken = default);

    /// <summary>
    /// Publishes a draft concept.
    /// Authorization Rule: Restricted to Mentors and Owners.
    /// </summary>
    Task<Result<ConceptSummaryDto>> PublishConceptAsync(Guid conceptId, IEnumerable<string> callerRoles, CancellationToken cancellationToken = default);
}
