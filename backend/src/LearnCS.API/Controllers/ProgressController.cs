using System.Text.Json;
using LearnCS.Application.Features.Progress.DTOs;
using LearnCS.Application.Features.Progress.Services;
using LearnCS.Domain.Assessment;
using LearnCS.Domain.Curriculum;
using LearnCS.Domain.Gamification;
using LearnCS.Domain.Intelligence;
using LearnCS.Domain.Learning;
using LearnCS.Domain.Platform;
using LearnCS.Infrastructure.Persistence;
using LearnCS.Infrastructure.Seeding;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.API.Controllers;

[ApiController]
[Route("api/progress")]
[Authorize]
public class ProgressController(IProgressService progressService, AppDbContext db) : ApiControllerBase
{
    /// <summary>
    /// Retrieves overall progress metrics, learner level, accumulated XP, active streak, and mastered concepts summary for the current authenticated learner.
    /// </summary>
    [HttpGet("summary")]
    [ProducesResponseType(typeof(LearnerProgressSummaryDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetMyProgressSummary(CancellationToken cancellationToken)
    {
        var result = await progressService.GetMyProgressSummaryAsync(GetUserId(), cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves comprehensive database-backed dashboard metrics including unit completion, study time, assessment performance, recent activity, and deduplicated path progress.
    /// </summary>
    [HttpGet("dashboard")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetDashboardOverview(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        var totalXp = await db.UserXpEvents.AsNoTracking().Where(x => x.UserId == userId).SumAsync(x => (long)x.XpAmount, cancellationToken);
        var streak = await db.StudyStreaks.AsNoTracking().FirstOrDefaultAsync(s => s.UserId == userId, cancellationToken);
        var unitProgresses = await db.UserUnitProgresses.AsNoTracking().Where(p => p.UserId == userId).ToListAsync(cancellationToken);
        var legacyCompleted = await db.AuditLogs.AsNoTracking()
            .Where(a => a.UserId == userId && a.Action == "UnitCompleted" && a.NewValuesJson != null)
            .Select(a => a.NewValuesJson!)
            .Distinct()
            .ToListAsync(cancellationToken);

        var completedUnitSet = new HashSet<string>(
            unitProgresses.Where(p => p.Status == UnitProgressStatus.Completed || p.Status == UnitProgressStatus.Mastered).Select(p => p.UnitId),
            StringComparer.OrdinalIgnoreCase);
        foreach (var l in legacyCompleted) completedUnitSet.Add(l.Trim().ToLowerInvariant());

        var publishedUnits = await db.ReusableUnits.AsNoTracking()
            .Where(u => u.PublishStatus == ContentPublishStatus.Published)
            .Select(u => new { u.Id, u.TitleEn, u.TitleAr, u.Difficulty, u.EstimatedMinutes })
            .ToListAsync(cancellationToken);

        var paths = await db.CurriculumPaths.AsNoTracking()
            .Where(p => p.PublishStatus == ContentPublishStatus.Published)
            .OrderBy(p => p.DisplayOrder)
            .Include(p => p.Modules.OrderBy(m => m.DisplayOrder))
                .ThenInclude(m => m.Placements.OrderBy(pl => pl.DisplayOrder))
            .ToListAsync(cancellationToken);

        var totalStudySeconds = unitProgresses.Sum(p => p.TimeSpentSeconds)
            + await db.LessonProgresses.AsNoTracking().Where(l => l.UserId == userId).SumAsync(l => l.TimeSpentSeconds, cancellationToken);

        var unitQuizScores = await db.UnitQuizAttempts.AsNoTracking()
            .Where(a => a.UserId == userId && a.IsCompleted)
            .Select(a => a.Percentage)
            .ToListAsync(cancellationToken);
        var assessmentScores = await db.AssessmentAttempts.AsNoTracking()
            .Where(a => a.UserId == userId && a.Status == AttemptStatus.Completed && a.MaxScore > 0)
            .Select(a => Math.Round(a.Score / a.MaxScore * 100m, 2))
            .ToListAsync(cancellationToken);
        var allScores = unitQuizScores.Concat(assessmentScores).ToList();
        var avgScore = allScores.Count > 0 ? Math.Round(allScores.Average(), 1) : 0m;

        var evaluatedAchievements = await GamificationEvaluator.EvaluateAndSyncAsync(db, userId, cancellationToken);

        var xpEvents = await db.UserXpEvents.AsNoTracking()
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.CreatedAt)
            .Take(8)
            .Select(x => new
            {
                x.Id,
                Type = x.Source,
                Note = x.Note ?? x.Source,
                x.XpAmount,
                x.CreatedAt
            })
            .ToListAsync(cancellationToken);

        var pathSummaries = paths.Select(p =>
        {
            var unitIds = p.Modules.OrderBy(m => m.DisplayOrder)
                .SelectMany(m => m.Placements.OrderBy(pl => pl.DisplayOrder))
                .Select(pl => pl.UnitId)
                .Distinct()
                .ToList();
            var done = unitIds.Count(completedUnitSet.Contains);
            var nextUnitId = unitIds.FirstOrDefault(id => !completedUnitSet.Contains(id));
            return new
            {
                p.Id,
                Title = new { en = p.TitleEn, ar = p.TitleAr },
                p.Category,
                TotalUnits = unitIds.Count,
                CompletedUnits = done,
                ProgressPercent = unitIds.Count > 0 ? Math.Round((decimal)done / unitIds.Count * 100m, 1) : 0m,
                NextUnitId = nextUnitId
            };
        }).ToList();

        var levelRecord = await db.LearnerLevelRecords
            .AsNoTracking()
            .Where(r => r.UserId == userId)
            .OrderByDescending(r => r.EvaluatedAt)
            .FirstOrDefaultAsync(cancellationToken);

        JsonElement? latestDiagnostic = null;
        if (!string.IsNullOrWhiteSpace(levelRecord?.SummaryJson))
        {
            try
            {
                latestDiagnostic = JsonSerializer.Deserialize<JsonElement>(levelRecord.SummaryJson);
            }
            catch
            {
                latestDiagnostic = null;
            }
        }

        var level = totalXp switch
        {
            >= 2000 => "Expert",
            >= 1000 => "Advanced",
            >= 400 => "Intermediate",
            >= 150 => "Elementary",
            _ => "Beginner"
        };

        return Ok(new
        {
            TotalXp = totalXp,
            Level = level,
            CurrentStreak = streak?.CurrentStreak ?? 0,
            LongestStreak = streak?.LongestStreak ?? 0,
            CompletedUnitsCount = completedUnitSet.Count,
            TotalUnitsCount = publishedUnits.Count,
            CompletedUnitIds = completedUnitSet.OrderBy(x => x).ToList(),
            TotalStudySeconds = totalStudySeconds,
            AssessmentsCompleted = allScores.Count,
            AverageAssessmentScore = avgScore,
            UnlockedAchievementsCount = evaluatedAchievements.Count(a => a.Unlocked),
            TotalAchievementsCount = evaluatedAchievements.Count,
            RecentActivity = xpEvents,
            PathSummaries = pathSummaries,
            LatestDiagnostic = latestDiagnostic,
            DiagnosticEvaluatedAt = levelRecord?.EvaluatedAt
        });
    }

    /// <summary>
    /// Records lesson completion, updates course enrollment completion percentage, awards XP, and updates concept mastery for the current authenticated learner.
    /// </summary>
    [HttpPost("lessons/complete")]
    [ProducesResponseType(typeof(RecordLessonProgressResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> CompleteLesson(
        [FromBody] RecordLessonProgressRequest request,
        CancellationToken cancellationToken)
    {
        var result = await progressService.RecordLessonProgressAsync(GetUserId(), request, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves concept mastery scores and confidence metrics for all evaluated concepts for the current authenticated learner.
    /// </summary>
    [HttpGet("mastery")]
    [ProducesResponseType(typeof(IReadOnlyList<ConceptMasteryItemDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetMyConceptMastery(CancellationToken cancellationToken)
    {
        var result = await progressService.GetMyConceptMasteryAsync(GetUserId(), cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves lesson-by-lesson progress details for a specific learning path for the current authenticated learner.
    /// </summary>
    [HttpGet("paths/{pathId:guid}")]
    [ProducesResponseType(typeof(PathProgressDetailsDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetPathProgress(
        [FromRoute] Guid pathId,
        CancellationToken cancellationToken)
    {
        var result = await progressService.GetPathProgressAsync(GetUserId(), pathId, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Records completion of a reusable learning unit in the persistent database.
    /// Units with mapped mastery quizzes require passing the final quiz before completion.
    /// </summary>
    [HttpPost("units/complete")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CompleteUnit(
        [FromBody] CompleteUnitRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();
        if (string.IsNullOrWhiteSpace(request.UnitId)) return BadRequest(new { message = "UnitId is required." });

        var normalizedUnitId = request.UnitId.Trim().ToLowerInvariant();
        var hasMappedQuiz = await db.UnitQuestionMappings.AnyAsync(m => m.UnitId == normalizedUnitId, cancellationToken);
        if (hasMappedQuiz)
        {
            var hasPassedQuiz = await db.UnitQuizAttempts.AnyAsync(
                a => a.UserId == userId && a.Scope == "unit" && a.ScopeId == normalizedUnitId && a.IsCompleted && a.Passed,
                cancellationToken);
            var isAdmin = User.IsInRole("Admin") || User.IsInRole("SuperAdmin");
            if (!hasPassedQuiz && !isAdmin)
            {
                return BadRequest(new
                {
                    code = "QUIZ_REQUIRED",
                    message = "Pass the unit mastery quiz before marking this unit as completed."
                });
            }
        }

        var progress = await db.UserUnitProgresses
            .FirstOrDefaultAsync(p => p.UserId == userId && p.UnitId == normalizedUnitId, cancellationToken);
        var alreadyCompleted = progress != null &&
            (progress.Status == UnitProgressStatus.Completed || progress.Status == UnitProgressStatus.Mastered);

        if (progress == null)
        {
            progress = UserUnitProgress.Create(userId, normalizedUnitId);
            db.UserUnitProgresses.Add(progress);
        }
        progress.MarkCompleted(request.Score, request.TimeSpentSeconds);

        if (!alreadyCompleted)
        {
            db.UserXpEvents.Add(UserXpEvent.Create(userId, 50, "UnitCompleted", null, $"Completed unit: {normalizedUnitId}"));
            db.AuditLogs.Add(AuditLog.Create("UnitCompleted", "ReusableUnit", userId, newValues: normalizedUnitId));
        }

        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var streak = await db.StudyStreaks.FirstOrDefaultAsync(s => s.UserId == userId, cancellationToken);
        if (streak == null)
        {
            streak = StudyStreak.Create(userId);
            db.StudyStreaks.Add(streak);
        }
        streak.RecordStudy(today);

        await db.SaveChangesAsync(cancellationToken);
        await GamificationEvaluator.EvaluateAndSyncAsync(db, userId, cancellationToken);

        return Ok(new { UnitId = normalizedUnitId, Status = "completed", XpAwarded = alreadyCompleted ? 0 : 50 });
    }

    /// <summary>
    /// Retrieves all completed reusable unit IDs for the authenticated learner (canonical across all paths).
    /// </summary>
    [HttpGet("units")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCompletedUnits(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        var canonicalIds = await db.UserUnitProgresses
            .AsNoTracking()
            .Where(p => p.UserId == userId && (p.Status == UnitProgressStatus.Completed || p.Status == UnitProgressStatus.Mastered))
            .Select(p => p.UnitId)
            .ToListAsync(cancellationToken);

        var legacyIds = await db.AuditLogs
            .AsNoTracking()
            .Where(a => a.UserId == userId && a.Action == "UnitCompleted" && a.NewValuesJson != null)
            .Select(a => a.NewValuesJson!)
            .ToListAsync(cancellationToken);

        var unitIds = canonicalIds
            .Concat(legacyIds.Select(x => x.Trim().ToLowerInvariant()))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .OrderBy(x => x)
            .ToList();

        return Ok(unitIds);
    }

    /// <summary>
    /// Saves or refreshes the learner's diagnostic skill assessment snapshot and personalized domain/path breakdown.
    /// </summary>
    [HttpPost("diagnostic")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> SaveDiagnosticResult(
        [FromBody] SaveDiagnosticResultRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();
        if (request == null || string.IsNullOrWhiteSpace(request.SessionId) || string.IsNullOrWhiteSpace(request.ResultJson))
        {
            return BadRequest(new { message = "SessionId and ResultJson are required." });
        }

        var normalizedSession = request.SessionId.Trim();
        var existingRecord = await db.LearnerLevelRecords
            .FirstOrDefaultAsync(r => r.UserId == userId, cancellationToken);

        var xpTotal = await db.UserXpEvents.AsNoTracking()
            .Where(x => x.UserId == userId)
            .SumAsync(x => (long)x.XpAmount, cancellationToken);

        var mappedLevel = request.RecommendedLevel?.ToLowerInvariant() switch
        {
            "advanced" => LearnerLevel.Advanced,
            "intermediate" => LearnerLevel.Intermediate,
            _ => LearnerLevel.Beginner
        };

        if (existingRecord == null)
        {
            existingRecord = LearnerLevelRecord.Create(userId);
            db.LearnerLevelRecords.Add(existingRecord);
        }
        existingRecord.Update(mappedLevel, xpTotal, Math.Clamp(request.Percentage, 0m, 100m), request.ResultJson);

        var alreadyLogged = await db.UnitQuizAttempts.AnyAsync(
            a => a.UserId == userId && a.Scope == "diagnostic" && a.ScopeId == normalizedSession,
            cancellationToken);
        if (!alreadyLogged)
        {
            var attempt = UnitQuizAttempt.Create(userId, "diagnostic", normalizedSession, "[]", 50m);
            attempt.Complete(request.OverallScore, Math.Max(1m, request.MaxScore));
            db.UnitQuizAttempts.Add(attempt);
            db.UserXpEvents.Add(UserXpEvent.Create(userId, 25, "DiagnosticCompleted", null, $"Completed diagnostic assessment ({request.Percentage}%)"));
            db.AuditLogs.Add(AuditLog.Create("DiagnosticCompleted", "LearnerLevelRecord", userId, newValues: normalizedSession));
        }

        await db.SaveChangesAsync(cancellationToken);

        return Ok(new
        {
            Saved = true,
            SessionId = normalizedSession,
            RecommendedLevel = mappedLevel.ToString(),
            OverallMasteryScore = request.Percentage,
            EvaluatedAt = existingRecord.EvaluatedAt
        });
    }

    /// <summary>
    /// Retrieves the latest persisted diagnostic skill breakdown for the authenticated learner.
    /// </summary>
    [HttpGet("diagnostic/latest")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetLatestDiagnostic(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        var record = await db.LearnerLevelRecords.AsNoTracking()
            .Where(r => r.UserId == userId)
            .OrderByDescending(r => r.EvaluatedAt)
            .FirstOrDefaultAsync(cancellationToken);

        if (record == null || string.IsNullOrWhiteSpace(record.SummaryJson))
        {
            return Ok(new { HasDiagnostic = false, Result = (object?)null });
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<JsonElement>(record.SummaryJson);
            return Ok(new
            {
                HasDiagnostic = true,
                EvaluatedAt = record.EvaluatedAt,
                Level = record.Level.ToString(),
                Result = parsed
            });
        }
        catch
        {
            return Ok(new { HasDiagnostic = false, Result = (object?)null });
        }
    }
}

public record CompleteUnitRequest(string UnitId, int Score = 100, int TimeSpentSeconds = 0);
public record SaveDiagnosticResultRequest(
    string SessionId,
    decimal OverallScore,
    decimal MaxScore,
    decimal Percentage,
    string? RecommendedLevel,
    string ResultJson);
