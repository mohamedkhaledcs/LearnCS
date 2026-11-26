using LearnCS.Application.Contracts.Persistence;
using LearnCS.Domain.Learning;
using LearnCS.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.Infrastructure.Repositories;

internal sealed class LearningPathRepository(AppDbContext db) : ILearningPathRepository
{
    // ── Learning Paths ─────────────────────────────────────────────────────────

    public Task<LearningPath?> FindByIdAsync(Guid id, bool trackForUpdate = false, CancellationToken cancellationToken = default)
    {
        var query = db.LearningPaths.AsQueryable();
        if (!trackForUpdate)
            query = query.AsNoTracking();

        return query.FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
    }

    public Task<LearningPath?> FindBySlugAsync(string slug, CancellationToken cancellationToken = default)
        => db.LearningPaths
             .AsNoTracking()
             .FirstOrDefaultAsync(p => p.Slug == slug.ToLowerInvariant(), cancellationToken);

    public Task<LearningPath?> FindByIdWithTracksAsync(Guid id, CancellationToken cancellationToken = default)
        => db.LearningPaths
             .AsNoTracking()
             .Include(p => p.Tracks.OrderBy(t => t.DisplayOrder))
                 .ThenInclude(t => t.Modules.OrderBy(m => m.DisplayOrder))
                     .ThenInclude(m => m.Lessons.OrderBy(l => l.DisplayOrder))
             .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

    public Task<LearningPath?> FindBySlugWithTracksAsync(string slug, CancellationToken cancellationToken = default)
        => db.LearningPaths
             .AsNoTracking()
             .Include(p => p.Tracks.OrderBy(t => t.DisplayOrder))
                 .ThenInclude(t => t.Modules.OrderBy(m => m.DisplayOrder))
                     .ThenInclude(m => m.Lessons.OrderBy(l => l.DisplayOrder))
             .FirstOrDefaultAsync(p => p.Slug == slug.ToLowerInvariant(), cancellationToken);

    public Task<bool> ExistsBySlugAsync(string slug, CancellationToken cancellationToken = default)
        => db.LearningPaths.AnyAsync(p => p.Slug == slug.ToLowerInvariant(), cancellationToken);

    public async Task<IReadOnlyList<LearningPath>> GetAllPublishedAsync(CancellationToken cancellationToken = default)
    {
        return await db.LearningPaths
            .AsNoTracking()
            .Include(p => p.Tracks)
                .ThenInclude(t => t.Modules)
                    .ThenInclude(m => m.Lessons)
            .Where(p => p.Status == LearningPathStatus.Published)
            .OrderBy(p => p.Title)
            .ToListAsync(cancellationToken);
    }

    public void Add(LearningPath learningPath)
        => db.LearningPaths.Add(learningPath);

    // ── Tracks / Modules / Lessons ─────────────────────────────────────────────

    public Task<Track?> FindTrackByIdAsync(Guid trackId, CancellationToken cancellationToken = default)
        => db.Tracks
             .AsNoTracking()
             .FirstOrDefaultAsync(t => t.Id == trackId, cancellationToken);

    public Task<Module?> FindModuleByIdAsync(Guid moduleId, CancellationToken cancellationToken = default)
        => db.Modules
             .AsNoTracking()
             .FirstOrDefaultAsync(m => m.Id == moduleId, cancellationToken);

    public Task<Lesson?> FindLessonByIdAsync(Guid lessonId, CancellationToken cancellationToken = default)
        => db.Lessons
             .AsNoTracking()
             .FirstOrDefaultAsync(l => l.Id == lessonId, cancellationToken);

    public Task<Lesson?> FindLessonBySlugAsync(string slug, CancellationToken cancellationToken = default)
        => db.Lessons
             .AsNoTracking()
             .Where(l => l.Status == LessonStatus.Published)
             .FirstOrDefaultAsync(l => l.Slug == slug.ToLowerInvariant(), cancellationToken);

    public async Task<IReadOnlyList<Lesson>> GetLessonsForModuleAsync(Guid moduleId, CancellationToken cancellationToken = default)
    {
        return await db.Lessons
            .AsNoTracking()
            .Where(l => l.ModuleId == moduleId && l.Status == LessonStatus.Published)
            .OrderBy(l => l.DisplayOrder)
            .ToListAsync(cancellationToken);
    }

    // ── Enrollment ─────────────────────────────────────────────────────────────

    // NOTE: No AsNoTracking, callers update progress via UpdateProgress() domain method then SaveChanges.
    public Task<PathEnrollment?> GetEnrollmentAsync(Guid userId, Guid learningPathId, CancellationToken cancellationToken = default)
        => db.PathEnrollments
             .Include(e => e.LearningPath)
             .FirstOrDefaultAsync(e => e.UserId == userId && e.LearningPathId == learningPathId, cancellationToken);

    public async Task<IReadOnlyList<PathEnrollment>> GetEnrollmentsForUserAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await db.PathEnrollments
            .AsNoTracking()
            .Include(e => e.LearningPath)
            .Where(e => e.UserId == userId && e.Status == EnrollmentStatus.Active)
            .OrderByDescending(e => e.EnrolledAt)
            .ToListAsync(cancellationToken);
    }

    public void AddEnrollment(PathEnrollment enrollment)
        => db.PathEnrollments.Add(enrollment);

    // ── Lesson Progress ────────────────────────────────────────────────────────

    // NOTE: No AsNoTracking, callers invoke Start()/Complete() domain methods then SaveChanges.
    public Task<LessonProgress?> GetLessonProgressAsync(Guid userId, Guid lessonId, CancellationToken cancellationToken = default)
        => db.LessonProgresses
             .FirstOrDefaultAsync(p => p.UserId == userId && p.LessonId == lessonId, cancellationToken);

    public async Task<IReadOnlyList<LessonProgress>> GetModuleProgressAsync(Guid userId, Guid moduleId, CancellationToken cancellationToken = default)
    {
        return await db.LessonProgresses
            .AsNoTracking()
            .Where(p => p.UserId == userId && p.Lesson!.ModuleId == moduleId)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<LessonProgress>> GetUserLessonProgressesAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await db.LessonProgresses
            .AsNoTracking()
            .Include(p => p.Lesson)
            .Where(p => p.UserId == userId)
            .ToListAsync(cancellationToken);
    }

    public Task<int> GetCompletedLessonsCountForUserAsync(Guid userId, CancellationToken cancellationToken = default)
        => db.LessonProgresses
             .AsNoTracking()
             .CountAsync(p => p.UserId == userId && p.Status == LessonProgressStatus.Completed, cancellationToken);

    public void AddLessonProgress(LessonProgress progress)
        => db.LessonProgresses.Add(progress);
}
