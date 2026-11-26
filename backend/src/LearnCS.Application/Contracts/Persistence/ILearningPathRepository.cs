using LearnCS.Domain.Learning;

namespace LearnCS.Application.Contracts.Persistence;

/// <summary>
/// Persistence contract for Learning Paths, Tracks, Modules, Lessons,
/// Progress tracking, and Enrollment management.
/// </summary>
public interface ILearningPathRepository
{
    // ── Learning Paths ─────────────────────────────────────────────────────────

    Task<LearningPath?> FindByIdAsync(Guid id, bool trackForUpdate = false, CancellationToken cancellationToken = default);
    Task<LearningPath?> FindBySlugAsync(string slug, CancellationToken cancellationToken = default);

    /// <summary>Returns published path with full tree (tracks -> modules -> lessons) for navigation.</summary>
    Task<LearningPath?> FindByIdWithTracksAsync(Guid id, CancellationToken cancellationToken = default);
    Task<LearningPath?> FindBySlugWithTracksAsync(string slug, CancellationToken cancellationToken = default);

    /// <summary>Returns true if a learning path with this slug already exists.</summary>
    Task<bool> ExistsBySlugAsync(string slug, CancellationToken cancellationToken = default);

    /// <summary>Returns all published learning paths ordered by title.</summary>
    Task<IReadOnlyList<LearningPath>> GetAllPublishedAsync(CancellationToken cancellationToken = default);

    void Add(LearningPath learningPath);

    // ── Tracks / Modules / Lessons ─────────────────────────────────────────────

    Task<Track?> FindTrackByIdAsync(Guid trackId, CancellationToken cancellationToken = default);
    Task<Module?> FindModuleByIdAsync(Guid moduleId, CancellationToken cancellationToken = default);
    Task<Lesson?> FindLessonByIdAsync(Guid lessonId, CancellationToken cancellationToken = default);
    Task<Lesson?> FindLessonBySlugAsync(string slug, CancellationToken cancellationToken = default);

    /// <summary>Returns lessons for a module in display order.</summary>
    Task<IReadOnlyList<Lesson>> GetLessonsForModuleAsync(Guid moduleId, CancellationToken cancellationToken = default);

    // ── Enrollment ─────────────────────────────────────────────────────────────

    Task<PathEnrollment?> GetEnrollmentAsync(Guid userId, Guid learningPathId, CancellationToken cancellationToken = default);

    /// <summary>Returns all active enrollments for a user.</summary>
    Task<IReadOnlyList<PathEnrollment>> GetEnrollmentsForUserAsync(Guid userId, CancellationToken cancellationToken = default);

    void AddEnrollment(PathEnrollment enrollment);

    // ── Lesson Progress ────────────────────────────────────────────────────────

    Task<LessonProgress?> GetLessonProgressAsync(Guid userId, Guid lessonId, CancellationToken cancellationToken = default);

    /// <summary>Returns progress records for all lessons in a given module.</summary>
    Task<IReadOnlyList<LessonProgress>> GetModuleProgressAsync(Guid userId, Guid moduleId, CancellationToken cancellationToken = default);

    /// <summary>Returns all lesson progress records for a user across all paths.</summary>
    Task<IReadOnlyList<LessonProgress>> GetUserLessonProgressesAsync(Guid userId, CancellationToken cancellationToken = default);

    /// <summary>Returns the total count of completed lessons for a user.</summary>
    Task<int> GetCompletedLessonsCountForUserAsync(Guid userId, CancellationToken cancellationToken = default);

    void AddLessonProgress(LessonProgress progress);
}
