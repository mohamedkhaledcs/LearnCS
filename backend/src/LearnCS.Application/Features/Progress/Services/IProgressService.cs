using LearnCS.Application.Common;
using LearnCS.Application.Features.Progress.DTOs;

namespace LearnCS.Application.Features.Progress.Services;

/// <summary>
/// Application service contract for progress tracking, concept mastery updates, and learner metrics.
/// </summary>
public interface IProgressService
{
    /// <summary>
    /// Returns an overall summary of progress, level, XP, study streak, and top mastered concepts for the learner.
    /// Security Rule: Enforces user ownership (IDOR protection).
    /// </summary>
    Task<Result<LearnerProgressSummaryDto>> GetMyProgressSummaryAsync(Guid userId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Records or completes lesson progress for the authenticated learner.
    /// Updates enrollment completion percentage, awards XP, and updates ConceptMastery via EMA evidence tracking.
    /// </summary>
    Task<Result<RecordLessonProgressResponseDto>> RecordLessonProgressAsync(Guid userId, RecordLessonProgressRequest request, CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves the concept mastery breakdown for all concepts evaluated for the authenticated learner.
    /// Security Rule: Enforces user ownership (IDOR protection).
    /// </summary>
    Task<Result<IReadOnlyList<ConceptMasteryItemDto>>> GetMyConceptMasteryAsync(Guid userId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves progress details for a specific enrolled learning path.
    /// Security Rule: Enforces user ownership (IDOR protection).
    /// </summary>
    Task<Result<PathProgressDetailsDto>> GetPathProgressAsync(Guid userId, Guid learningPathId, CancellationToken cancellationToken = default);
}
