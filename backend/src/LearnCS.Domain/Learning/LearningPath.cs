using LearnCS.Domain.Common;
using LearnCS.Domain.Knowledge;

namespace LearnCS.Domain.Learning;

/// <summary>
/// A structured learning journey (e.g., "CS Foundations", "Data Structures & Algorithms")
/// </summary>
public class LearningPath : BaseEntity
{
    public string Title { get; private set; } = string.Empty;
    public string Slug { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public string? ThumbnailUrl { get; private set; }
    public Knowledge.ConceptDifficulty Difficulty { get; private set; }
    public int EstimatedHours { get; private set; }
    public LearningPathStatus Status { get; private set; } = LearningPathStatus.Draft;
    public bool IsFeatured { get; private set; }

    public ICollection<Track> Tracks { get; private set; } = new List<Track>();
    public ICollection<PathEnrollment> Enrollments { get; private set; } = new List<PathEnrollment>();

    private LearningPath() { }

    public static LearningPath Create(string title, string slug, Knowledge.ConceptDifficulty difficulty,
        int estimatedHours, string? description = null)
        => new LearningPath
        {
            Title = title, Slug = slug.ToLowerInvariant(),
            Difficulty = difficulty, EstimatedHours = estimatedHours, Description = description
        };

    public void Publish() { Status = LearningPathStatus.Published; SetUpdated(); }
    public void Archive() { Status = LearningPathStatus.Archived; SetUpdated(); }

    public void Update(string title, Knowledge.ConceptDifficulty difficulty, int estimatedHours,
        string? description = null, string? thumbnailUrl = null, bool? isFeatured = null)
    {
        Title = title;
        Difficulty = difficulty;
        EstimatedHours = estimatedHours;
        Description = description;
        if (thumbnailUrl != null) ThumbnailUrl = thumbnailUrl;
        if (isFeatured.HasValue) IsFeatured = isFeatured.Value;
        SetUpdated();
    }
}

/// <summary>
/// A logical grouping of modules within a learning path.
/// </summary>
public class Track : BaseEntity
{
    public Guid LearningPathId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public int DisplayOrder { get; private set; }

    public LearningPath? LearningPath { get; private set; }
    public ICollection<Module> Modules { get; private set; } = new List<Module>();

    private Track() { }

    public static Track Create(Guid pathId, string title, int displayOrder, string? description = null)
        => new Track { LearningPathId = pathId, Title = title, DisplayOrder = displayOrder, Description = description };
}

/// <summary>
/// A module groups related lessons together within a track.
/// </summary>
public class Module : BaseEntity
{
    public Guid TrackId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public int DisplayOrder { get; private set; }
    public int EstimatedMinutes { get; private set; }

    public Track? Track { get; private set; }
    public ICollection<Lesson> Lessons { get; private set; } = new List<Lesson>();

    private Module() { }

    public static Module Create(Guid trackId, string title, int displayOrder,
        int estimatedMinutes = 0, string? description = null)
        => new Module
        {
            TrackId = trackId, Title = title, DisplayOrder = displayOrder,
            EstimatedMinutes = estimatedMinutes, Description = description
        };
}

/// <summary>
/// A single lesson within a module. May be linked to a knowledge concept.
/// </summary>
public class Lesson : BaseEntity
{
    public Guid ModuleId { get; private set; }
    public Guid? ConceptId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Slug { get; private set; } = string.Empty;
    public string? ContentMarkdown { get; private set; }
    public string? ExternalUrl { get; private set; }
    public LessonType Type { get; private set; }
    public LessonStatus Status { get; private set; } = LessonStatus.Draft;
    public int DisplayOrder { get; private set; }
    public int EstimatedMinutes { get; private set; }
    public bool IsFree { get; private set; } = true;

    public Module? Module { get; private set; }
    public ICollection<LessonResource> LessonResources { get; private set; } = new List<LessonResource>();
    public ICollection<LessonProgress> Progress { get; private set; } = new List<LessonProgress>();

    private Lesson() { }

    public static Lesson Create(Guid moduleId, string title, string slug, LessonType type,
        int displayOrder, int estimatedMinutes = 10, Guid? conceptId = null)
        => new Lesson
        {
            ModuleId = moduleId, Title = title, Slug = slug.ToLowerInvariant(),
            Type = type, DisplayOrder = displayOrder, EstimatedMinutes = estimatedMinutes,
            ConceptId = conceptId
        };

    public void Publish() { Status = LessonStatus.Published; SetUpdated(); }
    public void SetContent(string markdown) { ContentMarkdown = markdown; SetUpdated(); }
}

/// <summary>
/// A reusable learning resource that can be linked to lessons.
/// </summary>
public class LearningResource : BaseEntity
{
    public string Title { get; private set; } = string.Empty;
    public string Url { get; private set; } = string.Empty;
    public ResourceType Type { get; private set; }
    public string? Description { get; private set; }
    public Guid? ConceptId { get; private set; }
    public int? DurationMinutes { get; private set; }
    public bool IsFree { get; private set; } = true;

    public ICollection<LessonResource> LessonResources { get; private set; } = new List<LessonResource>();

    private LearningResource() { }

