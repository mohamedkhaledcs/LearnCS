using LearnCS.Domain.Knowledge;

namespace LearnCS.Application.Contracts.Persistence;

/// <summary>
/// Persistence contract for the Knowledge Graph domain.
/// Supports concept navigation, prerequisite resolution, and knowledge map rendering.
/// 
/// NOTE: EF global query filter on Concept excludes Archived concepts by default.
/// Repository implementations inherit this filter, archived concepts will not be returned
/// unless IgnoreQueryFilters() is used in a specific admin-facing method.
/// </summary>
public interface IConceptRepository
{
    Task<Concept?> FindByIdAsync(Guid id, bool trackForUpdate = false, CancellationToken cancellationToken = default);
    Task<Concept?> FindBySlugAsync(string slug, CancellationToken cancellationToken = default);
    Task<Concept?> FindBySlugWithDetailsAsync(string slug, CancellationToken cancellationToken = default);

    /// <summary>Returns true if a concept with this slug already exists.</summary>
    Task<bool> ExistsBySlugAsync(string slug, CancellationToken cancellationToken = default);

    /// <summary>Returns all published (non-archived) concepts ordered by title.</summary>
    Task<IReadOnlyList<Concept>> GetAllPublishedAsync(CancellationToken cancellationToken = default);

    /// <summary>Returns concepts in a specific category, e.g., "Data Structures", "Algorithms".</summary>
    Task<IReadOnlyList<Concept>> GetByCategoryAsync(string category, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns concepts with difficulty at or below the given level.
    /// Used by the recommendation engine to surface appropriate next steps.
    /// </summary>
    Task<IReadOnlyList<Concept>> GetByDifficultyRangeAsync(ConceptDifficulty maxDifficulty, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns all prerequisite relationships where the given concept is the target.
    /// Used to check whether a learner has met prerequisites before recommending a concept.
    /// </summary>
    Task<IReadOnlyList<ConceptRelationship>> GetPrerequisitesForAsync(Guid conceptId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns all outgoing relationships from the given concept.
    /// Used to render the knowledge graph and suggest "what to learn next".
    /// </summary>
    Task<IReadOnlyList<ConceptRelationship>> GetDependentsOfAsync(Guid conceptId, CancellationToken cancellationToken = default);

    /// <summary>Returns all graph relationships for knowledge map rendering.</summary>
    Task<IReadOnlyList<ConceptRelationship>> GetAllRelationshipsAsync(CancellationToken cancellationToken = default);

    void Add(Concept concept);
}
