using LearnCS.Application.Common;
using LearnCS.Application.Features.LearningPaths.DTOs;

namespace LearnCS.Application.Features.LearningPaths.Services;

/// <summary>
/// Service contract for Learning Path discovery, detailed structure navigation,
/// privileged content management (Mentors & Owners), and learner path enrollment.
/// </summary>
public interface ILearningPathService
{
    /// <summary>
    /// Returns all published learning paths for learner discovery.
    /// </summary>
    Task<Result<IReadOnlyList<LearningPathSummaryDto>>> GetPublishedLearningPathsAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns full details for a learning path by slug, including tracks, modules, and lessons.
    /// </summary>
    Task<Result<LearningPathDetailsDto>> GetLearningPathBySlugAsync(string slug, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns full details for a learning path by ID, including tracks, modules, and lessons.
    /// </summary>
    Task<Result<LearningPathDetailsDto>> GetLearningPathByIdAsync(Guid pathId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns full details for a lesson by slug.
    /// </summary>
    Task<Result<LessonDetailsDto>> GetLessonBySlugAsync(string slug, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns full details for a lesson by ID.
    /// </summary>
    Task<Result<LessonDetailsDto>> GetLessonByIdAsync(Guid lessonId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Creates a new learning path node in the platform catalog.
    /// Authorization Rule: Restricted to Mentors and Owners. Normal Users/Learners cannot create learning paths.
    /// </summary>
    Task<Result<LearningPathSummaryDto>> CreateLearningPathAsync(CreateLearningPathRequest request, IEnumerable<string> callerRoles, CancellationToken cancellationToken = default);

    /// <summary>
    /// Updates an existing learning path.
    /// Authorization Rule: Restricted to Mentors and Owners.
    /// </summary>
    Task<Result<LearningPathSummaryDto>> UpdateLearningPathAsync(Guid pathId, UpdateLearningPathRequest request, IEnumerable<string> callerRoles, CancellationToken cancellationToken = default);

    /// <summary>
    /// Publishes a draft learning path to make it eligible for enrollment.
    /// Authorization Rule: Restricted to Mentors and Owners.
    /// </summary>
    Task<Result<LearningPathSummaryDto>> PublishLearningPathAsync(Guid pathId, IEnumerable<string> callerRoles, CancellationToken cancellationToken = default);

    /// <summary>
    /// Enrolls the current authenticated learner in an eligible published learning path.
    /// </summary>
    Task<Result<EnrollmentDto>> EnrollAsync(Guid userId, Guid learningPathId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns active path enrollments for the current authenticated learner.
    /// </summary>
    Task<Result<IReadOnlyList<EnrollmentDto>>> GetMyEnrollmentsAsync(Guid userId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns the enrollment record for a specific learning path for the current authenticated learner.
    /// </summary>
    Task<Result<EnrollmentDto>> GetMyEnrollmentForPathAsync(Guid userId, Guid learningPathId, CancellationToken cancellationToken = default);
}
