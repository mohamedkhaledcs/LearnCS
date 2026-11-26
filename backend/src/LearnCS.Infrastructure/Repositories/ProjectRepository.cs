using LearnCS.Application.Contracts.Persistence;
using LearnCS.Domain.Learning;
using LearnCS.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.Infrastructure.Repositories;

public class ProjectRepository(AppDbContext dbContext) : IProjectRepository
{
    public async Task<IReadOnlyList<Project>> GetAllPublishedAsync(CancellationToken cancellationToken = default)
    {
        return await dbContext.Projects
            .AsNoTracking()
            .Where(p => p.Status == ProjectStatus.Published)
            .OrderBy(p => p.Title)
            .ToListAsync(cancellationToken);
    }

    public async Task<Project?> FindByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await dbContext.Projects
            .Include(p => p.ProjectConcepts)
            .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
    }

    public async Task<Project?> FindBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        var normalizedSlug = slug.Trim().ToLowerInvariant();
        return await dbContext.Projects
            .Include(p => p.ProjectConcepts)
            .FirstOrDefaultAsync(p => p.Slug == normalizedSlug, cancellationToken);
    }

    public async Task<ProjectSubmission?> GetUserSubmissionAsync(Guid userId, Guid projectId, CancellationToken cancellationToken = default)
    {
        return await dbContext.ProjectSubmissions
            .Include(ps => ps.Project)
            .FirstOrDefaultAsync(ps => ps.UserId == userId && ps.ProjectId == projectId, cancellationToken);
    }

    public async Task<IReadOnlyList<ProjectSubmission>> GetSubmissionsForUserAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await dbContext.ProjectSubmissions
            .AsNoTracking()
            .Include(ps => ps.Project)
            .Where(ps => ps.UserId == userId)
            .OrderByDescending(ps => ps.SubmittedAt ?? ps.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public void AddSubmission(ProjectSubmission submission)
    {
        dbContext.ProjectSubmissions.Add(submission);
    }
}
