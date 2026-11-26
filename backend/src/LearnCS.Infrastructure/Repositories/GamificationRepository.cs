using LearnCS.Application.Contracts.Persistence;
using LearnCS.Domain.Gamification;
using LearnCS.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.Infrastructure.Repositories;

internal sealed class GamificationRepository(AppDbContext db) : IGamificationRepository
{
    // ── Achievements ───────────────────────────────────────────────────────────

    public async Task<IReadOnlyList<Achievement>> GetAllActiveAchievementsAsync(CancellationToken cancellationToken = default)
    {
        return await db.Achievements
            .AsNoTracking()
            .Where(a => a.IsActive)
            .Include(a => a.Badge)
            .OrderBy(a => a.Name)
            .ToListAsync(cancellationToken);
    }

    public Task<Achievement?> GetByTriggerAsync(AchievementTrigger trigger, CancellationToken cancellationToken = default)
        => db.Achievements
             .AsNoTracking()
             .Include(a => a.Badge)
             .FirstOrDefaultAsync(a => a.TriggerType == trigger && a.IsActive, cancellationToken);

    public async Task<IReadOnlyList<UserAchievement>> GetUserAchievementsAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await db.UserAchievements
            .AsNoTracking()
            .Where(ua => ua.UserId == userId)
            .Include(ua => ua.Achievement)
                .ThenInclude(a => a!.Badge)
            .OrderByDescending(ua => ua.EarnedAt)
            .ToListAsync(cancellationToken);
    }

    public Task<bool> HasAchievementAsync(Guid userId, Guid achievementId, CancellationToken cancellationToken = default)
        => db.UserAchievements.AnyAsync(ua => ua.UserId == userId && ua.AchievementId == achievementId, cancellationToken);

    public void AddUserAchievement(UserAchievement userAchievement)
        => db.UserAchievements.Add(userAchievement);

    // ── XP ─────────────────────────────────────────────────────────────────────

    public async Task<long> GetTotalXpAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await db.UserXpEvents
            .Where(e => e.UserId == userId)
            .SumAsync(e => (long)e.XpAmount, cancellationToken);
    }

    public void AddXpEvent(UserXpEvent xpEvent)
        => db.UserXpEvents.Add(xpEvent);

    // ── Study Streak ───────────────────────────────────────────────────────────

    public Task<StudyStreak?> GetStreakAsync(Guid userId, CancellationToken cancellationToken = default)
        => db.StudyStreaks
             .FirstOrDefaultAsync(s => s.UserId == userId, cancellationToken);

    public void AddStreak(StudyStreak streak)
        => db.StudyStreaks.Add(streak);
}
