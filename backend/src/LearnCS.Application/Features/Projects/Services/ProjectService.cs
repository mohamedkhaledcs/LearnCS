using LearnCS.Application.Common;
using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.Projects.DTOs;
using LearnCS.Domain.Learning;

namespace LearnCS.Application.Features.Projects.Services;

public class ProjectService(
    IProjectRepository projectRepository,
    IUserRepository userRepository,
    IUnitOfWork unitOfWork) : IProjectService
{
    public async Task<Result<IReadOnlyList<ProjectSummaryDto>>> GetPublishedProjectsAsync(CancellationToken cancellationToken = default)
    {
        var projects = await projectRepository.GetAllPublishedAsync(cancellationToken);
        var dtos = projects
            .Select(p => new ProjectSummaryDto(p.Id, p.Title, p.Slug, p.Description, p.Difficulty.ToString(), p.EstimatedHours, p.Status.ToString()))
            .ToList();

        return Result<IReadOnlyList<ProjectSummaryDto>>.Success(dtos);
    }

    public async Task<Result<ProjectDetailsDto>> GetProjectBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return Result<ProjectDetailsDto>.Failure("Invalid project slug.", "INVALID_INPUT");
        }

        var project = await projectRepository.FindBySlugAsync(slug, cancellationToken);
        if (project == null || project.Status != ProjectStatus.Published)
        {
            return Result<ProjectDetailsDto>.Failure($"Project '{slug}' not found.", "NOT_FOUND");
        }

        return Result<ProjectDetailsDto>.Success(MapToDetailsDto(project));
    }

    public async Task<Result<ProjectDetailsDto>> GetProjectByIdAsync(Guid projectId, CancellationToken cancellationToken = default)
    {
        if (projectId == Guid.Empty)
        {
            return Result<ProjectDetailsDto>.Failure("Invalid project identifier.", "INVALID_INPUT");
        }

        var project = await projectRepository.FindByIdAsync(projectId, cancellationToken);
        if (project == null || project.Status != ProjectStatus.Published)
        {
            return Result<ProjectDetailsDto>.Failure("Project not found.", "NOT_FOUND");
        }

        return Result<ProjectDetailsDto>.Success(MapToDetailsDto(project));
    }

    public async Task<Result<ProjectSubmissionDto>> SubmitProjectAsync(Guid userId, Guid projectId, SubmitProjectRequest request, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<ProjectSubmissionDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var user = await userRepository.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            return Result<ProjectSubmissionDto>.Failure("User account not found.", "USER_NOT_FOUND");
        }

        var project = await projectRepository.FindByIdAsync(projectId, cancellationToken);
        if (project == null || project.Status != ProjectStatus.Published)
        {
            return Result<ProjectSubmissionDto>.Failure("Cannot submit to an unpublished or invalid project.", "NOT_FOUND");
        }

        var submission = await projectRepository.GetUserSubmissionAsync(userId, projectId, cancellationToken);
        if (submission == null)
        {
            submission = ProjectSubmission.Create(userId, projectId);
            submission.Submit(request.RepositoryUrl?.Trim(), request.LiveUrl?.Trim(), request.Notes?.Trim());
            projectRepository.AddSubmission(submission);
        }
        else
        {
            submission.Submit(request.RepositoryUrl?.Trim(), request.LiveUrl?.Trim(), request.Notes?.Trim());
        }

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<ProjectSubmissionDto>.Success(MapToSubmissionDto(submission, project));
    }

    public async Task<Result<ProjectSubmissionDto>> GetMySubmissionForProjectAsync(Guid userId, Guid projectId, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<ProjectSubmissionDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var submission = await projectRepository.GetUserSubmissionAsync(userId, projectId, cancellationToken);
        if (submission == null)
        {
            return Result<ProjectSubmissionDto>.Failure("No submission found for this project.", "NOT_FOUND");
        }

        var project = submission.Project ?? await projectRepository.FindByIdAsync(projectId, cancellationToken);

        return Result<ProjectSubmissionDto>.Success(MapToSubmissionDto(submission, project));
    }

    public async Task<Result<IReadOnlyList<ProjectSubmissionDto>>> GetMySubmissionsAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<IReadOnlyList<ProjectSubmissionDto>>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var submissions = await projectRepository.GetSubmissionsForUserAsync(userId, cancellationToken);
        var dtos = submissions
            .Select(s => MapToSubmissionDto(s, s.Project))
            .ToList();

        return Result<IReadOnlyList<ProjectSubmissionDto>>.Success(dtos);
    }

    private static ProjectDetailsDto MapToDetailsDto(Project project)
    {
        var requiredConceptIds = project.ProjectConcepts
            .Where(pc => pc.IsRequired)
            .Select(pc => pc.ConceptId)
            .ToList();

        return new ProjectDetailsDto(
            project.Id,
            project.Title,
            project.Slug,
            project.Description,
            project.Difficulty.ToString(),
            project.Instructions,
            project.EstimatedHours,
            project.Status.ToString(),
            requiredConceptIds
        );
    }

    private static ProjectSubmissionDto MapToSubmissionDto(ProjectSubmission submission, Project? project)
    {
        return new ProjectSubmissionDto(
            submission.Id,
            submission.UserId,
            submission.ProjectId,
            project?.Title ?? "Project",
            submission.Status.ToString(),
            submission.RepositoryUrl,
            submission.LiveUrl,
            submission.Notes,
            submission.FeedbackNotes,
            submission.SubmittedAt,
            submission.ReviewedAt
        );
    }
}
