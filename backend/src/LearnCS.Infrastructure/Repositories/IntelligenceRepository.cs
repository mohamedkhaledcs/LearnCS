using LearnCS.Application.Contracts.Persistence;
using LearnCS.Domain.Intelligence;
using LearnCS.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.Infrastructure.Repositories;

internal sealed class IntelligenceRepository(AppDbContext db) : IIntelligenceRepository
{
    // ── Concept Mastery ────────────────────────────────────────────────────────

    public Task<ConceptMastery?> GetConceptMasteryAsync(Guid userId, Guid conceptId, CancellationToken cancellationToken = default)
        => db.ConceptMasteries
             .FirstOrDefaultAsync(m => m.UserId == userId && m.ConceptId == conceptId, cancellationToken);

    public async Task<IReadOnlyList<ConceptMastery>> GetAllMasteryForUserAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await db.ConceptMasteries
            .AsNoTracking()
            .Where(m => m.UserId == userId)
            .OrderByDescending(m => m.MasteryScore)
            .ToListAsync(cancellationToken);
    }

    public void AddConceptMastery(ConceptMastery mastery)
        => db.ConceptMasteries.Add(mastery);

    // ── Learner Level ──────────────────────────────────────────────────────────

    public Task<LearnerLevelRecord?> GetLearnerLevelAsync(Guid userId, CancellationToken cancellationToken = default)
        => db.LearnerLevelRecords
             .FirstOrDefaultAsync(r => r.UserId == userId, cancellationToken);

    public void AddLearnerLevel(LearnerLevelRecord record)
        => db.LearnerLevelRecords.Add(record);

    // ── Recommendations ────────────────────────────────────────────────────────

    public async Task<IReadOnlyList<LearningRecommendation>> GetActiveRecommendationsAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await db.LearningRecommendations
            .AsNoTracking()
            .Where(r => r.UserId == userId && r.IsActive)
            .OrderByDescending(r => r.Score)
            .ToListAsync(cancellationToken);
    }

    public void AddRecommendation(LearningRecommendation recommendation)
        => db.LearningRecommendations.Add(recommendation);

    // ── Roadmap ────────────────────────────────────────────────────────────────

    public Task<LearningRoadmap?> GetActiveRoadmapAsync(Guid userId, CancellationToken cancellationToken = default)
        => db.LearningRoadmaps
             .Include(r => r.Steps.OrderBy(s => s.DisplayOrder))
             .FirstOrDefaultAsync(r => r.UserId == userId && r.IsActive, cancellationToken);

    public void AddRoadmap(LearningRoadmap roadmap)
        => db.LearningRoadmaps.Add(roadmap);
}
