using LearnCS.Domain.Common;

namespace LearnCS.Domain.Knowledge;

/// <summary>
/// Core node in the Knowledge Graph. Represents an atomic learning concept.
/// Examples: Variables, Loops, Sorting, OOP, Databases.
/// </summary>
public class Concept : BaseEntity
{
    public string Title { get; private set; } = string.Empty;
    public string Slug { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public ConceptDifficulty Difficulty { get; private set; } = ConceptDifficulty.Beginner;
    public string Category { get; private set; } = string.Empty;
    public ConceptStatus Status { get; private set; } = ConceptStatus.Draft;
    public int? EstimatedMinutes { get; private set; }
    public string? IconUrl { get; private set; }
    public string? MetadataJson { get; private set; }

    // Knowledge Graph edges
    public ICollection<ConceptRelationship> OutgoingRelationships { get; private set; } = new List<ConceptRelationship>();
    public ICollection<ConceptRelationship> IncomingRelationships { get; private set; } = new List<ConceptRelationship>();
    public ICollection<LearningObjective> LearningObjectives { get; private set; } = new List<LearningObjective>();
    public ICollection<ConceptTag> ConceptTags { get; private set; } = new List<ConceptTag>();

    private Concept() { }

    public static Concept Create(string title, string slug, string category,
        ConceptDifficulty difficulty, string? description = null, int? estimatedMinutes = null)
    {
        return new Concept
        {
            Title = title,
            Slug = slug.ToLowerInvariant(),
            Category = category,
            Difficulty = difficulty,
            Description = description,
            EstimatedMinutes = estimatedMinutes,
            Status = ConceptStatus.Draft
        };
    }

    public void Publish() { Status = ConceptStatus.Published; SetUpdated(); }
    public void Archive() { Status = ConceptStatus.Archived; SetUpdated(); }

    public void Update(string title, string? description, ConceptDifficulty difficulty,
        string category, int? estimatedMinutes)
    {
        Title = title;
        Description = description;
        Difficulty = difficulty;
        Category = category;
        EstimatedMinutes = estimatedMinutes;
        SetUpdated();
    }
}

/// <summary>
/// Directed edge in the Knowledge Graph connecting two concepts.
/// </summary>
public class ConceptRelationship : BaseEntity
{
    public Guid SourceConceptId { get; private set; }
    public Guid TargetConceptId { get; private set; }
    public RelationType RelationType { get; private set; }
    public decimal Weight { get; private set; } = 1.0m;

    public Concept? SourceConcept { get; private set; }
    public Concept? TargetConcept { get; private set; }

    private ConceptRelationship() { }

    public static ConceptRelationship Create(Guid sourceId, Guid targetId,
        RelationType type, decimal weight = 1.0m)
    {
        if (sourceId == targetId)
            throw new InvalidOperationException("A concept cannot have a relationship with itself.");

        return new ConceptRelationship
        {
            SourceConceptId = sourceId,
            TargetConceptId = targetId,
            RelationType = type,
            Weight = weight
        };
    }
}

/// <summary>
/// Measurable learning objective for a concept, aligned to Bloom's taxonomy.
/// </summary>
public class LearningObjective : BaseEntity
{
    public Guid ConceptId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public BloomLevel BloomLevel { get; private set; }
    public int DisplayOrder { get; private set; }
    public bool IsActive { get; private set; } = true;

    public Concept? Concept { get; private set; }

    private LearningObjective() { }

    public static LearningObjective Create(Guid conceptId, string title, BloomLevel bloomLevel,
        string? description = null, int displayOrder = 0)
        => new LearningObjective
        {
            ConceptId = conceptId, Title = title, BloomLevel = bloomLevel,
            Description = description, DisplayOrder = displayOrder
        };
}

public class Tag : BaseEntity
{
    public string Name { get; private set; } = string.Empty;
    public string Slug { get; private set; } = string.Empty;
    public string? Color { get; private set; }

    public ICollection<ConceptTag> ConceptTags { get; private set; } = new List<ConceptTag>();

    private Tag() { }

    public static Tag Create(string name, string slug, string? color = null)
        => new Tag { Name = name, Slug = slug.ToLowerInvariant(), Color = color };
}

public class ConceptTag
{
    public Guid ConceptId { get; private set; }
    public Guid TagId { get; private set; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public Concept? Concept { get; private set; }
    public Tag? Tag { get; private set; }

    private ConceptTag() { }

    public static ConceptTag Create(Guid conceptId, Guid tagId)
        => new ConceptTag { ConceptId = conceptId, TagId = tagId };
}
