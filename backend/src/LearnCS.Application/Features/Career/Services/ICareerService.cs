using LearnCS.Application.Common;
using LearnCS.Application.Features.Career.DTOs;

namespace LearnCS.Application.Features.Career.Services;

/// <summary>
/// Service contract for Career Discovery & Assessment use cases.
/// Computes weighted career profile recommendations using domain score weights.
/// </summary>
public interface ICareerService
{
    /// <summary>
    /// Returns all active career profiles catalogued in the platform.
    /// </summary>
    Task<Result<IReadOnlyList<CareerProfileDto>>> GetCareerProfilesAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns an active career profile by slug.
    /// </summary>
    Task<Result<CareerProfileDto>> GetCareerProfileBySlugAsync(string slug, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns all active questions and options for taking the career discovery assessment.
    /// </summary>
    Task<Result<IReadOnlyList<CareerQuestionDto>>> GetCareerQuestionsAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Submits career assessment responses for the current authenticated learner,
    /// calculates weighted profile scores, persists recommendations, and returns the result.
    /// </summary>
    Task<Result<CareerAssessmentResultDto>> SubmitCareerAssessmentAsync(Guid userId, SubmitCareerAssessmentRequest request, CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves the latest career assessment result for the current authenticated learner.
    /// Security Rule: Enforces user ownership (IDOR protection).
    /// </summary>
    Task<Result<CareerAssessmentResultDto>> GetMyLatestResultAsync(Guid userId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves a specific career assessment result by attempt ID.
    /// Security Rule: Enforces user ownership (IDOR protection).
    /// </summary>
    Task<Result<CareerAssessmentResultDto>> GetResultByAttemptIdAsync(Guid userId, Guid attemptId, CancellationToken cancellationToken = default);
}
