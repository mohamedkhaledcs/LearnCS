using LearnCS.Domain.Gamification;

namespace LearnCS.Application.Contracts.Persistence;

/// <summary>
/// Persistence contract for the Gamification domain, /// achievements, XP events, and study streaks.
/// </summary>
public interface IGamificationRepository
{
    // ── Achievements ───────────────────────────────────────────────────────────

    /// <summary>Returns all active achievement definitions.</summary>
    Task<IReadOnlyList<Achievement>> GetAllActiveAchievementsAsync(CancellationToken cancellationToken = default);

    /// <summary>Returns the achievement triggered by a specific event type, if one exists.</summary>
    Task<Achievement?> GetByTriggerAsync(AchievementTrigger trigger, CancellationToken cancellationToken = default);

    /// <summary>Returns the achievements a user has already earned.</summary>
    Task<IReadOnlyList<UserAchievement>> GetUserAchievementsAsync(Guid userId, CancellationToken cancellationToken = default);

    /// <summary>Returns true if a user has already been awarded a specific achievement.</summary>
    Task<bool> HasAchievementAsync(Guid userId, Guid achievementId, CancellationToken cancellationToken = default);

    void AddUserAchievement(UserAchievement userAchievement);

    // ── XP ─────────────────────────────────────────────────────────────────────

    /// <summary>Returns the total XP accumulated by a user across all events.</summary>
    Task<long> GetTotalXpAsync(Guid userId, CancellationToken cancellationToken = default);

    void AddXpEvent(UserXpEvent xpEvent);

    // ── Study Streak ───────────────────────────────────────────────────────────

    Task<StudyStreak?> GetStreakAsync(Guid userId, CancellationToken cancellationToken = default);
    void AddStreak(StudyStreak streak);
}
