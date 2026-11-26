using LearnCS.Domain.Learning;

namespace LearnCS.Application.Contracts.Persistence;

/// <summary>
/// Persistence contract for Projects, Project Concepts, and Learner Project Submissions.
/// </summary>
public interface IProjectRepository
{
    /// <summary>Returns all published projects in display order.</summary>
    Task<IReadOnlyList<Project>> GetAllPublishedAsync(CancellationToken cancellationToken = default);

    /// <summary>Finds a project by ID including required concepts.</summary>
    Task<Project?> FindByIdAsync(Guid id, CancellationToken cancellationToken = default);

    /// <summary>Finds a project by slug including required concepts.</summary>
    Task<Project?> FindBySlugAsync(string slug, CancellationToken cancellationToken = default);

    /// <summary>Gets the current submission for a user and project.</summary>
    Task<ProjectSubmission?> GetUserSubmissionAsync(Guid userId, Guid projectId, CancellationToken cancellationToken = default);

    /// <summary>Gets all project submissions for a user.</summary>
    Task<IReadOnlyList<ProjectSubmission>> GetSubmissionsForUserAsync(Guid userId, CancellationToken cancellationToken = default);

    /// <summary>Adds a new project submission record.</summary>
    void AddSubmission(ProjectSubmission submission);
}
