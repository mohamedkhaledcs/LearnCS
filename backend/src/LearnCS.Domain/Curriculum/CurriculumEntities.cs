namespace LearnCS.Domain.Curriculum;

public enum ContentPublishStatus
{
    Draft = 0,
    Review = 1,
    Published = 2
}

public enum UnitProgressStatus
{
    NotStarted = 0,
    InProgress = 1,
    Completed = 2,
    Mastered = 3
}

/// <summary>
/// Represents the canonical curriculum path (e.g., "pre-programming", "algorithms", "competitive-programming").
/// </summary>
public class CurriculumPath
{
    public string Id { get; private set; } = string.Empty;
    public string TitleEn { get; private set; } = string.Empty;
    public string TitleAr { get; private set; } = string.Empty;
    public string DescriptionEn { get; private set; } = string.Empty;
    public string DescriptionAr { get; private set; } = string.Empty;
    public string? TargetAudienceEn { get; private set; }
    public string? TargetAudienceAr { get; private set; }
    public string Category { get; private set; } = "Core Computer Science";
    public int DisplayOrder { get; private set; }
    public string? PrerequisitesJson { get; private set; }
    public string? RecommendedNextPathsJson { get; private set; }
    public ContentPublishStatus PublishStatus { get; private set; } = ContentPublishStatus.Published;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; private set; }

    public ICollection<CurriculumModule> Modules { get; private set; } = new List<CurriculumModule>();

    private CurriculumPath() { }

    public static CurriculumPath Create(
        string id,
        string titleEn,
        string titleAr,
        string descriptionEn,
        string descriptionAr,
        string category,
        int displayOrder,
        string? targetAudienceEn = null,
        string? targetAudienceAr = null,
        string? prerequisitesJson = null,
        string? recommendedNextPathsJson = null,
        ContentPublishStatus publishStatus = ContentPublishStatus.Published)
    {
        return new CurriculumPath
        {
            Id = id.Trim().ToLowerInvariant(),
            TitleEn = titleEn,
            TitleAr = titleAr,
            DescriptionEn = descriptionEn,
            DescriptionAr = descriptionAr,
            Category = category,
            DisplayOrder = displayOrder,
            TargetAudienceEn = targetAudienceEn,
            TargetAudienceAr = targetAudienceAr,
            PrerequisitesJson = prerequisitesJson,
            RecommendedNextPathsJson = recommendedNextPathsJson,
            PublishStatus = publishStatus
        };
    }

    public void Update(
        string titleEn,
        string titleAr,
        string descriptionEn,
        string descriptionAr,
        string category,
        int displayOrder,
        string? targetAudienceEn,
        string? targetAudienceAr,
        string? prerequisitesJson,
        string? recommendedNextPathsJson,
        ContentPublishStatus publishStatus)
    {
        TitleEn = titleEn;
        TitleAr = titleAr;
        DescriptionEn = descriptionEn;
        DescriptionAr = descriptionAr;
        Category = category;
        DisplayOrder = displayOrder;
        TargetAudienceEn = targetAudienceEn;
        TargetAudienceAr = targetAudienceAr;
        PrerequisitesJson = prerequisitesJson;
        RecommendedNextPathsJson = recommendedNextPathsJson;
        PublishStatus = publishStatus;
        UpdatedAt = DateTime.UtcNow;
    }
}

/// <summary>
/// A module inside a CurriculumPath. Contains unit placements rather than owning content copies.
/// </summary>
public class CurriculumModule
{
    public string Id { get; private set; } = string.Empty;
    public string PathId { get; private set; } = string.Empty;
    public string TitleEn { get; private set; } = string.Empty;
    public string TitleAr { get; private set; } = string.Empty;
    public string DescriptionEn { get; private set; } = string.Empty;
    public string DescriptionAr { get; private set; } = string.Empty;
    public int DisplayOrder { get; private set; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; private set; }

    public CurriculumPath? Path { get; private set; }
    public ICollection<ModuleUnitPlacement> Placements { get; private set; } = new List<ModuleUnitPlacement>();

    private CurriculumModule() { }

    public static CurriculumModule Create(
        string id,
        string pathId,
        string titleEn,
        string titleAr,
        string descriptionEn,
        string descriptionAr,
        int displayOrder)
    {
        return new CurriculumModule
        {
            Id = id.Trim().ToLowerInvariant(),
            PathId = pathId.Trim().ToLowerInvariant(),
            TitleEn = titleEn,
            TitleAr = titleAr,
            DescriptionEn = descriptionEn,
            DescriptionAr = descriptionAr,
            DisplayOrder = displayOrder
        };
    }

