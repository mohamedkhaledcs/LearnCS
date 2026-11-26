using LearnCS.Domain.Assessment;

namespace LearnCS.Application.Contracts.Persistence;

/// <summary>
/// Persistence contract for Assessments, Questions, and Assessment Attempts.
/// Separated from ILearningPathRepository because assessments are an independent domain concern.
/// </summary>
public interface IAssessmentRepository
{
    // ── Assessments ────────────────────────────────────────────────────────────

    Task<Assessment?> FindByIdAsync(Guid id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns an assessment with its questions and options eagerly loaded.
    /// Required to present a quiz to the learner.
    /// </summary>
    Task<Assessment?> FindByIdWithQuestionsAsync(Guid id, CancellationToken cancellationToken = default);

    /// <summary>Returns all published assessments.</summary>
    Task<IReadOnlyList<Assessment>> GetAllPublishedAsync(CancellationToken cancellationToken = default);

    /// <summary>Returns published assessments of a given type (e.g., InitialPlacement).</summary>
    Task<IReadOnlyList<Assessment>> GetPublishedByTypeAsync(AssessmentType type, CancellationToken cancellationToken = default);

    // ── Assessment Attempts ────────────────────────────────────────────────────

    Task<AssessmentAttempt?> FindAttemptByIdAsync(Guid attemptId, bool trackForUpdate = false, CancellationToken cancellationToken = default);

    /// <summary>Returns an attempt with its answers for scoring/review.</summary>
    Task<AssessmentAttempt?> FindAttemptByIdWithAnswersAsync(Guid attemptId, CancellationToken cancellationToken = default);

    /// <summary>Returns an attempt with assessment, questions, options, and submitted answers eagerly loaded.</summary>
    Task<AssessmentAttempt?> FindAttemptByIdWithDetailsAsync(Guid attemptId, CancellationToken cancellationToken = default);

    /// <summary>Returns the most recent attempt for a user on a specific assessment.</summary>
    Task<AssessmentAttempt?> GetLatestAttemptAsync(Guid userId, Guid assessmentId, CancellationToken cancellationToken = default);

    /// <summary>Returns all completed attempts for a user across all assessments.</summary>
    Task<IReadOnlyList<AssessmentAttempt>> GetAttemptsForUserAsync(Guid userId, CancellationToken cancellationToken = default);

    void AddAttempt(AssessmentAttempt attempt);
    void AddAnswer(AttemptAnswer answer);
}
