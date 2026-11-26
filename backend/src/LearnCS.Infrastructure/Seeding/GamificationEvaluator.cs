using LearnCS.Domain.Assessment;
using LearnCS.Domain.Curriculum;
using LearnCS.Domain.Gamification;
using LearnCS.Domain.Learning;
using LearnCS.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.Infrastructure.Seeding;

public sealed record EvaluatedAchievementDto(
    Guid Id,
    string Code,
    string Name,
    string? TitleAr,
    string Description,
    string? DescriptionAr,
    string Category,
    int Threshold,
    int CurrentProgress,
    int XpReward,
    bool Unlocked,
    DateTime? EarnedAt
);

/// <summary>
/// Single source of truth for evaluating and awarding learner achievements from persistent DB activity.
/// </summary>
public static class GamificationEvaluator
{
    public static async Task<IReadOnlyList<EvaluatedAchievementDto>> EvaluateAndSyncAsync(
        AppDbContext db,
        Guid userId,
        CancellationToken cancellationToken = default)
    {
        var achievements = await db.Achievements
            .Where(a => a.IsActive)
            .OrderBy(a => a.Threshold)
            .ThenBy(a => a.Name)
            .ToListAsync(cancellationToken);

        var existingEarned = await db.UserAchievements
            .Where(ua => ua.UserId == userId)
            .ToListAsync(cancellationToken);
        var earnedByAchievementId = existingEarned.ToDictionary(ua => ua.AchievementId, ua => ua.EarnedAt);

        var completedUnitsCount = await db.UserUnitProgresses
            .CountAsync(p => p.UserId == userId && (p.Status == UnitProgressStatus.Completed || p.Status == UnitProgressStatus.Mastered), cancellationToken);
        var completedUnitIds = await db.UserUnitProgresses
            .Where(p => p.UserId == userId && (p.Status == UnitProgressStatus.Completed || p.Status == UnitProgressStatus.Mastered))
            .Select(p => p.UnitId)
            .ToListAsync(cancellationToken);
        var legacyCompletedUnitIds = await db.AuditLogs
            .Where(a => a.UserId == userId && a.Action == "UnitCompleted" && a.NewValuesJson != null)
            .Select(a => a.NewValuesJson!)
            .Distinct()
            .ToListAsync(cancellationToken);

        var allCompletedUnitSet = new HashSet<string>(completedUnitIds, StringComparer.OrdinalIgnoreCase);
        foreach (var legacyId in legacyCompletedUnitIds) allCompletedUnitSet.Add(legacyId.Trim().ToLowerInvariant());

        var effectiveCompletedUnits = Math.Max(completedUnitsCount, allCompletedUnitSet.Count);
        var completedLessonsCount = await db.LessonProgresses
            .CountAsync(p => p.UserId == userId && p.Status == LessonProgressStatus.Completed, cancellationToken);
        var effectiveFirstLessons = Math.Max(effectiveCompletedUnits, completedLessonsCount);

        var unitQuizMaxScore = await db.UnitQuizAttempts
            .Where(a => a.UserId == userId && a.IsCompleted)
            .Select(a => (decimal?)a.Percentage)
            .MaxAsync(cancellationToken) ?? 0m;

        var completedAssessments = await db.AssessmentAttempts
            .CountAsync(a => a.UserId == userId && a.Status == AttemptStatus.Completed, cancellationToken);
        var completedUnitQuizzes = await db.UnitQuizAttempts
            .CountAsync(a => a.UserId == userId && a.IsCompleted && a.Passed, cancellationToken);
        var effectiveAssessments = completedAssessments + completedUnitQuizzes;

        var streak = await db.StudyStreaks.FirstOrDefaultAsync(s => s.UserId == userId, cancellationToken);
        var bestStreak = Math.Max(streak?.CurrentStreak ?? 0, streak?.LongestStreak ?? 0);

        var completedPathsCount = 0;
        var paths = await db.CurriculumPaths
            .Include(p => p.Modules)
                .ThenInclude(m => m.Placements)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
        foreach (var path in paths)
        {
            var pathUnitIds = path.Modules.SelectMany(m => m.Placements).Select(pl => pl.UnitId).Distinct().ToList();
            if (pathUnitIds.Count > 0 && pathUnitIds.All(id => allCompletedUnitSet.Contains(id)))
            {
                completedPathsCount++;
            }
        }
        var enrolledCompletedPaths = await db.PathEnrollments
            .CountAsync(e => e.UserId == userId && e.ProgressPercent >= 100m, cancellationToken);
        completedPathsCount = Math.Max(completedPathsCount, enrolledCompletedPaths);

        var projectsCount = await db.ProjectSubmissions.CountAsync(p => p.UserId == userId, cancellationToken);
        var careerCount = await db.CareerAssessmentAttempts.CountAsync(c => c.UserId == userId, cancellationToken);

        var newlyAdded = false;
        var results = new List<EvaluatedAchievementDto>(achievements.Count);

        foreach (var ach in achievements)
        {
            var code = string.IsNullOrWhiteSpace(ach.Code)
                ? ach.Name.ToLowerInvariant().Replace(" ", "_")
                : ach.Code;

            var threshold = Math.Max(1, ach.Threshold);
            int currentProgress = code switch
            {
                "first_unit" or "first_lesson" => effectiveFirstLessons,
                "three_units" or "ten_units" or "twentyfive_units" => effectiveCompletedUnits,
                "quiz_ace" => (int)Math.Round(unitQuizMaxScore),
                "first_assessment" => effectiveAssessments,
                "streak_3" or "streak_7" or "streak_30" => bestStreak,
                "path_graduate" or "path_complete" => completedPathsCount,
                "builder" => projectsCount,
                "career_discoverer" => careerCount,
                _ => ach.TriggerType switch
                {
                    AchievementTrigger.FirstLesson => effectiveFirstLessons,
                    AchievementTrigger.FirstAssessment => effectiveAssessments,
                    AchievementTrigger.StreakDays7 => bestStreak,
                    AchievementTrigger.StreakDays30 => bestStreak,
                    AchievementTrigger.PathCompleted => completedPathsCount,
                    AchievementTrigger.ProjectSubmitted => projectsCount,
                    AchievementTrigger.CareerAssessmentCompleted => careerCount,
                    AchievementTrigger.ConceptMastered => effectiveCompletedUnits,
                    _ => effectiveCompletedUnits
                }
            };

            var shouldUnlock = currentProgress >= threshold;
            if (shouldUnlock && !earnedByAchievementId.ContainsKey(ach.Id))
            {
                var ua = UserAchievement.Create(userId, ach.Id);
                db.UserAchievements.Add(ua);
                earnedByAchievementId[ach.Id] = ua.EarnedAt;

                if (ach.XpReward > 0)
                {
                    db.UserXpEvents.Add(UserXpEvent.Create(
                        userId,
                        ach.XpReward,
                        "AchievementUnlocked",
                        ach.Id,
                        $"Unlocked achievement: {ach.Name}"
                    ));
                }
                newlyAdded = true;
            }

            var unlocked = earnedByAchievementId.TryGetValue(ach.Id, out var earnedAt);
            results.Add(new EvaluatedAchievementDto(
                ach.Id,
                code,
                ach.Name,
                ach.TitleAr,
                ach.Description,
                ach.DescriptionAr,
                ach.Category ?? "General",
                threshold,
                Math.Min(currentProgress, threshold),
                ach.XpReward,
                unlocked,
                unlocked ? earnedAt : null
            ));
        }

        if (newlyAdded)
        {
            await db.SaveChangesAsync(cancellationToken);
        }

        return results;
    }
}
