using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;
using LearnCS.Domain.Curriculum;
using LearnCS.Domain.Gamification;
using LearnCS.Domain.Intelligence;
using LearnCS.Domain.Platform;
using LearnCS.Domain.Subscriptions;
using LearnCS.Infrastructure.Persistence;
using LearnCS.Infrastructure.Seeding;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.API.Controllers;

[ApiController]
[Route("api/curriculum")]
public class CurriculumController(AppDbContext db) : ApiControllerBase
{
    private static readonly JsonSerializerOptions JsonOpts = new()
    {
        PropertyNameCaseInsensitive = true
    };

    private static T? TryDeserialize<T>(string? json) where T : class
    {
        if (string.IsNullOrWhiteSpace(json)) return null;
        try { return JsonSerializer.Deserialize<T>(json, JsonOpts); }
        catch { return null; }
    }

    private async Task<HashSet<string>> GetCompletedUnitSetAsync(Guid userId, CancellationToken cancellationToken)
    {
        if (userId == Guid.Empty) return [];

        var canonical = await db.UserUnitProgresses
            .AsNoTracking()
            .Where(p => p.UserId == userId && (p.Status == UnitProgressStatus.Completed || p.Status == UnitProgressStatus.Mastered))
            .Select(p => p.UnitId)
            .ToListAsync(cancellationToken);

        var legacy = await db.AuditLogs
            .AsNoTracking()
            .Where(a => a.UserId == userId && a.Action == "UnitCompleted" && a.NewValuesJson != null)
            .Select(a => a.NewValuesJson!)
            .ToListAsync(cancellationToken);

        var set = new HashSet<string>(canonical, StringComparer.OrdinalIgnoreCase);
        foreach (var l in legacy) set.Add(l.Trim().ToLowerInvariant());
        return set;
    }

    private bool HasElevatedPreviewRole() =>
        User.IsInRole("Admin") || User.IsInRole("SuperAdmin") || User.IsInRole("ContentManager");

    private async Task<bool> HasActivePaidSubscriptionAsync(Guid userId, CancellationToken cancellationToken)
    {
        if (userId == Guid.Empty) return false;
        var now = DateTime.UtcNow;
        return await db.UserSubscriptions.AsNoTracking()
            .AnyAsync(s => s.UserId == userId
                && s.PlanId != "plan-free"
                && s.Status == SubscriptionStatus.Active
                && (s.ExpiresAt == null || s.ExpiresAt > now),
                cancellationToken);
    }

