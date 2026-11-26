using LearnCS.Application.Contracts.Persistence;
using LearnCS.Domain.Assessment;
using LearnCS.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.Infrastructure.Repositories;

internal sealed class AssessmentRepository(AppDbContext db) : IAssessmentRepository
{
    // ── Assessments ────────────────────────────────────────────────────────────

    public Task<Assessment?> FindByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => db.Assessments
             .AsNoTracking()
             .FirstOrDefaultAsync(a => a.Id == id, cancellationToken);

    public Task<Assessment?> FindByIdWithQuestionsAsync(Guid id, CancellationToken cancellationToken = default)
        => db.Assessments
             .AsNoTracking()
             .Include(a => a.AssessmentQuestions.OrderBy(aq => aq.DisplayOrder))
                 .ThenInclude(aq => aq.Question)
                     .ThenInclude(q => q!.Options.OrderBy(o => o.DisplayOrder))
             .FirstOrDefaultAsync(a => a.Id == id && a.Status == AssessmentStatus.Published, cancellationToken);

    public async Task<IReadOnlyList<Assessment>> GetAllPublishedAsync(CancellationToken cancellationToken = default)
    {
        return await db.Assessments
            .AsNoTracking()
            .Include(a => a.AssessmentQuestions)
            .Where(a => a.Status == AssessmentStatus.Published)
            .OrderBy(a => a.Title)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Assessment>> GetPublishedByTypeAsync(AssessmentType type, CancellationToken cancellationToken = default)
    {
        return await db.Assessments
            .AsNoTracking()
            .Include(a => a.AssessmentQuestions)
            .Where(a => a.Type == type && a.Status == AssessmentStatus.Published)
            .OrderBy(a => a.Title)
            .ToListAsync(cancellationToken);
    }

    // ── Assessment Attempts ────────────────────────────────────────────────────

    public Task<AssessmentAttempt?> FindAttemptByIdAsync(Guid attemptId, bool trackForUpdate = false, CancellationToken cancellationToken = default)
    {
        var query = db.AssessmentAttempts.AsQueryable();
        if (!trackForUpdate)
            query = query.AsNoTracking();

        return query.FirstOrDefaultAsync(a => a.Id == attemptId, cancellationToken);
    }

    // NOTE: No AsNoTracking, callers call Complete()/Abandon() on the attempt then SaveChanges.
    public Task<AssessmentAttempt?> FindAttemptByIdWithAnswersAsync(Guid attemptId, CancellationToken cancellationToken = default)
        => db.AssessmentAttempts
             .Include(a => a.Answers)
             .FirstOrDefaultAsync(a => a.Id == attemptId, cancellationToken);

    public Task<AssessmentAttempt?> FindAttemptByIdWithDetailsAsync(Guid attemptId, CancellationToken cancellationToken = default)
        => db.AssessmentAttempts
             .Include(a => a.Assessment)
                 .ThenInclude(ast => ast!.AssessmentQuestions.OrderBy(aq => aq.DisplayOrder))
                     .ThenInclude(aq => aq.Question)
                         .ThenInclude(q => q!.Options.OrderBy(o => o.DisplayOrder))
             .Include(a => a.Answers)
             .FirstOrDefaultAsync(a => a.Id == attemptId, cancellationToken);

    public Task<AssessmentAttempt?> GetLatestAttemptAsync(Guid userId, Guid assessmentId, CancellationToken cancellationToken = default)
        => db.AssessmentAttempts
             .AsNoTracking()
             .Where(a => a.UserId == userId && a.AssessmentId == assessmentId)
             .OrderByDescending(a => a.StartedAt)
             .FirstOrDefaultAsync(cancellationToken);

    public async Task<IReadOnlyList<AssessmentAttempt>> GetAttemptsForUserAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await db.AssessmentAttempts
            .AsNoTracking()
            .Include(a => a.Assessment)
            .Where(a => a.UserId == userId && a.Status == AttemptStatus.Completed)
            .OrderByDescending(a => a.CompletedAt)
            .ToListAsync(cancellationToken);
    }

    public void AddAttempt(AssessmentAttempt attempt)
        => db.AssessmentAttempts.Add(attempt);

    public void AddAnswer(AttemptAnswer answer)
        => db.AttemptAnswers.Add(answer);
}