    public void Update(string titleEn, string titleAr, string descriptionEn, string descriptionAr, int displayOrder)
    {
        TitleEn = titleEn;
        TitleAr = titleAr;
        DescriptionEn = descriptionEn;
        DescriptionAr = descriptionAr;
        DisplayOrder = displayOrder;
        UpdatedAt = DateTime.UtcNow;
    }
}

/// <summary>
/// Canonical identity of a Computer Science subject (e.g., "concept-binary-search").
/// </summary>
public class CanonicalConceptRecord
{
    public string Id { get; private set; } = string.Empty;
    public string TitleEn { get; private set; } = string.Empty;
    public string TitleAr { get; private set; } = string.Empty;
    public string DescriptionEn { get; private set; } = string.Empty;
    public string DescriptionAr { get; private set; } = string.Empty;
    public string Domain { get; private set; } = string.Empty;
    public ContentPublishStatus PublishStatus { get; private set; } = ContentPublishStatus.Published;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; private set; }

    public ICollection<ReusableUnit> Units { get; private set; } = new List<ReusableUnit>();

    private CanonicalConceptRecord() { }

    public static CanonicalConceptRecord Create(
        string id,
        string titleEn,
        string titleAr,
        string descriptionEn,
        string descriptionAr,
        string domain,
        ContentPublishStatus publishStatus = ContentPublishStatus.Published)
    {
        return new CanonicalConceptRecord
        {
            Id = id.Trim().ToLowerInvariant(),
            TitleEn = titleEn,
            TitleAr = titleAr,
            DescriptionEn = descriptionEn,
            DescriptionAr = descriptionAr,
            Domain = domain,
            PublishStatus = publishStatus
        };
    }

    public void Update(string titleEn, string titleAr, string descriptionEn, string descriptionAr, string domain, ContentPublishStatus publishStatus)
    {
        TitleEn = titleEn;
        TitleAr = titleAr;
        DescriptionEn = descriptionEn;
        DescriptionAr = descriptionAr;
        Domain = domain;
        PublishStatus = publishStatus;
        UpdatedAt = DateTime.UtcNow;
    }
}

