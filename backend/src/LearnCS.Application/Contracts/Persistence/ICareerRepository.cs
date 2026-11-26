using LearnCS.Domain.Career;

namespace LearnCS.Application.Contracts.Persistence;

/// <summary>
/// Persistence contract for Career Discovery, questions, attempts, and recommendations.
/// </summary>
public interface ICareerRepository
{
    // ── Career Catalogue ───────────────────────────────────────────────────────

    /// <summary>Returns all active career profiles.</summary>
    Task<IReadOnlyList<CareerProfile>> GetAllActiveProfilesAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns all active questions with their options and each option's scoring weights.
    /// Required to render the career assessment and compute recommendations.
    /// </summary>
    Task<IReadOnlyList<CareerQuestion>> GetAllActiveQuestionsWithOptionsAsync(CancellationToken cancellationToken = default);

    // ── Attempts ───────────────────────────────────────────────────────────────

    Task<CareerAssessmentAttempt?> FindAttemptByIdAsync(Guid attemptId, bool trackForUpdate = false, CancellationToken cancellationToken = default);
    Task<CareerAssessmentAttempt?> GetLatestAttemptForUserAsync(Guid userId, CancellationToken cancellationToken = default);

    void AddAttempt(CareerAssessmentAttempt attempt);
    void AddAnswerResponse(CareerAnswerResponse response);

    // ── Recommendations ────────────────────────────────────────────────────────

    /// <summary>
    /// Returns the career recommendations for a completed attempt, ordered by rank.
    /// </summary>
    Task<IReadOnlyList<CareerRecommendation>> GetRecommendationsForAttemptAsync(Guid attemptId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns the most recent career recommendations for a user (from their latest completed attempt).
    /// </summary>
    Task<IReadOnlyList<CareerRecommendation>> GetLatestRecommendationsForUserAsync(Guid userId, CancellationToken cancellationToken = default);

    void AddRecommendations(IEnumerable<CareerRecommendation> recommendations);
}
