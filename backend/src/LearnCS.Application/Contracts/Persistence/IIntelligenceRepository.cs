using LearnCS.Domain.Intelligence;

namespace LearnCS.Application.Contracts.Persistence;

/// <summary>
/// Persistence contract for the Learning Intelligence domain, /// concept mastery, learner level, and personalized recommendations/roadmaps.
/// </summary>
public interface IIntelligenceRepository
{
    // ── Concept Mastery ────────────────────────────────────────────────────────

    Task<ConceptMastery?> GetConceptMasteryAsync(Guid userId, Guid conceptId, CancellationToken cancellationToken = default);

    /// <summary>Returns all concept mastery records for a user, ordered by mastery score descending.</summary>
    Task<IReadOnlyList<ConceptMastery>> GetAllMasteryForUserAsync(Guid userId, CancellationToken cancellationToken = default);

    void AddConceptMastery(ConceptMastery mastery);

    // ── Learner Level ──────────────────────────────────────────────────────────

    Task<LearnerLevelRecord?> GetLearnerLevelAsync(Guid userId, CancellationToken cancellationToken = default);
    void AddLearnerLevel(LearnerLevelRecord record);

    // ── Recommendations ────────────────────────────────────────────────────────

    /// <summary>Returns the user's current active learning recommendations.</summary>
    Task<IReadOnlyList<LearningRecommendation>> GetActiveRecommendationsAsync(Guid userId, CancellationToken cancellationToken = default);

    void AddRecommendation(LearningRecommendation recommendation);

    // ── Roadmap ────────────────────────────────────────────────────────────────

    /// <summary>Returns the user's currently active personalised roadmap with steps.</summary>
    Task<LearningRoadmap?> GetActiveRoadmapAsync(Guid userId, CancellationToken cancellationToken = default);

    void AddRoadmap(LearningRoadmap roadmap);
}