/// <summary>
/// A reusable pedagogical layer for a CanonicalConcept (e.g., "unit-binary-search-foundations").
/// Educational content and progress belong here rather than to path placements.
/// </summary>
public class ReusableUnit
{
    public string Id { get; private set; } = string.Empty;
    public string ConceptId { get; private set; } = string.Empty;
    public string TitleEn { get; private set; } = string.Empty;
    public string TitleAr { get; private set; } = string.Empty;
    public string DescriptionEn { get; private set; } = string.Empty;
    public string DescriptionAr { get; private set; } = string.Empty;
    public string Difficulty { get; private set; } = "beginner";
    public int EstimatedMinutes { get; private set; } = 30;
    public int Version { get; private set; } = 1;
    public bool IsFreeTier { get; private set; } = true;
    public string TagsJson { get; private set; } = "[]";
    public string? PrerequisitesJson { get; private set; }
    public string? InteractiveModuleIdsJson { get; private set; }
    public string? ExternalReferencesJson { get; private set; }
    public string? ObjectivesEnJson { get; private set; }
    public string? ObjectivesArJson { get; private set; }
    public int QuizPassPercentage { get; private set; } = 60;
    public int QuizQuestionCount { get; private set; } = 5;
    public ContentPublishStatus PublishStatus { get; private set; } = ContentPublishStatus.Published;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; private set; }

    public CanonicalConceptRecord? Concept { get; private set; }
    public ICollection<UnitSection> Sections { get; private set; } = new List<UnitSection>();
    public ICollection<ModuleUnitPlacement> Placements { get; private set; } = new List<ModuleUnitPlacement>();
    public ICollection<UnitQuestionMapping> QuestionMappings { get; private set; } = new List<UnitQuestionMapping>();

    private ReusableUnit() { }

    public static ReusableUnit Create(
        string id,
        string conceptId,
        string titleEn,
        string titleAr,
        string descriptionEn,
        string descriptionAr,
        string difficulty,
        int estimatedMinutes,
        string tagsJson,
        string? prerequisitesJson = null,
        string? interactiveModuleIdsJson = null,
        string? externalReferencesJson = null,
        string? objectivesEnJson = null,
        string? objectivesArJson = null,
        bool isFreeTier = true,
        int quizPassPercentage = 60,
        int quizQuestionCount = 5,
        ContentPublishStatus publishStatus = ContentPublishStatus.Published)
    {
        return new ReusableUnit
        {
            Id = id.Trim().ToLowerInvariant(),
            ConceptId = conceptId.Trim().ToLowerInvariant(),
            TitleEn = titleEn,
            TitleAr = titleAr,
            DescriptionEn = descriptionEn,
            DescriptionAr = descriptionAr,
            Difficulty = difficulty,
            EstimatedMinutes = estimatedMinutes,
            TagsJson = tagsJson,
            PrerequisitesJson = prerequisitesJson,
            InteractiveModuleIdsJson = interactiveModuleIdsJson,
            ExternalReferencesJson = externalReferencesJson,
            ObjectivesEnJson = objectivesEnJson,
            ObjectivesArJson = objectivesArJson,
            IsFreeTier = isFreeTier,
            QuizPassPercentage = quizPassPercentage,
            QuizQuestionCount = quizQuestionCount,
            PublishStatus = publishStatus
        };
    }

    public void UpdateMetadata(
        string titleEn,
        string titleAr,
        string descriptionEn,
        string descriptionAr,
        string difficulty,
        int estimatedMinutes,
        string tagsJson,
        string? prerequisitesJson,
        string? interactiveModuleIdsJson,
        string? externalReferencesJson,
        string? objectivesEnJson,
        string? objectivesArJson,
        bool isFreeTier,
        int quizPassPercentage,
        int quizQuestionCount,
        ContentPublishStatus publishStatus)
    {
        TitleEn = titleEn;
        TitleAr = titleAr;
        DescriptionEn = descriptionEn;
        DescriptionAr = descriptionAr;
        Difficulty = difficulty;
        EstimatedMinutes = estimatedMinutes;
        TagsJson = tagsJson;
        PrerequisitesJson = prerequisitesJson;
        InteractiveModuleIdsJson = interactiveModuleIdsJson;
        ExternalReferencesJson = externalReferencesJson;
        ObjectivesEnJson = objectivesEnJson;
        ObjectivesArJson = objectivesArJson;
        IsFreeTier = isFreeTier;
        QuizPassPercentage = quizPassPercentage;
        QuizQuestionCount = quizQuestionCount;
        PublishStatus = publishStatus;
        Version++;
        UpdatedAt = DateTime.UtcNow;
    }
}

/// <summary>
/// Placement reference linking a CurriculumModule to a ReusableUnit without duplicating unit content.
/// </summary>
public class ModuleUnitPlacement
{
    public string ModuleId { get; private set; } = string.Empty;
    public string UnitId { get; private set; } = string.Empty;
    public int DisplayOrder { get; private set; }
    public bool IsOptional { get; private set; }

    public CurriculumModule? Module { get; private set; }
    public ReusableUnit? Unit { get; private set; }

    private ModuleUnitPlacement() { }

    public static ModuleUnitPlacement Create(string moduleId, string unitId, int displayOrder, bool isOptional = false)
        => new ModuleUnitPlacement
        {
            ModuleId = moduleId.Trim().ToLowerInvariant(),
            UnitId = unitId.Trim().ToLowerInvariant(),
            DisplayOrder = displayOrder,
            IsOptional = isOptional
        };

    public void UpdateOrder(int displayOrder, bool isOptional)
    {
        DisplayOrder = displayOrder;
        IsOptional = isOptional;
    }
}

