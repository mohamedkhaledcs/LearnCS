using LearnCS.Application.Common;
using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.LearningPaths.DTOs;
using LearnCS.Domain.Learning;

namespace LearnCS.Application.Features.LearningPaths.Services;

public class LearningPathService(
    ILearningPathRepository learningPathRepository,
    IUserRepository userRepository,
    IUnitOfWork unitOfWork) : ILearningPathService
{
    private static readonly string[] ElevatedRoles = ["Owner", "Mentor", "Admin", "SuperAdmin", "ContentManager"];

    public async Task<Result<IReadOnlyList<LearningPathSummaryDto>>> GetPublishedLearningPathsAsync(CancellationToken cancellationToken = default)
    {
        var paths = await learningPathRepository.GetAllPublishedAsync(cancellationToken);
        var dtos = paths.Select(MapToSummaryDto).ToList();
        return Result<IReadOnlyList<LearningPathSummaryDto>>.Success(dtos);
    }

    public async Task<Result<LearningPathDetailsDto>> GetLearningPathBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return Result<LearningPathDetailsDto>.Failure("Invalid learning path slug.", "INVALID_INPUT");
        }

        var normalizedSlug = slug.Trim().ToLowerInvariant();
        var path = await learningPathRepository.FindBySlugWithTracksAsync(normalizedSlug, cancellationToken);

        if (path == null || path.Status != LearningPathStatus.Published)
        {
            return Result<LearningPathDetailsDto>.Failure($"Learning path '{slug}' not found.", "NOT_FOUND");
        }

        return Result<LearningPathDetailsDto>.Success(MapToDetailsDto(path));
    }

    public async Task<Result<LearningPathDetailsDto>> GetLearningPathByIdAsync(Guid pathId, CancellationToken cancellationToken = default)
    {
        if (pathId == Guid.Empty)
        {
            return Result<LearningPathDetailsDto>.Failure("Invalid learning path identifier.", "INVALID_INPUT");
        }

        var path = await learningPathRepository.FindByIdWithTracksAsync(pathId, cancellationToken);

        if (path == null || path.Status != LearningPathStatus.Published)
        {
            return Result<LearningPathDetailsDto>.Failure("Learning path not found.", "NOT_FOUND");
        }

        return Result<LearningPathDetailsDto>.Success(MapToDetailsDto(path));
    }

    public async Task<Result<LessonDetailsDto>> GetLessonBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return Result<LessonDetailsDto>.Failure("Invalid lesson slug.", "INVALID_INPUT");
        }

        var normalizedSlug = slug.Trim().ToLowerInvariant();
        var lesson = await learningPathRepository.FindLessonBySlugAsync(normalizedSlug, cancellationToken);

        if (lesson == null || lesson.Status != LessonStatus.Published)
        {
            return Result<LessonDetailsDto>.Failure($"Lesson '{slug}' not found.", "NOT_FOUND");
        }

        return Result<LessonDetailsDto>.Success(MapToLessonDetailsDto(lesson));
    }

    public async Task<Result<LessonDetailsDto>> GetLessonByIdAsync(Guid lessonId, CancellationToken cancellationToken = default)
    {
        if (lessonId == Guid.Empty)
        {
            return Result<LessonDetailsDto>.Failure("Invalid lesson identifier.", "INVALID_INPUT");
        }

        var lesson = await learningPathRepository.FindLessonByIdAsync(lessonId, cancellationToken);

        if (lesson == null || lesson.Status != LessonStatus.Published)
        {
            return Result<LessonDetailsDto>.Failure("Lesson not found.", "NOT_FOUND");
        }

        return Result<LessonDetailsDto>.Success(MapToLessonDetailsDto(lesson));
    }

    private static LessonDetailsDto MapToLessonDetailsDto(Lesson lesson)
    {
        return new LessonDetailsDto(
            lesson.Id,
            lesson.ModuleId,
            lesson.Title,
            lesson.Slug,
            lesson.ContentMarkdown,
            lesson.ExternalUrl,
            lesson.Type.ToString(),
            lesson.Status.ToString(),
            lesson.DisplayOrder,
            lesson.EstimatedMinutes,
            lesson.IsFree,
            lesson.ConceptId
        );
    }

    private static LearningPathDetailsDto MapToDetailsDto(LearningPath path)
    {
        var trackDtos = path.Tracks
            .OrderBy(t => t.DisplayOrder)
            .Select(t => new TrackDetailsDto(
                t.Id,
                t.Title,
                t.Description,
                t.DisplayOrder,
                t.Modules
                    .OrderBy(m => m.DisplayOrder)
                    .Select(m => new ModuleDetailsDto(
                        m.Id,
                        m.Title,
                        m.Description,
                        m.DisplayOrder,
                        m.EstimatedMinutes,
                        m.Lessons
                            .Where(l => l.Status == LessonStatus.Published)
                            .OrderBy(l => l.DisplayOrder)
                            .Select(l => new LessonSummaryDto(
                                l.Id,
                                l.Title,
                                l.Slug,
                                l.Type.ToString(),
                                l.DisplayOrder,
                                l.EstimatedMinutes,
                                l.IsFree,
                                l.ConceptId
                            ))
                            .ToList()
                    ))
                    .ToList()
            ))
            .ToList();

        return new LearningPathDetailsDto(
            path.Id,
            path.Title,
            path.Slug,
            path.Description,
            path.ThumbnailUrl,
            path.Difficulty.ToString(),
            path.EstimatedHours,
            path.Status.ToString(),
            path.IsFeatured,
            trackDtos
        );
    }

    public async Task<Result<LearningPathSummaryDto>> CreateLearningPathAsync(
        CreateLearningPathRequest request,
        IEnumerable<string> callerRoles,
        CancellationToken cancellationToken = default)
    {
        // 1. RBAC Check
        if (!HasElevatedRole(callerRoles))
        {
            return Result<LearningPathSummaryDto>.Failure(
                "Forbidden: Only Mentors or Owners are authorized to create learning paths.",
                "FORBIDDEN"
            );
        }

        // 2. Validation
        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return Result<LearningPathSummaryDto>.Failure("Learning path title is required.", "INVALID_INPUT");
        }

        if (string.IsNullOrWhiteSpace(request.Slug))
        {
            return Result<LearningPathSummaryDto>.Failure("Learning path slug is required.", "INVALID_INPUT");
        }

        if (request.EstimatedHours <= 0)
        {
            return Result<LearningPathSummaryDto>.Failure("Estimated hours must be greater than zero.", "INVALID_INPUT");
        }

        var normalizedSlug = request.Slug.Trim().ToLowerInvariant();

        // 3. Uniqueness check
        if (await learningPathRepository.ExistsBySlugAsync(normalizedSlug, cancellationToken))
        {
            return Result<LearningPathSummaryDto>.Failure("A learning path with this slug already exists.", "SLUG_EXISTS");
        }

        // 4. Create entity
        var path = LearningPath.Create(
            request.Title.Trim(),
            normalizedSlug,
            request.Difficulty,
            request.EstimatedHours,
            request.Description?.Trim()
        );

        if (request.Publish)
        {
            path.Publish();
        }

        learningPathRepository.Add(path);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<LearningPathSummaryDto>.Success(MapToSummaryDto(path));
    }

    public async Task<Result<LearningPathSummaryDto>> UpdateLearningPathAsync(
        Guid pathId,
        UpdateLearningPathRequest request,
        IEnumerable<string> callerRoles,
        CancellationToken cancellationToken = default)
    {
        if (!HasElevatedRole(callerRoles))
        {
            return Result<LearningPathSummaryDto>.Failure(
                "Forbidden: Only Mentors or Owners are authorized to modify learning paths.",
                "FORBIDDEN"
            );
        }

        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return Result<LearningPathSummaryDto>.Failure("Learning path title is required.", "INVALID_INPUT");
        }

        if (request.EstimatedHours <= 0)
        {
            return Result<LearningPathSummaryDto>.Failure("Estimated hours must be greater than zero.", "INVALID_INPUT");
        }

        var path = await learningPathRepository.FindByIdAsync(pathId, trackForUpdate: true, cancellationToken);
        if (path == null)
        {
            return Result<LearningPathSummaryDto>.Failure("Learning path not found.", "NOT_FOUND");
        }

        path.Update(
            request.Title.Trim(),
            request.Difficulty,
            request.EstimatedHours,
            request.Description?.Trim(),
            request.ThumbnailUrl?.Trim(),
            request.IsFeatured
        );

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<LearningPathSummaryDto>.Success(MapToSummaryDto(path));
    }

    public async Task<Result<LearningPathSummaryDto>> PublishLearningPathAsync(
        Guid pathId,
        IEnumerable<string> callerRoles,
        CancellationToken cancellationToken = default)
    {
        if (!HasElevatedRole(callerRoles))
        {
            return Result<LearningPathSummaryDto>.Failure(
                "Forbidden: Only Mentors or Owners are authorized to publish learning paths.",
                "FORBIDDEN"
            );
        }

        var path = await learningPathRepository.FindByIdAsync(pathId, trackForUpdate: true, cancellationToken);
        if (path == null)
        {
            return Result<LearningPathSummaryDto>.Failure("Learning path not found.", "NOT_FOUND");
        }

        path.Publish();
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<LearningPathSummaryDto>.Success(MapToSummaryDto(path));
    }

    public async Task<Result<EnrollmentDto>> EnrollAsync(Guid userId, Guid learningPathId, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<EnrollmentDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var user = await userRepository.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            return Result<EnrollmentDto>.Failure("User account not found.", "USER_NOT_FOUND");
        }

        var path = await learningPathRepository.FindByIdAsync(learningPathId, trackForUpdate: false, cancellationToken);
        if (path == null || path.Status != LearningPathStatus.Published)
        {
            return Result<EnrollmentDto>.Failure("Cannot enroll in an unpublished or private learning path.", "PATH_NOT_ELIGIBLE");
        }

        var existingEnrollment = await learningPathRepository.GetEnrollmentAsync(userId, learningPathId, cancellationToken);
        if (existingEnrollment != null)
        {
            if (existingEnrollment.Status == EnrollmentStatus.Active)
            {
                return Result<EnrollmentDto>.Failure("User is already actively enrolled in this learning path.", "ALREADY_ENROLLED");
            }

            // Re-activate enrollment if previously paused or dropped
            existingEnrollment.Resume();
            await unitOfWork.SaveChangesAsync(cancellationToken);
            return Result<EnrollmentDto>.Success(MapToEnrollmentDto(existingEnrollment, path));
        }

        var enrollment = PathEnrollment.Create(userId, learningPathId);
        learningPathRepository.AddEnrollment(enrollment);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<EnrollmentDto>.Success(MapToEnrollmentDto(enrollment, path));
    }

    public async Task<Result<IReadOnlyList<EnrollmentDto>>> GetMyEnrollmentsAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<IReadOnlyList<EnrollmentDto>>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var user = await userRepository.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            return Result<IReadOnlyList<EnrollmentDto>>.Failure("User account not found.", "USER_NOT_FOUND");
        }

        var enrollments = await learningPathRepository.GetEnrollmentsForUserAsync(userId, cancellationToken);
        var dtos = enrollments
            .Select(e => MapToEnrollmentDto(e, e.LearningPath))
            .ToList();

        return Result<IReadOnlyList<EnrollmentDto>>.Success(dtos);
    }

    public async Task<Result<EnrollmentDto>> GetMyEnrollmentForPathAsync(Guid userId, Guid learningPathId, CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<EnrollmentDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var enrollment = await learningPathRepository.GetEnrollmentAsync(userId, learningPathId, cancellationToken);
        if (enrollment == null)
        {
            return Result<EnrollmentDto>.Failure("No enrollment found for this learning path.", "NOT_FOUND");
        }

        return Result<EnrollmentDto>.Success(MapToEnrollmentDto(enrollment, enrollment.LearningPath));
    }

    private static bool HasElevatedRole(IEnumerable<string> roles)
    {
        return roles != null && roles.Any(r => ElevatedRoles.Contains(r, StringComparer.OrdinalIgnoreCase));
    }

    private static LearningPathSummaryDto MapToSummaryDto(LearningPath path)
    {
        var tracksCount = path.Tracks?.Count ?? 0;
        var totalLessons = path.Tracks?
            .SelectMany(t => t.Modules ?? Enumerable.Empty<Module>())
            .SelectMany(m => m.Lessons ?? Enumerable.Empty<Lesson>())
            .Count() ?? 0;

        return new LearningPathSummaryDto(
            path.Id,
            path.Title,
            path.Slug,
            path.Description,
            path.ThumbnailUrl,
            path.Difficulty.ToString(),
            path.EstimatedHours,
            path.Status.ToString(),
            path.IsFeatured,
            tracksCount,
            totalLessons
        );
    }

    private static EnrollmentDto MapToEnrollmentDto(PathEnrollment enrollment, LearningPath? path)
    {
        return new EnrollmentDto(
            enrollment.Id,
            enrollment.UserId,
            enrollment.LearningPathId,
            path?.Title ?? "Learning Path",
            path?.Slug ?? string.Empty,
            enrollment.EnrolledAt,
            enrollment.Status.ToString(),
            enrollment.ProgressPercent,
            enrollment.CompletedAt
        );
    }
}