    public static LearningResource Create(string title, string url, ResourceType type,
        string? description = null, Guid? conceptId = null, int? durationMinutes = null)
        => new LearningResource
        {
            Title = title, Url = url, Type = type,
            Description = description, ConceptId = conceptId, DurationMinutes = durationMinutes
        };
}

public class LessonResource
{
    public Guid LessonId { get; private set; }
    public Guid ResourceId { get; private set; }
    public int DisplayOrder { get; private set; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public Lesson? Lesson { get; private set; }
    public LearningResource? Resource { get; private set; }

    private LessonResource() { }

    public static LessonResource Create(Guid lessonId, Guid resourceId, int order = 0)
        => new LessonResource { LessonId = lessonId, ResourceId = resourceId, DisplayOrder = order };
}

/// <summary>
/// Tracks a user's enrollment in a learning path.
/// </summary>
public class PathEnrollment : BaseEntity
{
    public Guid UserId { get; private set; }
    public Guid LearningPathId { get; private set; }
    public DateTime EnrolledAt { get; private set; } = DateTime.UtcNow;
    public EnrollmentStatus Status { get; private set; } = EnrollmentStatus.Active;
    public DateTime? CompletedAt { get; private set; }
    public decimal ProgressPercent { get; private set; }

    public LearningPath? LearningPath { get; private set; }

    private PathEnrollment() { }

    public static PathEnrollment Create(Guid userId, Guid pathId)
        => new PathEnrollment { UserId = userId, LearningPathId = pathId };

    public void UpdateProgress(decimal percent)
    {
        ProgressPercent = Math.Clamp(percent, 0, 100);
        if (ProgressPercent >= 100) { Status = EnrollmentStatus.Completed; CompletedAt = DateTime.UtcNow; }
        SetUpdated();
    }

    public void Pause() { Status = EnrollmentStatus.Paused; SetUpdated(); }
    public void Resume() { Status = EnrollmentStatus.Active; SetUpdated(); }
}

/// <summary>
/// Tracks a user's progress on a specific lesson.
/// </summary>
public class LessonProgress : BaseEntity
{
    public Guid UserId { get; private set; }
    public Guid LessonId { get; private set; }
    public LessonProgressStatus Status { get; private set; } = LessonProgressStatus.NotStarted;
    public DateTime? StartedAt { get; private set; }
    public DateTime? CompletedAt { get; private set; }
    public int TimeSpentSeconds { get; private set; }

    public Lesson? Lesson { get; private set; }

    private LessonProgress() { }

    public static LessonProgress Create(Guid userId, Guid lessonId)
        => new LessonProgress { UserId = userId, LessonId = lessonId };

    public void Start()
    {
        if (Status == LessonProgressStatus.NotStarted)
        {
            Status = LessonProgressStatus.InProgress;
            StartedAt = DateTime.UtcNow;
            SetUpdated();
        }
    }

    public void Complete(int timeSpentSeconds = 0)
    {
        Status = LessonProgressStatus.Completed;
        CompletedAt = DateTime.UtcNow;
        TimeSpentSeconds = timeSpentSeconds;
        SetUpdated();
    }
}

/// <summary>
/// A practical project that learners can build to apply their knowledge.
/// </summary>
public class Project : BaseEntity
{
    public string Title { get; private set; } = string.Empty;
    public string Slug { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public ProjectDifficulty Difficulty { get; private set; }
    public string? Instructions { get; private set; }
    public int EstimatedHours { get; private set; }
    public ProjectStatus Status { get; private set; } = ProjectStatus.Draft;
    public string? RequiredSkillsJson { get; private set; }

    public ICollection<ProjectConcept> ProjectConcepts { get; private set; } = new List<ProjectConcept>();
    public ICollection<ProjectSubmission> Submissions { get; private set; } = new List<ProjectSubmission>();

    private Project() { }

    public static Project Create(string title, string slug, ProjectDifficulty difficulty,
        int estimatedHours, string? description = null)
        => new Project
        {
            Title = title, Slug = slug.ToLowerInvariant(),
            Difficulty = difficulty, EstimatedHours = estimatedHours, Description = description
        };

    public void Publish() { Status = ProjectStatus.Published; SetUpdated(); }
}

public class ProjectConcept
{
    public Guid ProjectId { get; private set; }
    public Guid ConceptId { get; private set; }
    public bool IsRequired { get; private set; } = true;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public Project? Project { get; private set; }

    private ProjectConcept() { }

    public static ProjectConcept Create(Guid projectId, Guid conceptId, bool isRequired = true)
        => new ProjectConcept { ProjectId = projectId, ConceptId = conceptId, IsRequired = isRequired };
}

public class ProjectSubmission : BaseEntity
{
    public Guid UserId { get; private set; }
    public Guid ProjectId { get; private set; }
    public SubmissionStatus Status { get; private set; } = SubmissionStatus.NotStarted;
    public string? RepositoryUrl { get; private set; }
    public string? LiveUrl { get; private set; }
    public string? Notes { get; private set; }
    public string? FeedbackNotes { get; private set; }
    public DateTime? SubmittedAt { get; private set; }
    public DateTime? ReviewedAt { get; private set; }

    public Project? Project { get; private set; }

    private ProjectSubmission() { }

    public static ProjectSubmission Create(Guid userId, Guid projectId)
        => new ProjectSubmission { UserId = userId, ProjectId = projectId, Status = SubmissionStatus.InProgress };

    public void Submit(string? repoUrl = null, string? liveUrl = null, string? notes = null)
    {
        Status = SubmissionStatus.Submitted;
        RepositoryUrl = repoUrl;
        LiveUrl = liveUrl;
        Notes = notes;
        SubmittedAt = DateTime.UtcNow;
        SetUpdated();
    }

    public void Review(string? feedback)
    {
        Status = SubmissionStatus.Reviewed;
        FeedbackNotes = feedback;
        ReviewedAt = DateTime.UtcNow;
        SetUpdated();
    }
}