/// <summary>
/// A structured section within a ReusableUnit lesson (theory, example, code, interactive, pitfalls, summary).
/// </summary>
public class UnitSection
{
    public string Id { get; private set; } = string.Empty;
    public string UnitId { get; private set; } = string.Empty;
    public string Type { get; private set; } = "theory";
    public string TitleEn { get; private set; } = string.Empty;
    public string TitleAr { get; private set; } = string.Empty;
    public string ContentEn { get; private set; } = string.Empty;
    public string ContentAr { get; private set; } = string.Empty;
    public string? CodeSnippet { get; private set; }
    public string? CodeLanguage { get; private set; }
    public string? CodeExplanationEn { get; private set; }
    public string? CodeExplanationAr { get; private set; }
    public string? ExpectedOutput { get; private set; }
    public string? InteractiveModuleId { get; private set; }
    public string? InlineQuestionsJson { get; private set; }
    public int DisplayOrder { get; private set; }
    public bool IsRequired { get; private set; } = true;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; private set; }

    public ReusableUnit? Unit { get; private set; }

    private UnitSection() { }

    public static UnitSection Create(
        string id,
        string unitId,
        string type,
        string titleEn,
        string titleAr,
        string contentEn,
        string contentAr,
        int displayOrder,
        bool isRequired = true,
        string? codeSnippet = null,
        string? codeLanguage = null,
        string? codeExplanationEn = null,
        string? codeExplanationAr = null,
        string? expectedOutput = null,
        string? interactiveModuleId = null,
        string? inlineQuestionsJson = null)
    {
        return new UnitSection
        {
            Id = id.Trim(),
            UnitId = unitId.Trim().ToLowerInvariant(),
            Type = type,
            TitleEn = titleEn,
            TitleAr = titleAr,
            ContentEn = contentEn,
            ContentAr = contentAr,
            DisplayOrder = displayOrder,
            IsRequired = isRequired,
            CodeSnippet = codeSnippet,
            CodeLanguage = codeLanguage,
            CodeExplanationEn = codeExplanationEn,
            CodeExplanationAr = codeExplanationAr,
            ExpectedOutput = expectedOutput,
            InteractiveModuleId = interactiveModuleId,
            InlineQuestionsJson = inlineQuestionsJson
        };
    }

    public void Update(
        string type,
        string titleEn,
        string titleAr,
        string contentEn,
        string contentAr,
        int displayOrder,
        bool isRequired,
        string? codeSnippet,
        string? codeLanguage,
        string? codeExplanationEn,
        string? codeExplanationAr,
        string? expectedOutput,
        string? interactiveModuleId,
        string? inlineQuestionsJson)
    {
        Type = type;
        TitleEn = titleEn;
        TitleAr = titleAr;
        ContentEn = contentEn;
        ContentAr = contentAr;
        DisplayOrder = displayOrder;
        IsRequired = isRequired;
        CodeSnippet = codeSnippet;
        CodeLanguage = codeLanguage;
        CodeExplanationEn = codeExplanationEn;
        CodeExplanationAr = codeExplanationAr;
        ExpectedOutput = expectedOutput;
        InteractiveModuleId = interactiveModuleId;
        InlineQuestionsJson = inlineQuestionsJson;
        UpdatedAt = DateTime.UtcNow;
    }
}

/// <summary>
/// Relational question bank record supporting bilingual assessment questions across sections, units, and paths.
/// </summary>
public class QuestionBankItem
{
    public string Id { get; private set; } = string.Empty;
    public string Domain { get; private set; } = string.Empty;
    public string Topic { get; private set; } = string.Empty;
    public string Subtopic { get; private set; } = string.Empty;
    public string? Specialization { get; private set; }
    public string Difficulty { get; private set; } = "medium";
    public string QuestionType { get; private set; } = "concept";
    public string? CodeSnippet { get; private set; }
    public string? CodeLanguage { get; private set; }
    public string QuestionEn { get; private set; } = string.Empty;
    public string QuestionAr { get; private set; } = string.Empty;
    public string? ExplanationEn { get; private set; }
    public string? ExplanationAr { get; private set; }
    public string TagsJson { get; private set; } = "[]";
    public int EstimatedTimeSeconds { get; private set; } = 60;
    public ContentPublishStatus PublishStatus { get; private set; } = ContentPublishStatus.Published;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; private set; }

    public ICollection<QuestionBankOption> Options { get; private set; } = new List<QuestionBankOption>();
    public ICollection<UnitQuestionMapping> UnitMappings { get; private set; } = new List<UnitQuestionMapping>();

    private QuestionBankItem() { }

    public static QuestionBankItem Create(
        string id,
        string domain,
        string topic,
        string subtopic,
        string difficulty,
        string questionType,
        string questionEn,
        string questionAr,
        string? explanationEn = null,
        string? explanationAr = null,
        string? codeSnippet = null,
        string? codeLanguage = null,
        string? specialization = null,
        string tagsJson = "[]",
        int estimatedTimeSeconds = 60,
        ContentPublishStatus publishStatus = ContentPublishStatus.Published)
    {
        return new QuestionBankItem
        {
            Id = id.Trim(),
            Domain = domain,
            Topic = topic,
            Subtopic = subtopic,
            Difficulty = difficulty.ToLowerInvariant(),
            QuestionType = questionType,
            QuestionEn = questionEn,
            QuestionAr = questionAr,
            ExplanationEn = explanationEn,
            ExplanationAr = explanationAr,
            CodeSnippet = codeSnippet,
            CodeLanguage = codeLanguage,
            Specialization = specialization,
            TagsJson = tagsJson,
            EstimatedTimeSeconds = estimatedTimeSeconds,
            PublishStatus = publishStatus
        };
    }

    public void Update(
        string domain,
        string topic,
        string subtopic,
        string difficulty,
        string questionType,
        string questionEn,
        string questionAr,
        string? explanationEn,
        string? explanationAr,
        string? codeSnippet,
        string? codeLanguage,
        string? specialization,
        string tagsJson,
        ContentPublishStatus publishStatus)
    {
        Domain = domain;
        Topic = topic;
        Subtopic = subtopic;
        Difficulty = difficulty.ToLowerInvariant();
        QuestionType = questionType;
        QuestionEn = questionEn;
        QuestionAr = questionAr;
        ExplanationEn = explanationEn;
        ExplanationAr = explanationAr;
        CodeSnippet = codeSnippet;
        CodeLanguage = codeLanguage;
        Specialization = specialization;
        TagsJson = tagsJson;
        PublishStatus = publishStatus;
        UpdatedAt = DateTime.UtcNow;
    }
}

