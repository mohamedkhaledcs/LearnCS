using LearnCS.Application.Contracts.Persistence;
using LearnCS.Domain.Knowledge;
using LearnCS.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.Infrastructure.Repositories;

/// <summary>
/// Knowledge graph repository.
///
/// Global query filter on Concept: WHERE status != Archived.
/// All queries in this class automatically exclude archived concepts.
/// Admin operations requiring archived concepts must use IgnoreQueryFilters()
/// in a separate admin-facing method, not added here as no admin use cases exist yet.
///
/// Soft-delete warning note:
/// ConceptRelationship has required navigations to Concept (SourceConcept, TargetConcept).
/// EF warns that if one endpoint is filtered out (archived), the relationship row
/// may still be returned. GetPrerequisitesForAsync and GetDependentsOfAsync return
/// ConceptRelationship rows directly by FK, they do NOT navigate through Concept,
/// so the warning does not affect correctness here. The Application layer should
/// handle the case where a referenced concept slug/id is not found.
/// </summary>
internal sealed class ConceptRepository(AppDbContext db) : IConceptRepository
{
    public Task<Concept?> FindByIdAsync(Guid id, bool trackForUpdate = false, CancellationToken cancellationToken = default)
    {
        var query = db.Concepts.AsQueryable();
        if (!trackForUpdate)
            query = query.AsNoTracking();

        return query.FirstOrDefaultAsync(c => c.Id == id, cancellationToken);
    }

    public Task<Concept?> FindBySlugAsync(string slug, CancellationToken cancellationToken = default)
        => db.Concepts
             .AsNoTracking()
             .FirstOrDefaultAsync(c => c.Slug == slug.ToLowerInvariant(), cancellationToken);

    public Task<Concept?> FindBySlugWithDetailsAsync(string slug, CancellationToken cancellationToken = default)
        => db.Concepts
             .AsNoTracking()
             .Include(c => c.LearningObjectives.OrderBy(o => o.DisplayOrder))
             .Include(c => c.ConceptTags)
                 .ThenInclude(ct => ct.Tag)
             .FirstOrDefaultAsync(c => c.Slug == slug.ToLowerInvariant(), cancellationToken);

    public Task<bool> ExistsBySlugAsync(string slug, CancellationToken cancellationToken = default)
        => db.Concepts.AnyAsync(c => c.Slug == slug.ToLowerInvariant(), cancellationToken);

    public async Task<IReadOnlyList<Concept>> GetAllPublishedAsync(CancellationToken cancellationToken = default)
    {
        return await db.Concepts
            .AsNoTracking()
            .Where(c => c.Status == ConceptStatus.Published)
            .OrderBy(c => c.Title)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Concept>> GetByCategoryAsync(string category, CancellationToken cancellationToken = default)
    {
        return await db.Concepts
            .AsNoTracking()
            .Where(c => c.Category == category && c.Status == ConceptStatus.Published)
            .OrderBy(c => c.Difficulty)
            .ThenBy(c => c.Title)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Concept>> GetByDifficultyRangeAsync(ConceptDifficulty maxDifficulty, CancellationToken cancellationToken = default)
    {
        return await db.Concepts
            .AsNoTracking()
            .Where(c => c.Status == ConceptStatus.Published && c.Difficulty <= maxDifficulty)
            .OrderBy(c => c.Difficulty)
            .ThenBy(c => c.Title)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ConceptRelationship>> GetPrerequisitesForAsync(Guid conceptId, CancellationToken cancellationToken = default)
    {
        // Returns relationships where this concept is the target (i.e. something must be learned first).
        return await db.ConceptRelationships
            .AsNoTracking()
            .Where(r => r.TargetConceptId == conceptId && r.RelationType == RelationType.Prerequisite)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ConceptRelationship>> GetDependentsOfAsync(Guid conceptId, CancellationToken cancellationToken = default)
    {
        // Returns all outgoing edges, what this concept unlocks.
        return await db.ConceptRelationships
            .AsNoTracking()
            .Where(r => r.SourceConceptId == conceptId)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ConceptRelationship>> GetAllRelationshipsAsync(CancellationToken cancellationToken = default)
    {
        return await db.ConceptRelationships
            .AsNoTracking()
            .Include(r => r.SourceConcept)
            .Include(r => r.TargetConcept)
            .ToListAsync(cancellationToken);
    }

    public void Add(Concept concept)
        => db.Concepts.Add(concept);
}
