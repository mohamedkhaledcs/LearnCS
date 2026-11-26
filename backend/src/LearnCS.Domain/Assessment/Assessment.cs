using LearnCS.Domain.Common;

namespace LearnCS.Domain.Assessment;

/// <summary>
/// An assessment (quiz, test, career discovery) containing a set of questions.
/// </summary>
public class Assessment : BaseEntity
{
    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public AssessmentType Type { get; private set; }
    public AssessmentStatus Status { get; private set; } = AssessmentStatus.Draft;
    public int? TimeLimitMinutes { get; private set; }
    public decimal PassScore { get; private set; } = 70;
    public bool IsAdaptive { get; private set; }
    public int? MaxQuestions { get; private set; }

    public ICollection<AssessmentQuestion> AssessmentQuestions { get; private set; } = new List<AssessmentQuestion>();
    public ICollection<AssessmentAttempt> Attempts { get; private set; } = new List<AssessmentAttempt>();

    private Assessment() { }

    public static Assessment Create(string title, AssessmentType type, string? description = null,
        int? timeLimitMinutes = null, decimal passScore = 70)
        => new Assessment
        {
            Title = title, Type = type, Description = description,
            TimeLimitMinutes = timeLimitMinutes, PassScore = passScore
        };

    public void Publish() { Status = AssessmentStatus.Published; SetUpdated(); }
}

/// <summary>
/// A single question that can appear in one or more assessments.
/// Questions are linked to knowledge concepts to enable mastery tracking.
/// </summary>
public class Question : BaseEntity
{
    public string Text { get; private set; } = string.Empty;
    public QuestionType Type { get; private set; }
    public QuestionDifficulty Difficulty { get; private set; } = QuestionDifficulty.Medium;
    public Guid? ConceptId { get; private set; }
    public string? Explanation { get; private set; }
    public int DefaultPoints { get; private set; } = 1;
    public string? CodeSnippet { get; private set; }
    public bool IsActive { get; private set; } = true;

    public ICollection<QuestionOption> Options { get; private set; } = new List<QuestionOption>();
    public ICollection<AssessmentQuestion> AssessmentQuestions { get; private set; } = new List<AssessmentQuestion>();

    private Question() { }

    public static Question Create(string text, QuestionType type, QuestionDifficulty difficulty,
        Guid? conceptId = null, string? explanation = null, int defaultPoints = 1)
        => new Question
        {
            Text = text, Type = type, Difficulty = difficulty,
            ConceptId = conceptId, Explanation = explanation, DefaultPoints = defaultPoints
        };
}

/// <summary>
/// An answer option for a multiple-choice or true/false question.
/// </summary>
public class QuestionOption : BaseEntity
{
    public Guid QuestionId { get; private set; }
    public string Text { get; private set; } = string.Empty;
    public bool IsCorrect { get; private set; }
    public int DisplayOrder { get; private set; }
    public string? Explanation { get; private set; }

    public Question? Question { get; private set; }

    private QuestionOption() { }

    public static QuestionOption Create(Guid questionId, string text, bool isCorrect, int displayOrder = 0)
        => new QuestionOption { QuestionId = questionId, Text = text, IsCorrect = isCorrect, DisplayOrder = displayOrder };
}

/// <summary>
/// Junction table: connects an assessment to a question with ordering and point override.
/// </summary>
public class AssessmentQuestion
{
    public Guid AssessmentId { get; private set; }
    public Guid QuestionId { get; private set; }
    public int DisplayOrder { get; private set; }
    public int Points { get; private set; } = 1;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public Assessment? Assessment { get; private set; }
    public Question? Question { get; private set; }

    private AssessmentQuestion() { }

    public static AssessmentQuestion Create(Guid assessmentId, Guid questionId, int order, int points = 1)
        => new AssessmentQuestion { AssessmentId = assessmentId, QuestionId = questionId, DisplayOrder = order, Points = points };
}

/// <summary>
/// One learner's attempt at an assessment.
/// </summary>
public class AssessmentAttempt : BaseEntity
{
    public Guid UserId { get; private set; }
    public Guid AssessmentId { get; private set; }
    public AttemptStatus Status { get; private set; } = AttemptStatus.InProgress;
    public DateTime StartedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; private set; }
    public decimal Score { get; private set; }
    public decimal MaxScore { get; private set; }
    public bool Passed { get; private set; }

    public Assessment? Assessment { get; private set; }
    public ICollection<AttemptAnswer> Answers { get; private set; } = new List<AttemptAnswer>();

    private AssessmentAttempt() { }

    public static AssessmentAttempt Create(Guid userId, Guid assessmentId)
        => new AssessmentAttempt { UserId = userId, AssessmentId = assessmentId };

    public void Complete(decimal score, decimal maxScore, decimal passScore)
    {
        Status = AttemptStatus.Completed;
        Score = score;
        MaxScore = maxScore;
        Passed = maxScore > 0 && (score / maxScore * 100) >= passScore;
        CompletedAt = DateTime.UtcNow;
        SetUpdated();
    }

    public void Abandon()
    {
        Status = AttemptStatus.Abandoned;
        CompletedAt = DateTime.UtcNow;
        SetUpdated();
    }

    public decimal ScorePercent => MaxScore > 0 ? Math.Round(Score / MaxScore * 100, 2) : 0;
}

/// <summary>
/// Records a learner's answer to a single question in an attempt.
/// Critical for calculating concept mastery.
/// </summary>
public class AttemptAnswer : BaseEntity
{
    public Guid AttemptId { get; private set; }
    public Guid QuestionId { get; private set; }
    public Guid? SelectedOptionId { get; private set; }
    public string? TextAnswer { get; private set; }
    public bool IsCorrect { get; private set; }
    public int PointsEarned { get; private set; }
    public int? TimeTakenSeconds { get; private set; }

    public AssessmentAttempt? Attempt { get; private set; }
    public Question? Question { get; private set; }

    private AttemptAnswer() { }

    public static AttemptAnswer Create(Guid attemptId, Guid questionId, Guid? selectedOptionId,
        string? textAnswer, bool isCorrect, int pointsEarned, int? timeTakenSeconds = null)
        => new AttemptAnswer
        {
            AttemptId = attemptId, QuestionId = questionId,
            SelectedOptionId = selectedOptionId, TextAnswer = textAnswer,
            IsCorrect = isCorrect, PointsEarned = pointsEarned, TimeTakenSeconds = timeTakenSeconds
        };
}