/// <summary>
/// Relational answer option for a QuestionBankItem. Never returned with IsCorrect before quiz submission.
/// </summary>
public class QuestionBankOption
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string QuestionId { get; private set; } = string.Empty;
    public string OptionKey { get; private set; } = string.Empty;
    public string TextEn { get; private set; } = string.Empty;
    public string TextAr { get; private set; } = string.Empty;
    public bool IsCorrect { get; private set; }
    public int DisplayOrder { get; private set; }

    public QuestionBankItem? Question { get; private set; }

    private QuestionBankOption() { }

    public static QuestionBankOption Create(
        string questionId,
        string optionKey,
        string textEn,
        string textAr,
        bool isCorrect,
        int displayOrder)
    {
        return new QuestionBankOption
        {
            Id = Guid.NewGuid(),
            QuestionId = questionId,
            OptionKey = optionKey,
            TextEn = textEn,
            TextAr = textAr,
            IsCorrect = isCorrect,
            DisplayOrder = displayOrder
        };
    }
}

/// <summary>
/// Maps a reusable QuestionBankItem to a ReusableUnit and optionally to a specific UnitSection.
/// </summary>
public class UnitQuestionMapping
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string UnitId { get; private set; } = string.Empty;
    public string? SectionId { get; private set; }
    public string QuestionId { get; private set; } = string.Empty;
    public int DisplayOrder { get; private set; }

    public ReusableUnit? Unit { get; private set; }
    public QuestionBankItem? Question { get; private set; }

    private UnitQuestionMapping() { }

    public static UnitQuestionMapping Create(string unitId, string questionId, string? sectionId = null, int displayOrder = 0)
        => new UnitQuestionMapping
        {
            Id = Guid.NewGuid(),
            UnitId = unitId.Trim().ToLowerInvariant(),
            SectionId = sectionId,
            QuestionId = questionId.Trim(),
            DisplayOrder = displayOrder
        };
}

/// <summary>
/// Persistent progress for a user on a canonical ReusableUnit (shared across all learning paths).
/// </summary>
public class UserUnitProgress
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public Guid UserId { get; private set; }
    public string UnitId { get; private set; } = string.Empty;
    public UnitProgressStatus Status { get; private set; } = UnitProgressStatus.NotStarted;
    public decimal MasteryScore { get; private set; }
    public int TimeSpentSeconds { get; private set; }
    public string? LastSectionId { get; private set; }
    public DateTime StartedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; private set; }
    public DateTime LastEvaluatedAt { get; private set; } = DateTime.UtcNow;

    private UserUnitProgress() { }

    public static UserUnitProgress Create(Guid userId, string unitId)
        => new UserUnitProgress
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            UnitId = unitId.Trim().ToLowerInvariant(),
            Status = UnitProgressStatus.InProgress
        };

    public void RecordActivity(int addedSeconds, string? sectionId = null)
    {
        if (addedSeconds > 0) TimeSpentSeconds += addedSeconds;
        if (!string.IsNullOrWhiteSpace(sectionId)) LastSectionId = sectionId.Trim().ToLowerInvariant();
        LastEvaluatedAt = DateTime.UtcNow;
    }

    public void MarkCompleted(decimal masteryScore, int addedSeconds = 0)
    {
        Status = masteryScore >= 85 ? UnitProgressStatus.Mastered : UnitProgressStatus.Completed;
        MasteryScore = Math.Max(MasteryScore, Math.Clamp(masteryScore, 0, 100));
        if (addedSeconds > 0) TimeSpentSeconds += addedSeconds;
        CompletedAt ??= DateTime.UtcNow;
        LastEvaluatedAt = DateTime.UtcNow;
    }
}

