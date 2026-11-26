using LearnCS.Application.Common;
using LearnCS.Application.Features.Assessments.DTOs;
using LearnCS.Domain.Assessment;

namespace LearnCS.Application.Features.Assessments.Services;

/// <summary>
/// Service contract for learner Assessment Attempt use cases.
/// Handles assessment discovery, attempt lifecycle (start, retrieve active, submit answers, score),
/// and learner attempt history retrieval with strict IDOR and answer-key protections.
/// </summary>
public interface IAssessmentService
{
    /// <summary>
    /// Returns published assessments available to the learner, optionally filtered by AssessmentType.
    /// </summary>
    Task<Result<IReadOnlyList<AssessmentSummaryDto>>> GetAvailableAssessmentsAsync(AssessmentType? type = null, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns summary details for a specific published assessment.
    /// </summary>
    Task<Result<AssessmentSummaryDto>> GetAssessmentByIdAsync(Guid assessmentId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Starts a new assessment attempt for the current authenticated learner.
    /// Returns questions and options without leaking answer keys.
    /// </summary>
    Task<Result<AssessmentAttemptDto>> StartAttemptAsync(Guid userId, Guid assessmentId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves an active in-progress attempt for the current authenticated learner.
    /// Security Rule: Enforces attempt ownership (IDOR protection).
    /// </summary>
    Task<Result<AssessmentAttemptDto>> GetActiveAttemptAsync(Guid userId, Guid attemptId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Submits answers to complete an in-progress assessment attempt, calculates score, and records pass/fail status.
    /// Security Rule: Idempotent and protected against replay or submitting completed attempts.
    /// </summary>
    Task<Result<AssessmentResultDto>> SubmitAttemptAsync(Guid userId, Guid attemptId, SubmitAssessmentRequest request, CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves the final result breakdown for a completed attempt belonging to the current authenticated learner.
    /// </summary>
    Task<Result<AssessmentResultDto>> GetAttemptResultAsync(Guid userId, Guid attemptId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves the attempt history for the current authenticated learner.
    /// </summary>
    Task<Result<IReadOnlyList<AssessmentResultDto>>> GetMyAttemptHistoryAsync(Guid userId, CancellationToken cancellationToken = default);
}
