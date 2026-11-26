using LearnCS.Application.Common;
using LearnCS.Application.Features.Projects.DTOs;

namespace LearnCS.Application.Features.Projects.Services;

/// <summary>
/// Service contract for Practical Projects discovery and learner project submissions.
/// </summary>
public interface IProjectService
{
    /// <summary>Returns all published projects for learner catalog discovery.</summary>
    Task<Result<IReadOnlyList<ProjectSummaryDto>>> GetPublishedProjectsAsync(CancellationToken cancellationToken = default);

    /// <summary>Returns project details by slug.</summary>
    Task<Result<ProjectDetailsDto>> GetProjectBySlugAsync(string slug, CancellationToken cancellationToken = default);

    /// <summary>Returns project details by ID.</summary>
    Task<Result<ProjectDetailsDto>> GetProjectByIdAsync(Guid projectId, CancellationToken cancellationToken = default);

    /// <summary>Submits or updates a project submission for the authenticated learner.</summary>
    Task<Result<ProjectSubmissionDto>> SubmitProjectAsync(Guid userId, Guid projectId, SubmitProjectRequest request, CancellationToken cancellationToken = default);

    /// <summary>Gets the current submission status for a specific project for the authenticated learner.</summary>
    Task<Result<ProjectSubmissionDto>> GetMySubmissionForProjectAsync(Guid userId, Guid projectId, CancellationToken cancellationToken = default);

    /// <summary>Gets all project submissions for the authenticated learner.</summary>
    Task<Result<IReadOnlyList<ProjectSubmissionDto>>> GetMySubmissionsAsync(Guid userId, CancellationToken cancellationToken = default);
}