/// <summary>
/// Persistent progress for a user on an individual UnitSection and its checkpoint.
/// </summary>
public class UserSectionProgress
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public Guid UserId { get; private set; }
    public string UnitId { get; private set; } = string.Empty;
    public string SectionId { get; private set; } = string.Empty;
    public bool IsCompleted { get; private set; }
    public bool CheckpointPassed { get; private set; }
    public int TimeSpentSeconds { get; private set; }
    public DateTime? CompletedAt { get; private set; }
    public DateTime UpdatedAt { get; private set; } = DateTime.UtcNow;

    private UserSectionProgress() { }

    public static UserSectionProgress Create(Guid userId, string unitId, string sectionId)
        => new UserSectionProgress
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            UnitId = unitId.Trim().ToLowerInvariant(),
            SectionId = sectionId.Trim()
        };

    public void Complete(bool checkpointPassed, int timeSpentSeconds = 0)
    {
        IsCompleted = true;
        if (checkpointPassed) CheckpointPassed = true;
        if (timeSpentSeconds > 0) TimeSpentSeconds += timeSpentSeconds;
        CompletedAt ??= DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }
}

/// <summary>
/// Persistent assessment attempt record for section checkpoints, unit quizzes, path assessments, and diagnostics.
/// </summary>
public class UnitQuizAttempt
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public Guid UserId { get; private set; }
    public string Scope { get; private set; } = "unit"; // section | unit | path | diagnostic
    public string ScopeId { get; private set; } = string.Empty;
    public string? PathId { get; private set; }
    public decimal Score { get; private set; }
    public decimal MaxScore { get; private set; }
    public decimal Percentage { get; private set; }
    public decimal PassThreshold { get; private set; } = 60;
    public bool Passed { get; private set; }
    public bool IsCompleted { get; private set; }
    public string QuestionIdsJson { get; private set; } = "[]";
    public DateTime StartedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; private set; }

    public ICollection<UnitQuizAttemptAnswer> Answers { get; private set; } = new List<UnitQuizAttemptAnswer>();

    private UnitQuizAttempt() { }

    public static UnitQuizAttempt Create(
        Guid userId,
        string scope,
        string scopeId,
        string questionIdsJson,
        decimal passThreshold = 60,
        string? pathId = null)
    {
        return new UnitQuizAttempt
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Scope = scope,
            ScopeId = scopeId,
            PathId = pathId,
            QuestionIdsJson = questionIdsJson,
            PassThreshold = passThreshold
        };
    }

    public void Complete(decimal score, decimal maxScore)
    {
        Score = score;
        MaxScore = maxScore;
        Percentage = maxScore > 0 ? Math.Round(score / maxScore * 100m, 2) : 0;
        Passed = Percentage >= PassThreshold;
        IsCompleted = true;
        CompletedAt = DateTime.UtcNow;
    }
}

/// <summary>
/// Relational answer row for a UnitQuizAttempt.
/// </summary>
public class UnitQuizAttemptAnswer
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public Guid AttemptId { get; private set; }
    public string QuestionId { get; private set; } = string.Empty;
    public string SelectedOptionKeysJson { get; private set; } = "[]";
    public bool IsCorrect { get; private set; }
    public int PointsEarned { get; private set; }
    public DateTime AnsweredAt { get; private set; } = DateTime.UtcNow;

    public UnitQuizAttempt? Attempt { get; private set; }

    private UnitQuizAttemptAnswer() { }

    public static UnitQuizAttemptAnswer Create(
        Guid attemptId,
        string questionId,
        string selectedOptionKeysJson,
        bool isCorrect,
        int pointsEarned)
    {
        return new UnitQuizAttemptAnswer
        {
            Id = Guid.NewGuid(),
            AttemptId = attemptId,
            QuestionId = questionId,
            SelectedOptionKeysJson = selectedOptionKeysJson,
            IsCorrect = isCorrect,
            PointsEarned = pointsEarned
        };
    }
}
