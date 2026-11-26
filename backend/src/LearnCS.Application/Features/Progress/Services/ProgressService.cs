using LearnCS.Application.Common;
using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.Progress.DTOs;
using LearnCS.Domain.Gamification;
using LearnCS.Domain.Intelligence;
using LearnCS.Domain.Learning;

namespace LearnCS.Application.Features.Progress.Services;

public class ProgressService(
    ILearningPathRepository learningPathRepository,
    IIntelligenceRepository intelligenceRepository,
    IGamificationRepository gamificationRepository,
    IConceptRepository conceptRepository,
    IUserRepository userRepository,
    IUnitOfWork unitOfWork) : IProgressService
{
    public async Task<Result<LearnerProgressSummaryDto>> GetMyProgressSummaryAsync(
        Guid userId,
        CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<LearnerProgressSummaryDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var user = await userRepository.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            return Result<LearnerProgressSummaryDto>.Failure("User account not found.", "USER_NOT_FOUND");
        }

        var levelRecord = await intelligenceRepository.GetLearnerLevelAsync(userId, cancellationToken);
        var totalXp = await gamificationRepository.GetTotalXpAsync(userId, cancellationToken);
        var streak = await gamificationRepository.GetStreakAsync(userId, cancellationToken);
        var completedLessonsCount = await learningPathRepository.GetCompletedLessonsCountForUserAsync(userId, cancellationToken);
        var masteries = await intelligenceRepository.GetAllMasteryForUserAsync(userId, cancellationToken);
        var concepts = await conceptRepository.GetAllPublishedAsync(cancellationToken);

        var conceptMap = concepts.ToDictionary(c => c.Id, c => c.Title);

        var masteryDtos = masteries
            .Select(m => new ConceptMasteryItemDto(
                m.ConceptId,
                conceptMap.TryGetValue(m.ConceptId, out var title) ? title : "Concept",
                m.MasteryScore,
                m.Confidence,
                m.IsMastered,
                m.IsWeak,
                m.TotalAttempts,
                m.LastEvaluatedAt
            ))
            .OrderByDescending(m => m.MasteryScore)
            .ToList();

        int masteredCount = masteries.Count(m => m.IsMastered);
        decimal overallMastery = levelRecord?.OverallMasteryScore ?? (masteries.Count == 0 ? 0 : Math.Round(masteries.Average(m => m.MasteryScore), 2));

        var dto = new LearnerProgressSummaryDto(
            userId,
            levelRecord?.Level.ToString() ?? "Beginner",
            totalXp,
            streak?.CurrentStreak ?? 0,
            streak?.LongestStreak ?? 0,
            completedLessonsCount,
            masteredCount,
            overallMastery,
            masteryDtos.Take(5).ToList()
        );

        return Result<LearnerProgressSummaryDto>.Success(dto);
    }

    public async Task<Result<RecordLessonProgressResponseDto>> RecordLessonProgressAsync(
        Guid userId,
        RecordLessonProgressRequest request,
        CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<RecordLessonProgressResponseDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        if (request == null || request.LessonId == Guid.Empty)
        {
            return Result<RecordLessonProgressResponseDto>.Failure("Valid lesson identifier required.", "INVALID_INPUT");
        }

        var lesson = await learningPathRepository.FindLessonByIdAsync(request.LessonId, cancellationToken);
        if (lesson == null)
        {
            return Result<RecordLessonProgressResponseDto>.Failure("Lesson not found.", "NOT_FOUND");
        }

        var progress = await learningPathRepository.GetLessonProgressAsync(userId, request.LessonId, cancellationToken);
        bool isNewCompletion = false;

        if (progress == null)
        {
            progress = LessonProgress.Create(userId, request.LessonId);
            progress.Start();
            progress.Complete(request.TimeSpentSeconds);
            learningPathRepository.AddLessonProgress(progress);
            isNewCompletion = true;
        }
        else if (progress.Status != LessonProgressStatus.Completed)
        {
            progress.Complete(request.TimeSpentSeconds);
            isNewCompletion = true;
        }

        int xpEarned = 0;
        if (isNewCompletion)
        {
            xpEarned = 50;
            var xpEvent = UserXpEvent.Create(userId, xpEarned, "LessonCompleted", request.LessonId, $"Completed lesson: {lesson.Title}");
            gamificationRepository.AddXpEvent(xpEvent);

            var streak = await gamificationRepository.GetStreakAsync(userId, cancellationToken);
            if (streak == null)
            {
                streak = StudyStreak.Create(userId);
                gamificationRepository.AddStreak(streak);
            }

            streak.RecordStudy(DateOnly.FromDateTime(DateTime.UtcNow));
        }

        // Update Concept Mastery via Exponential Moving Average (EMA) if lesson has a ConceptId
        if (lesson.ConceptId.HasValue && isNewCompletion)
        {
            var conceptId = lesson.ConceptId.Value;
            var mastery = await intelligenceRepository.GetConceptMasteryAsync(userId, conceptId, cancellationToken);
            if (mastery == null)
            {
                mastery = ConceptMastery.Create(userId, conceptId);
                intelligenceRepository.AddConceptMastery(mastery);
            }

            mastery.UpdateFromEvidence(100.0m, fromAssessment: false, evidenceJson: $"{{\"lessonId\":\"{lesson.Id}\",\"title\":\"{lesson.Title}\"}}");
        }

        // Update Learning Path Enrollment Progress
        decimal newProgressPercent = 0;
        var module = await learningPathRepository.FindModuleByIdAsync(lesson.ModuleId, cancellationToken);
        var track = module != null ? await learningPathRepository.FindTrackByIdAsync(module.TrackId, cancellationToken) : null;

        if (track != null)
        {
            var path = await learningPathRepository.FindByIdWithTracksAsync(track.LearningPathId, cancellationToken);
            if (path != null)
            {
                var pathLessonIds = path.Tracks
                    .SelectMany(t => t.Modules)
                    .SelectMany(m => m.Lessons)
                    .Select(l => l.Id)
                    .ToHashSet();

                int totalLessonsInPath = pathLessonIds.Count;
                var userProgresses = await learningPathRepository.GetUserLessonProgressesAsync(userId, cancellationToken);

                int completedCount = userProgresses.Count(p => pathLessonIds.Contains(p.LessonId) && p.Status == LessonProgressStatus.Completed);
                if (isNewCompletion && !userProgresses.Any(p => p.LessonId == lesson.Id && p.Status == LessonProgressStatus.Completed))
                {
                    completedCount++;
                }

                newProgressPercent = totalLessonsInPath == 0
                    ? 100
                    : Math.Clamp(Math.Round((completedCount / (decimal)totalLessonsInPath) * 100, 2), 0, 100);

                var enrollment = await learningPathRepository.GetEnrollmentAsync(userId, path.Id, cancellationToken);
                if (enrollment != null)
                {
                    enrollment.UpdateProgress(newProgressPercent);
                }
            }
        }

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<RecordLessonProgressResponseDto>.Success(new RecordLessonProgressResponseDto(
            lesson.Id,
            progress.Status.ToString(),
            xpEarned,
            newProgressPercent,
            progress.CompletedAt ?? DateTime.UtcNow
        ));
    }

    public async Task<Result<IReadOnlyList<ConceptMasteryItemDto>>> GetMyConceptMasteryAsync(
        Guid userId,
        CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<IReadOnlyList<ConceptMasteryItemDto>>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var user = await userRepository.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            return Result<IReadOnlyList<ConceptMasteryItemDto>>.Failure("User account not found.", "USER_NOT_FOUND");
        }

        var masteries = await intelligenceRepository.GetAllMasteryForUserAsync(userId, cancellationToken);
        var concepts = await conceptRepository.GetAllPublishedAsync(cancellationToken);
        var conceptMap = concepts.ToDictionary(c => c.Id, c => c.Title);

        var dtos = masteries
            .Select(m => new ConceptMasteryItemDto(
                m.ConceptId,
                conceptMap.TryGetValue(m.ConceptId, out var title) ? title : "Concept",
                m.MasteryScore,
                m.Confidence,
                m.IsMastered,
                m.IsWeak,
                m.TotalAttempts,
                m.LastEvaluatedAt
            ))
            .OrderByDescending(m => m.MasteryScore)
            .ToList();

        return Result<IReadOnlyList<ConceptMasteryItemDto>>.Success(dtos);
    }

    public async Task<Result<PathProgressDetailsDto>> GetPathProgressAsync(
        Guid userId,
        Guid learningPathId,
        CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<PathProgressDetailsDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var path = await learningPathRepository.FindByIdWithTracksAsync(learningPathId, cancellationToken);
        if (path == null)
        {
            return Result<PathProgressDetailsDto>.Failure("Learning path not found.", "NOT_FOUND");
        }

        var enrollment = await learningPathRepository.GetEnrollmentAsync(userId, learningPathId, cancellationToken);
        var userProgresses = (await learningPathRepository.GetUserLessonProgressesAsync(userId, cancellationToken))
            .ToDictionary(p => p.LessonId, p => p);

        var allLessons = path.Tracks
            .SelectMany(t => t.Modules)
            .SelectMany(m => m.Lessons)
            .ToList();

        var lessonProgressDtos = allLessons
            .Select(l =>
            {
                userProgresses.TryGetValue(l.Id, out var prog);
                return new LessonProgressItemDto(
                    l.Id,
                    l.Title,
                    prog?.Status.ToString() ?? "NotStarted",
                    prog?.StartedAt,
                    prog?.CompletedAt,
                    prog?.TimeSpentSeconds ?? 0
                );
            })
            .ToList();

        int completedCount = lessonProgressDtos.Count(p => p.Status == "Completed");

        var dto = new PathProgressDetailsDto(
            path.Id,
            path.Title,
            enrollment?.Status.ToString() ?? "NotEnrolled",
            enrollment?.ProgressPercent ?? 0,
            completedCount,
            allLessons.Count,
            enrollment?.EnrolledAt ?? DateTime.UtcNow,
            enrollment?.CompletedAt,
            lessonProgressDtos
        );

        return Result<PathProgressDetailsDto>.Success(dto);
    }
}