    [HttpGet("concepts")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCanonicalConcepts(CancellationToken cancellationToken)
    {
        var includeUnpublished = HasElevatedPreviewRole();
        var concepts = await db.CanonicalConcepts
            .AsNoTracking()
            .Where(c => includeUnpublished || c.PublishStatus == ContentPublishStatus.Published)
            .OrderBy(c => c.Domain)
            .ThenBy(c => c.Id)
            .Select(c => new
            {
                c.Id,
                Title = new { en = c.TitleEn, ar = c.TitleAr },
                Description = new { en = c.DescriptionEn, ar = c.DescriptionAr },
                c.Domain,
                PublishStatus = c.PublishStatus.ToString()
            })
            .ToListAsync(cancellationToken);

        return Ok(concepts);
    }

    [HttpGet("paths")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetPaths(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        var isElevated = HasElevatedPreviewRole();
        var hasPaidSubscription = isElevated || await HasActivePaidSubscriptionAsync(userId, cancellationToken);
        var completedUnits = await GetCompletedUnitSetAsync(userId, cancellationToken);
        var inProgressUnits = userId == Guid.Empty
            ? []
            : await db.UserUnitProgresses.AsNoTracking()
                .Where(p => p.UserId == userId && p.Status == UnitProgressStatus.InProgress)
                .Select(p => p.UnitId)
                .ToHashSetAsync(cancellationToken);

        var paths = await db.CurriculumPaths
            .Where(p => isElevated || p.PublishStatus == ContentPublishStatus.Published)
            .OrderBy(p => p.DisplayOrder)
            .Include(p => p.Modules.OrderBy(m => m.DisplayOrder))
                .ThenInclude(m => m.Placements.OrderBy(pl => pl.DisplayOrder))
                    .ThenInclude(pl => pl.Unit)
                        .ThenInclude(u => u!.Sections)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var pathMap = paths.ToDictionary(
            p => p.Id,
            p => p.Modules.SelectMany(m => m.Placements).Select(pl => pl.UnitId).Distinct().ToList(),
            StringComparer.OrdinalIgnoreCase
        );

        var result = paths.Select(p =>
        {
            var allPathUnitIds = pathMap[p.Id];
            var completedInPath = allPathUnitIds.Count(id => completedUnits.Contains(id));
            var pathPrereqs = TryDeserialize<List<PrereqRuleDto>>(p.PrerequisitesJson) ?? [];
            var missingPathPrereqs = new List<string>();
            foreach (var rule in pathPrereqs)
            {
                if (rule.Enforcement == "hard_lock" && !EvaluateRule(rule, completedUnits, pathMap))
                {
                    missingPathPrereqs.AddRange(rule.RequiredIds);
                }
            }

            return new
            {
                p.Id,
                Title = new { en = p.TitleEn, ar = p.TitleAr },
                Description = new { en = p.DescriptionEn, ar = p.DescriptionAr },
                TargetAudience = p.TargetAudienceEn != null ? new { en = p.TargetAudienceEn, ar = p.TargetAudienceAr ?? p.TargetAudienceEn } : null,
                p.Category,
                p.DisplayOrder,
                PublishStatus = p.PublishStatus.ToString(),
                Prerequisites = pathPrereqs,
                RecommendedNextPaths = TryDeserialize<List<string>>(p.RecommendedNextPathsJson) ?? [],
                TotalUnits = allPathUnitIds.Count,
                CompletedUnits = completedInPath,
                ProgressPercent = allPathUnitIds.Count > 0 ? Math.Round((decimal)completedInPath / allPathUnitIds.Count * 100m, 1) : 0m,
                IsUnlocked = missingPathPrereqs.Count == 0 || isElevated,
                Modules = p.Modules.OrderBy(m => m.DisplayOrder).Select(m => new
                {
                    m.Id,
                    Title = new { en = m.TitleEn, ar = m.TitleAr },
                    Description = new { en = m.DescriptionEn, ar = m.DescriptionAr },
                    m.DisplayOrder,
                    Units = m.Placements.OrderBy(pl => pl.DisplayOrder)
                        .Where(pl => pl.Unit != null && (isElevated || pl.Unit.PublishStatus == ContentPublishStatus.Published))
                        .Select(pl =>
                        {
                            var u = pl.Unit!;
                            var unitPrereqs = TryDeserialize<List<PrereqRuleDto>>(u.PrerequisitesJson) ?? [];
                            var hasSubscriptionAccess = u.IsFreeTier || hasPaidSubscription;
                            var prereqUnlocked = unitPrereqs.Where(r => r.Enforcement == "hard_lock").All(r => EvaluateRule(r, completedUnits, pathMap));
                            var unlocked = isElevated || (hasSubscriptionAccess && prereqUnlocked);
                            return new
                            {
                                u.Id,
                                u.ConceptId,
                                Title = new { en = u.TitleEn, ar = u.TitleAr },
                                Description = new { en = u.DescriptionEn, ar = u.DescriptionAr },
                                u.Difficulty,
                                u.EstimatedMinutes,
                                u.IsFreeTier,
                                HasSubscriptionAccess = hasSubscriptionAccess,
                                IsSubscriptionLocked = !hasSubscriptionAccess,
                                Tags = TryDeserialize<List<string>>(u.TagsJson) ?? [],
                                InteractiveModuleIds = TryDeserialize<List<string>>(u.InteractiveModuleIdsJson) ?? [],
                                Prerequisites = unitPrereqs,
                                SectionsCount = u.Sections.Count,
                                Status = completedUnits.Contains(u.Id) ? "completed" : (inProgressUnits.Contains(u.Id) ? "in_progress" : "not_started"),
                                IsUnlocked = unlocked,
                                pl.IsOptional
                            };
                        })
                })
            };
        });

        return Ok(result);
    }

    [HttpGet("units/{unitId}")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetUnit(string unitId, CancellationToken cancellationToken)
    {
        var normalizedId = unitId.Trim().ToLowerInvariant();
        var unit = await db.ReusableUnits
            .Include(u => u.Concept)
            .Include(u => u.Sections.OrderBy(s => s.DisplayOrder))
            .Include(u => u.Placements)
                .ThenInclude(pl => pl.Module)
                    .ThenInclude(m => m!.Path)
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == normalizedId, cancellationToken);

        var isElevated = HasElevatedPreviewRole();
        if (unit == null || (!isElevated && unit.PublishStatus != ContentPublishStatus.Published))
            return NotFound(new { message = $"Learning unit '{unitId}' was not found." });

        var userId = GetUserId();
        var hasPaidSubscription = isElevated || await HasActivePaidSubscriptionAsync(userId, cancellationToken);
        var hasSubscriptionAccess = unit.IsFreeTier || hasPaidSubscription;
        var completedUnits = await GetCompletedUnitSetAsync(userId, cancellationToken);
        var sectionProgresses = userId == Guid.Empty
            ? new Dictionary<string, UserSectionProgress>()
            : await db.UserSectionProgresses.AsNoTracking()
                .Where(sp => sp.UserId == userId && sp.UnitId == normalizedId)
                .ToDictionaryAsync(sp => sp.SectionId, cancellationToken);
        var unitProgress = userId == Guid.Empty
            ? null
            : await db.UserUnitProgresses.AsNoTracking()
                .FirstOrDefaultAsync(p => p.UserId == userId && p.UnitId == normalizedId, cancellationToken);
        var mappedQuestionsCount = await db.UnitQuestionMappings
            .CountAsync(m => m.UnitId == normalizedId && m.SectionId == null, cancellationToken);
        var anyMappedCount = mappedQuestionsCount > 0
            ? mappedQuestionsCount
            : await db.UnitQuestionMappings.CountAsync(m => m.UnitId == normalizedId, cancellationToken);

        var recentAttempts = userId == Guid.Empty
            ? []
            : await db.UnitQuizAttempts.AsNoTracking()
                .Where(a => a.UserId == userId && a.Scope == "unit" && a.ScopeId == normalizedId && a.IsCompleted)
                .OrderByDescending(a => a.CompletedAt)
                .Take(5)
                .Select(a => new
                {
                    a.Id,
                    a.Score,
                    a.MaxScore,
                    a.Percentage,
                    a.Passed,
                    a.CompletedAt
                })
                .ToListAsync(cancellationToken);

        var appearsInPaths = unit.Placements
            .Where(pl => pl.Module?.Path != null)
            .Select(pl => new
            {
                PathId = pl.Module!.Path!.Id,
                Title = new { en = pl.Module.Path.TitleEn, ar = pl.Module.Path.TitleAr },
                ModuleId = pl.Module.Id,
                ModuleTitle = new { en = pl.Module.TitleEn, ar = pl.Module.TitleAr }
            })
            .DistinctBy(x => x.PathId)
            .ToList();

        var sanitizedSections = unit.Sections
            .OrderBy(s => s.DisplayOrder)
            .Select(s =>
            {
                sectionProgresses.TryGetValue(s.Id, out var sp);
                var rawInline = TryDeserialize<List<InlineQuestionFullDto>>(s.InlineQuestionsJson) ?? [];
                // Never return correctOptionId before completion!
                var publicQuestions = rawInline.Select(q => new
                {
                    q.Id,
                    q.Question,
                    Options = q.Options.Select(o => new { o.Id, o.Text }).ToList()
                }).ToList();

                return new
                {
                    s.Id,
                    s.Type,
                    Title = new { en = s.TitleEn, ar = s.TitleAr },
                    Content = new { en = s.ContentEn, ar = s.ContentAr },
                    s.DisplayOrder,
                    s.IsRequired,
                    s.CodeSnippet,
                    s.CodeLanguage,
                    CodeExplanation = s.CodeExplanationEn != null ? new { en = s.CodeExplanationEn, ar = s.CodeExplanationAr ?? s.CodeExplanationEn } : null,
                    s.ExpectedOutput,
                    s.InteractiveModuleId,
                    InlineQuestions = publicQuestions,
                    IsCompleted = sp?.IsCompleted ?? false,
                    CheckpointPassed = sp?.CheckpointPassed ?? false
                };
            })
            .ToList();

        var unitPrereqs = TryDeserialize<List<PrereqRuleDto>>(unit.PrerequisitesJson) ?? [];
        var missingUnitPrereqs = new List<string>();
        foreach (var rule in unitPrereqs.Where(r => r.Enforcement == "hard_lock"))
        {
            if (rule.TargetType == "unit")
            {
                var ok = rule.Operator == "any"
                    ? rule.RequiredIds.Any(id => completedUnits.Contains(id))
                    : rule.RequiredIds.All(id => completedUnits.Contains(id));
                if (!ok) missingUnitPrereqs.AddRange(rule.RequiredIds.Where(id => !completedUnits.Contains(id)));
            }
        }

        return Ok(new
        {
            unit.Id,
            unit.ConceptId,
            Concept = unit.Concept == null ? null : new
            {
                unit.Concept.Id,
                Title = new { en = unit.Concept.TitleEn, ar = unit.Concept.TitleAr },
                Description = new { en = unit.Concept.DescriptionEn, ar = unit.Concept.DescriptionAr },
                unit.Concept.Domain
            },
            Title = new { en = unit.TitleEn, ar = unit.TitleAr },
            Description = new { en = unit.DescriptionEn, ar = unit.DescriptionAr },
            unit.Difficulty,
            unit.EstimatedMinutes,
            unit.Version,
            unit.IsFreeTier,
            HasSubscriptionAccess = hasSubscriptionAccess,
            IsSubscriptionLocked = !hasSubscriptionAccess,
            unit.QuizPassPercentage,
            unit.QuizQuestionCount,
            HasQuizPool = anyMappedCount > 0,
            MappedQuestionsCount = anyMappedCount,
            Tags = TryDeserialize<List<string>>(unit.TagsJson) ?? [],
            Prerequisites = unitPrereqs,
            InteractiveModuleIds = TryDeserialize<List<string>>(unit.InteractiveModuleIdsJson) ?? [],
            ExternalReferences = TryDeserialize<List<object>>(unit.ExternalReferencesJson) ?? [],
            Objectives = new
            {
                en = TryDeserialize<List<string>>(unit.ObjectivesEnJson) ?? [],
                ar = TryDeserialize<List<string>>(unit.ObjectivesArJson) ?? []
            },
            AppearsInPaths = appearsInPaths,
            IsCompleted = completedUnits.Contains(normalizedId),
            Status = completedUnits.Contains(normalizedId) ? "completed" : (unitProgress?.Status.ToString().ToLowerInvariant() ?? "not_started"),
            MasteryScore = unitProgress?.MasteryScore ?? (completedUnits.Contains(normalizedId) ? 100m : 0m),
            LastSectionId = unitProgress?.LastSectionId,
            IsUnlocked = isElevated || (hasSubscriptionAccess && missingUnitPrereqs.Count == 0),
            MissingPrerequisites = missingUnitPrereqs.Distinct().ToList(),
            Sections = sanitizedSections,
            RecentQuizAttempts = recentAttempts
        });
    }

    [HttpPost("units/{unitId}/visit")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> VisitUnitSection(
        string unitId,
        [FromBody] VisitUnitSectionRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        if (string.IsNullOrWhiteSpace(request?.SectionId))
            return BadRequest(new { message = "SectionId is required." });

        var normalizedUnitId = unitId.Trim().ToLowerInvariant();
        var sectionId = request.SectionId.Trim();

        var sectionExists = await db.UnitSections
            .AsNoTracking()
            .AnyAsync(s => s.Id == sectionId && s.UnitId == normalizedUnitId, cancellationToken);
        if (!sectionExists)
            return NotFound(new { message = $"Section '{sectionId}' was not found in unit '{unitId}'." });

        var unitProgress = await db.UserUnitProgresses
            .FirstOrDefaultAsync(p => p.UserId == userId && p.UnitId == normalizedUnitId, cancellationToken);
        if (unitProgress == null)
        {
            unitProgress = UserUnitProgress.Create(userId, normalizedUnitId);
            db.UserUnitProgresses.Add(unitProgress);
        }

        unitProgress.RecordActivity(0, sectionId);
        await db.SaveChangesAsync(cancellationToken);

        return Ok(new
        {
            UnitId = normalizedUnitId,
            LastSectionId = sectionId
        });
    }

    [HttpPost("sections/{sectionId}/complete")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> CompleteSection(
        string sectionId,
        [FromBody] CompleteSectionRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        var section = await db.UnitSections
            .FirstOrDefaultAsync(s => s.Id == sectionId, cancellationToken);
        if (section == null)
            return NotFound(new { message = $"Section '{sectionId}' was not found." });

        if (!HasElevatedPreviewRole())
        {
            var unit = await db.ReusableUnits.AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == section.UnitId, cancellationToken);
            if (unit != null && !unit.IsFreeTier && !await HasActivePaidSubscriptionAsync(userId, cancellationToken))
            {
                return StatusCode(StatusCodes.Status403Forbidden, new
                {
                    code = "SUBSCRIPTION_REQUIRED",
                    message = "An active paid subscription is required to complete this premium learning unit.",
                    unitId = section.UnitId
                });
            }
        }

        var inlineQuestions = TryDeserialize<List<InlineQuestionFullDto>>(section.InlineQuestionsJson) ?? [];
        var feedback = new List<object>();
        var passedCheckpoint = true;
        decimal checkpointScore = 100m;

        if (inlineQuestions.Count > 0)
        {
            var answers = request.Answers ?? new Dictionary<string, string>();
            var correctCount = 0;

            foreach (var q in inlineQuestions)
            {
                answers.TryGetValue(q.Id, out var selectedId);
                var expectedAnswerId = !string.IsNullOrWhiteSpace(q.CorrectAnswerId)
                    ? q.CorrectAnswerId
                    : q.CorrectOptionId;
                var isCorrect = !string.IsNullOrWhiteSpace(selectedId) &&
                    !string.IsNullOrWhiteSpace(expectedAnswerId) &&
                    string.Equals(selectedId.Trim(), expectedAnswerId.Trim(), StringComparison.OrdinalIgnoreCase);
                if (isCorrect) correctCount++;

                feedback.Add(new
                {
                    QuestionId = q.Id,
                    SelectedOptionId = selectedId,
                    CorrectOptionId = expectedAnswerId,
                    IsCorrect = isCorrect,
                    q.Explanation
                });
            }

            checkpointScore = Math.Round((decimal)correctCount / inlineQuestions.Count * 100m, 1);
            passedCheckpoint = correctCount == inlineQuestions.Count;

            if (!passedCheckpoint)
            {
                return Ok(new
                {
                    SectionId = section.Id,
                    section.UnitId,
                    Completed = false,
                    CheckpointPassed = false,
                    ScorePercentage = checkpointScore,
                    Message = "Review the feedback and answer all checkpoint questions correctly to mark this section complete.",
                    Feedback = feedback
                });
            }
        }

        var unitProgress = await db.UserUnitProgresses
            .FirstOrDefaultAsync(p => p.UserId == userId && p.UnitId == section.UnitId, cancellationToken);
        if (unitProgress == null)
        {
            unitProgress = UserUnitProgress.Create(userId, section.UnitId);
            db.UserUnitProgresses.Add(unitProgress);
        }
        unitProgress.RecordActivity(request.TimeSpentSeconds, section.Id);

        var sp = await db.UserSectionProgresses
            .FirstOrDefaultAsync(x => x.UserId == userId && x.SectionId == section.Id, cancellationToken);
        if (sp == null)
        {
            sp = UserSectionProgress.Create(userId, section.UnitId, section.Id);
            db.UserSectionProgresses.Add(sp);
        }
        sp.Complete(true, request.TimeSpentSeconds);

        var streak = await db.StudyStreaks.FirstOrDefaultAsync(s => s.UserId == userId, cancellationToken);
        if (streak == null)
        {
            streak = StudyStreak.Create(userId);
            db.StudyStreaks.Add(streak);
        }
        streak.RecordStudy(DateOnly.FromDateTime(DateTime.UtcNow));

        await db.SaveChangesAsync(cancellationToken);

        return Ok(new
        {
            SectionId = section.Id,
            section.UnitId,
            Completed = true,
            CheckpointPassed = true,
            ScorePercentage = checkpointScore,
            Feedback = feedback
        });
    }

    [HttpPost("units/{unitId}/quiz/start")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> StartUnitQuiz(
        string unitId,
        [FromBody] StartUnitQuizRequest? request,
        CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        var normalizedUnitId = unitId.Trim().ToLowerInvariant();
        var unit = await db.ReusableUnits
            .Include(u => u.Sections)
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == normalizedUnitId, cancellationToken);
        if (unit == null)
            return NotFound(new { message = $"Learning unit '{unitId}' not found." });

        if (!unit.IsFreeTier && !HasElevatedPreviewRole() && !await HasActivePaidSubscriptionAsync(userId, cancellationToken))
        {
            return StatusCode(StatusCodes.Status403Forbidden, new
            {
                code = "SUBSCRIPTION_REQUIRED",
                message = "An active paid subscription is required to take quizzes in this premium learning unit.",
                unitId = normalizedUnitId
            });
        }

        // Enforce required section completion unless elevated admin preview
        var isAdminPreview = (request?.PreviewMode ?? false) && HasElevatedPreviewRole();
        if (!isAdminPreview)
        {
            var requiredSectionIds = unit.Sections.Where(s => s.IsRequired).Select(s => s.Id).ToList();
            if (requiredSectionIds.Count > 0)
            {
                var completedSectionIds = await db.UserSectionProgresses
                    .AsNoTracking()
                    .Where(sp => sp.UserId == userId && sp.UnitId == normalizedUnitId && sp.IsCompleted)
                    .Select(sp => sp.SectionId)
                    .ToHashSetAsync(cancellationToken);

                var pendingSections = requiredSectionIds.Where(id => !completedSectionIds.Contains(id)).ToList();
                if (pendingSections.Count > 0)
                {
                    return BadRequest(new
                    {
                        code = "SECTIONS_INCOMPLETE",
                        message = "Complete all required lesson sections and checkpoints before attempting the final mastery quiz.",
                        pendingSectionIds = pendingSections
                    });
                }
            }
        }

        // Gather mapped questions scoped to this unit
        var pool = await db.UnitQuestionMappings
            .Where(m => m.UnitId == normalizedUnitId)
            .Include(m => m.Question!)
                .ThenInclude(q => q.Options)
            .Where(m => m.Question != null && m.Question.PublishStatus == ContentPublishStatus.Published)
            .Select(m => m.Question!)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var distinctPool = pool.GroupBy(q => q.Id).Select(g => g.First()).ToList();
        if (distinctPool.Count == 0)
        {
            return BadRequest(new
            {
                code = "NO_QUIZ_QUESTIONS",
                message = "No mapped quiz questions are currently configured for this learning unit."
            });
        }

        var targetCount = Math.Min(Math.Max(unit.QuizQuestionCount, 3), distinctPool.Count);

        // Exclude questions seen across the user's most recent 3 attempts when the pool allows variety
        var recentAttemptQIdsJson = await db.UnitQuizAttempts
            .AsNoTracking()
            .Where(a => a.UserId == userId && a.Scope == "unit" && a.ScopeId == normalizedUnitId)
            .OrderByDescending(a => a.StartedAt)
            .Take(3)
            .Select(a => a.QuestionIdsJson)
            .ToListAsync(cancellationToken);

        var mostRecentSet = new HashSet<string>(
            recentAttemptQIdsJson.Count > 0 ? (TryDeserialize<List<string>>(recentAttemptQIdsJson[0]) ?? []) : [],
            StringComparer.OrdinalIgnoreCase);
        var recentUsedSet = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        foreach (var json in recentAttemptQIdsJson)
        {
            foreach (var qid in TryDeserialize<List<string>>(json) ?? [])
            {
                recentUsedSet.Add(qid);
            }
        }

        var freshCandidates = distinctPool.Where(q => !recentUsedSet.Contains(q.Id)).ToList();
        var olderRecentCandidates = distinctPool
            .Where(q => recentUsedSet.Contains(q.Id) && !mostRecentSet.Contains(q.Id))
            .ToList();
        var mostRecentCandidates = distinctPool.Where(q => mostRecentSet.Contains(q.Id)).ToList();

        var rng = Random.Shared;
        List<QuestionBankItem> PickStratified(List<QuestionBankItem> source, int needed)
        {
            var picked = new List<QuestionBankItem>();
            if (needed <= 0 || source.Count == 0) return picked;

            var byDiff = new[] { "easy", "medium", "hard" }
                .ToDictionary(d => d, d => source.Where(x => x.Difficulty == d).OrderBy(_ => rng.Next()).ToList());

            // Round-robin across difficulty buckets for balanced quizzes
            var madeProgress = true;
            while (picked.Count < needed && madeProgress)
            {
                madeProgress = false;
                foreach (var diff in new[] { "easy", "medium", "hard" })
                {
                    if (picked.Count >= needed) break;
                    if (byDiff[diff].Count > 0)
                    {
                        picked.Add(byDiff[diff][0]);
                        byDiff[diff].RemoveAt(0);
                        madeProgress = true;
                    }
                }
            }
            return picked;
        }

        var selected = PickStratified(freshCandidates, targetCount);
        var freshQuestionsUsed = selected.Count;
        if (selected.Count < targetCount)
        {
            selected.AddRange(PickStratified(olderRecentCandidates, targetCount - selected.Count));
        }
        if (selected.Count < targetCount)
        {
            selected.AddRange(PickStratified(mostRecentCandidates, targetCount - selected.Count));
        }
        selected = selected.OrderBy(_ => rng.Next()).ToList();

        var questionIds = selected.Select(q => q.Id).ToList();
        var attempt = UnitQuizAttempt.Create(
            userId,
            "unit",
            normalizedUnitId,
            JsonSerializer.Serialize(questionIds),
            unit.QuizPassPercentage > 0 ? unit.QuizPassPercentage : 60,
            request?.PathId
        );
        db.UnitQuizAttempts.Add(attempt);
        await db.SaveChangesAsync(cancellationToken);

        // NEVER return IsCorrect or Explanation before submission; shuffle displayed option order per attempt.
        var publicQuestions = selected.Select(q => new
        {
            q.Id,
            q.Domain,
            q.Topic,
            q.Subtopic,
            q.Difficulty,
            q.QuestionType,
            q.CodeSnippet,
            q.CodeLanguage,
            Question = new { en = q.QuestionEn, ar = q.QuestionAr },
            Options = q.Options
                .OrderBy(_ => rng.Next())
                .Select(o => new
                {
                    Key = o.OptionKey,
                    Text = new { en = o.TextEn, ar = o.TextAr }
                }).ToList()
        });

        return Ok(new
        {
            AttemptId = attempt.Id,
            UnitId = normalizedUnitId,
            PassThreshold = attempt.PassThreshold,
            IsPreview = isAdminPreview,
            PoolSize = distinctPool.Count,
            FreshQuestionsUsed = freshQuestionsUsed,
            PoolExhausted = freshCandidates.Count < targetCount,
            Questions = publicQuestions
        });
    }

    [HttpPost("units/{unitId}/quiz/submit")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SubmitUnitQuiz(
        string unitId,
        [FromBody] SubmitUnitQuizRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        var normalizedUnitId = unitId.Trim().ToLowerInvariant();
        var attempt = await db.UnitQuizAttempts
            .Include(a => a.Answers)
            .FirstOrDefaultAsync(a => a.Id == request.AttemptId && a.UserId == userId && a.ScopeId == normalizedUnitId, cancellationToken);

        if (attempt == null)
            return NotFound(new { message = "Quiz attempt not found." });
        if (attempt.IsCompleted)
            return BadRequest(new { message = "This quiz attempt has already been submitted." });

        var attemptQuestionIds = TryDeserialize<List<string>>(attempt.QuestionIdsJson) ?? [];
        var dbQuestions = await db.QuestionBankItems
            .Include(q => q.Options)
            .Where(q => attemptQuestionIds.Contains(q.Id))
            .AsNoTracking()
            .ToDictionaryAsync(q => q.Id, cancellationToken);

        var submittedMap = (request.Answers ?? []).ToDictionary(a => a.QuestionId, a => a.SelectedOptionKey ?? "", StringComparer.OrdinalIgnoreCase);

        var correctCount = 0;
        var feedbackList = new List<object>();

        foreach (var qId in attemptQuestionIds)
        {
            if (!dbQuestions.TryGetValue(qId, out var q)) continue;
            submittedMap.TryGetValue(qId, out var selectedKey);

            var correctOption = q.Options.FirstOrDefault(o => o.IsCorrect);
            var isCorrect = correctOption != null && !string.IsNullOrWhiteSpace(selectedKey) &&
                string.Equals(correctOption.OptionKey.Trim(), selectedKey.Trim(), StringComparison.OrdinalIgnoreCase);

            if (isCorrect) correctCount++;

            db.UnitQuizAttemptAnswers.Add(UnitQuizAttemptAnswer.Create(
                attempt.Id,
                qId,
                JsonSerializer.Serialize(string.IsNullOrWhiteSpace(selectedKey) ? Array.Empty<string>() : new[] { selectedKey }),
                isCorrect,
                isCorrect ? 1 : 0
            ));

            feedbackList.Add(new
            {
                QuestionId = qId,
                SelectedOptionKey = selectedKey,
                CorrectOptionKey = correctOption?.OptionKey ?? "",
                IsCorrect = isCorrect,
                Explanation = new { en = q.ExplanationEn ?? "", ar = q.ExplanationAr ?? q.ExplanationEn ?? "" }
            });
        }

        attempt.Complete(correctCount, attemptQuestionIds.Count);

        var xpAwarded = 0;
        var newlyCompleted = false;
        var streakDays = 0;

        if (attempt.Passed)
        {
            var progress = await db.UserUnitProgresses
                .FirstOrDefaultAsync(p => p.UserId == userId && p.UnitId == normalizedUnitId, cancellationToken);
            var wasAlreadyCompleted = progress != null &&
                (progress.Status == UnitProgressStatus.Completed || progress.Status == UnitProgressStatus.Mastered);

            if (progress == null)
            {
                progress = UserUnitProgress.Create(userId, normalizedUnitId);
                db.UserUnitProgresses.Add(progress);
            }
            progress.MarkCompleted(attempt.Percentage, request.TimeSpentSeconds);

            if (!wasAlreadyCompleted)
            {
                newlyCompleted = true;
                xpAwarded = attempt.Percentage >= 85m ? 75 : 50;
                db.UserXpEvents.Add(UserXpEvent.Create(
                    userId, xpAwarded, "UnitQuizPassed", attempt.Id, $"Mastered unit {normalizedUnitId} ({attempt.Percentage}%)"
                ));
            }

            // Record study streak
            var streak = await db.StudyStreaks.FirstOrDefaultAsync(s => s.UserId == userId, cancellationToken);
            if (streak == null)
            {
                streak = StudyStreak.Create(userId);
                db.StudyStreaks.Add(streak);
            }
            streak.RecordStudy(DateOnly.FromDateTime(DateTime.UtcNow));
            streakDays = streak.CurrentStreak;

            // Update matching ConceptMastery in knowledge schema when concept aligns
            var unit = await db.ReusableUnits.Include(u => u.Concept).AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == normalizedUnitId, cancellationToken);
            if (unit?.Concept != null)
            {
                var slugCandidate = ConceptMapping.ResolveSlug(unit.ConceptId);
                var knowledgeConcept = await db.Concepts.AsNoTracking()
                    .FirstOrDefaultAsync(c => c.Slug == slugCandidate || c.Title.ToLower() == unit.Concept.TitleEn.ToLower(), cancellationToken);
                if (knowledgeConcept != null)
                {
                    var mastery = await db.ConceptMasteries.FirstOrDefaultAsync(
                        m => m.UserId == userId && m.ConceptId == knowledgeConcept.Id, cancellationToken);
                    if (mastery == null)
                    {
                        mastery = ConceptMastery.Create(userId, knowledgeConcept.Id);
                        db.ConceptMasteries.Add(mastery);
                    }
                    mastery.UpdateFromEvidence(attempt.Percentage, fromAssessment: true, JsonSerializer.Serialize(new { unitId = normalizedUnitId, attemptId = attempt.Id }));
                }
            }

            db.AuditLogs.Add(AuditLog.Create(
                "UnitCompleted", "ReusableUnit", userId, attempt.Id,
                newValues: normalizedUnitId, details: $"Passed quiz ({attempt.Percentage}%)"));
        }

        await db.SaveChangesAsync(cancellationToken);

        IReadOnlyList<EvaluatedAchievementDto> achievements = [];
        if (attempt.Passed)
        {
            achievements = await GamificationEvaluator.EvaluateAndSyncAsync(db, userId, cancellationToken);
        }

        return Ok(new
        {
            AttemptId = attempt.Id,
            UnitId = normalizedUnitId,
            attempt.Score,
            attempt.MaxScore,
            attempt.Percentage,
            attempt.PassThreshold,
            attempt.Passed,
            NewlyCompleted = newlyCompleted,
            XpAwarded = xpAwarded,
            StreakDays = streakDays,
            UnlockedAchievementsCount = achievements.Count(a => a.Unlocked),
            Feedback = feedbackList
        });
    }

    private static bool EvaluateRule(
        PrereqRuleDto rule,
        HashSet<string> completedUnits,
        Dictionary<string, List<string>> pathMap)
    {
        if (rule.RequiredIds.Count == 0) return true;
        if (string.Equals(rule.TargetType, "path", StringComparison.OrdinalIgnoreCase))
        {
            bool PathDone(string pathId) => pathMap.TryGetValue(pathId, out var ids) && ids.Count > 0 && ids.All(completedUnits.Contains);
            return rule.Operator == "any" ? rule.RequiredIds.Any(PathDone) : rule.RequiredIds.All(PathDone);
        }

        return rule.Operator == "any"
            ? rule.RequiredIds.Any(completedUnits.Contains)
            : rule.RequiredIds.All(completedUnits.Contains);
    }

    private sealed class PrereqRuleDto
    {
        public string TargetType { get; set; } = "unit";
        public string Operator { get; set; } = "all";
        public List<string> RequiredIds { get; set; } = [];
        public string Enforcement { get; set; } = "recommended";
    }

    private sealed class InlineQuestionFullDto
    {
        public string Id { get; set; } = "";
        public LocalizedDto Question { get; set; } = new();
        public List<InlineOptionDto> Options { get; set; } = [];
        [JsonPropertyName("correctOptionId")]
        public string CorrectOptionId { get; set; } = "";
        [JsonPropertyName("correctAnswerId")]
        public string CorrectAnswerId { get; set; } = "";
        public LocalizedDto? Explanation { get; set; }
    }

    private sealed class InlineOptionDto
    {
        public string Id { get; set; } = "";
        public LocalizedDto Text { get; set; } = new();
    }

    private sealed class LocalizedDto
    {
        public string En { get; set; } = "";
        public string Ar { get; set; } = "";
    }
}

public record VisitUnitSectionRequest(string SectionId);
public record CompleteSectionRequest(Dictionary<string, string>? Answers = null, int TimeSpentSeconds = 0);
public record StartUnitQuizRequest(string? PathId = null, bool PreviewMode = false);
public record QuizAnswerSubmissionDto(string QuestionId, string? SelectedOptionKey);
public record SubmitUnitQuizRequest(Guid AttemptId, List<QuizAnswerSubmissionDto> Answers, int TimeSpentSeconds = 0);
