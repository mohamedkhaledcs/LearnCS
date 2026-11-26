using LearnCS.Application.Contracts.Persistence;
using LearnCS.Domain.Career;
using LearnCS.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.Infrastructure.Repositories;

internal sealed class CareerRepository(AppDbContext db) : ICareerRepository
{
    // ── Career Catalogue ───────────────────────────────────────────────────────

    public async Task<IReadOnlyList<CareerProfile>> GetAllActiveProfilesAsync(CancellationToken cancellationToken = default)
    {
        return await db.CareerProfiles
            .AsNoTracking()
            .Where(p => p.IsActive)
            .OrderBy(p => p.Name)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<CareerQuestion>> GetAllActiveQuestionsWithOptionsAsync(CancellationToken cancellationToken = default)
    {
        return await db.CareerQuestions
            .AsNoTracking()
            .Where(q => q.IsActive)
            .Include(q => q.Options.OrderBy(o => o.DisplayOrder))
                .ThenInclude(o => o.Scores)
            .OrderBy(q => q.DisplayOrder)
            .ToListAsync(cancellationToken);
    }

    // ── Attempts ───────────────────────────────────────────────────────────────

    public Task<CareerAssessmentAttempt?> FindAttemptByIdAsync(Guid attemptId, bool trackForUpdate = false, CancellationToken cancellationToken = default)
    {
        var query = db.CareerAssessmentAttempts.AsQueryable();
        if (!trackForUpdate)
            query = query.AsNoTracking();

        return query
            .Include(a => a.Responses)
            .Include(a => a.Recommendations)
                .ThenInclude(r => r.CareerProfile)
            .FirstOrDefaultAsync(a => a.Id == attemptId, cancellationToken);
    }

    public Task<CareerAssessmentAttempt?> GetLatestAttemptForUserAsync(Guid userId, CancellationToken cancellationToken = default)
        => db.CareerAssessmentAttempts
             .AsNoTracking()
             .Include(a => a.Responses)
             .Include(a => a.Recommendations)
                 .ThenInclude(r => r.CareerProfile)
             .Where(a => a.UserId == userId)
             .OrderByDescending(a => a.StartedAt)
             .FirstOrDefaultAsync(cancellationToken);

    public void AddAttempt(CareerAssessmentAttempt attempt)
        => db.CareerAssessmentAttempts.Add(attempt);

    public void AddAnswerResponse(CareerAnswerResponse response)
        => db.CareerAnswerResponses.Add(response);

    // ── Recommendations ────────────────────────────────────────────────────────

    public async Task<IReadOnlyList<CareerRecommendation>> GetRecommendationsForAttemptAsync(Guid attemptId, CancellationToken cancellationToken = default)
    {
        return await db.CareerRecommendations
            .AsNoTracking()
            .Include(r => r.CareerProfile)
            .Where(r => r.AttemptId == attemptId)
            .OrderBy(r => r.Rank)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<CareerRecommendation>> GetLatestRecommendationsForUserAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var latestAttemptId = await db.CareerAssessmentAttempts
            .AsNoTracking()
            .Where(a => a.UserId == userId && a.Status == CareerAttemptStatus.Completed)
            .OrderByDescending(a => a.CompletedAt)
            .Select(a => (Guid?)a.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (!latestAttemptId.HasValue)
            return Array.Empty<CareerRecommendation>();

        return await db.CareerRecommendations
            .AsNoTracking()
            .Include(r => r.CareerProfile)
            .Where(r => r.AttemptId == latestAttemptId.Value)
            .OrderBy(r => r.Rank)
            .ToListAsync(cancellationToken);
    }

    public void AddRecommendations(IEnumerable<CareerRecommendation> recommendations)
        => db.CareerRecommendations.AddRange(recommendations);
}
