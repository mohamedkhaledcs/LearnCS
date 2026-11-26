using LearnCS.Domain.Common;

namespace LearnCS.Domain.Career;

/// <summary>
/// Represents a possible career path/specialization (e.g., Backend Developer, AI Engineer)
/// </summary>
public class CareerProfile : BaseEntity
{
    public string Name { get; private set; } = string.Empty;
    public string Slug { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public string? IconUrl { get; private set; }
    public bool IsActive { get; private set; } = true;

    public ICollection<CareerFactor> Factors { get; private set; } = new List<CareerFactor>();
    public ICollection<CareerRecommendation> Recommendations { get; private set; } = new List<CareerRecommendation>();

    private CareerProfile() { }

    public static CareerProfile Create(string name, string slug, string? description = null)
        => new CareerProfile { Name = name, Slug = slug.ToLowerInvariant(), Description = description };
}

/// <summary>
/// A weighted factor contributing to a career profile score.
/// e.g., "enjoys-algorithms" → contributes 0.8 to "AI Engineer"
/// </summary>
public class CareerFactor : BaseEntity
{
    public Guid CareerProfileId { get; private set; }
    public string FactorKey { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public decimal Weight { get; private set; } = 1.0m;

    public CareerProfile? CareerProfile { get; private set; }

    private CareerFactor() { }

    public static CareerFactor Create(Guid profileId, string factorKey, decimal weight, string? description = null)
        => new CareerFactor { CareerProfileId = profileId, FactorKey = factorKey, Weight = weight, Description = description };
}

/// <summary>
/// A question in the career discovery assessment.
/// </summary>
public class CareerQuestion : BaseEntity
{
    public string Text { get; private set; } = string.Empty;
    public string? HelpText { get; private set; }
    public int DisplayOrder { get; private set; }
    public bool IsActive { get; private set; } = true;
    public string? CategoryTag { get; private set; }

    public ICollection<CareerQuestionOption> Options { get; private set; } = new List<CareerQuestionOption>();

    private CareerQuestion() { }

    public static CareerQuestion Create(string text, int displayOrder, string? helpText = null, string? categoryTag = null)
        => new CareerQuestion { Text = text, DisplayOrder = displayOrder, HelpText = helpText, CategoryTag = categoryTag };
}

/// <summary>
/// An answer option for a career question.
/// Each option contributes weighted scores to one or more career profiles.
/// </summary>
public class CareerQuestionOption : BaseEntity
{
    public Guid QuestionId { get; private set; }
    public string Text { get; private set; } = string.Empty;
    public int DisplayOrder { get; private set; }

    public CareerQuestion? Question { get; private set; }
    public ICollection<CareerOptionScore> Scores { get; private set; } = new List<CareerOptionScore>();

    private CareerQuestionOption() { }

    public static CareerQuestionOption Create(Guid questionId, string text, int displayOrder)
        => new CareerQuestionOption { QuestionId = questionId, Text = text, DisplayOrder = displayOrder };
}

/// <summary>
/// The score contribution of a specific option to a specific career profile.
/// This is the core of the recommendation engine, NOT "if A then Backend".
/// </summary>
public class CareerOptionScore
{
    public Guid OptionId { get; private set; }
    public Guid CareerProfileId { get; private set; }
    public decimal Score { get; private set; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public CareerQuestionOption? Option { get; private set; }
    public CareerProfile? CareerProfile { get; private set; }

    private CareerOptionScore() { }

    public static CareerOptionScore Create(Guid optionId, Guid profileId, decimal score)
        => new CareerOptionScore { OptionId = optionId, CareerProfileId = profileId, Score = score };
}

public enum CareerAttemptStatus { InProgress = 0, Completed = 1, Abandoned = 2 }

/// <summary>
/// A learner's attempt at the career discovery assessment.
/// </summary>
public class CareerAssessmentAttempt : BaseEntity
{
    public Guid UserId { get; private set; }
    public CareerAttemptStatus Status { get; private set; } = CareerAttemptStatus.InProgress;
    public DateTime StartedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; private set; }

    public ICollection<CareerAnswerResponse> Responses { get; private set; } = new List<CareerAnswerResponse>();
    public ICollection<CareerRecommendation> Recommendations { get; private set; } = new List<CareerRecommendation>();

    private CareerAssessmentAttempt() { }

    public static CareerAssessmentAttempt Create(Guid userId)
        => new CareerAssessmentAttempt { UserId = userId };

    public void Complete() { Status = CareerAttemptStatus.Completed; CompletedAt = DateTime.UtcNow; SetUpdated(); }
}

public class CareerAnswerResponse
{
    public Guid AttemptId { get; private set; }
    public Guid QuestionId { get; private set; }
    public Guid SelectedOptionId { get; private set; }
    public DateTime AnsweredAt { get; private set; } = DateTime.UtcNow;

    public CareerAssessmentAttempt? Attempt { get; private set; }
    public CareerQuestion? Question { get; private set; }
    public CareerQuestionOption? SelectedOption { get; private set; }

    private CareerAnswerResponse() { }

    public static CareerAnswerResponse Create(Guid attemptId, Guid questionId, Guid selectedOptionId)
        => new CareerAnswerResponse { AttemptId = attemptId, QuestionId = questionId, SelectedOptionId = selectedOptionId };
}

/// <summary>
/// A career recommendation result with a percentage match score.
/// e.g., Backend Developer → 87%, Data Scientist → 72%
/// </summary>
public class CareerRecommendation : BaseEntity
{
    public Guid AttemptId { get; private set; }
    public Guid UserId { get; private set; }
    public Guid CareerProfileId { get; private set; }

    /// <summary>0-100 percentage confidence score</summary>
    public decimal Score { get; private set; }
    public int Rank { get; private set; }
    public string? ExplanationJson { get; private set; }

    public CareerAssessmentAttempt? Attempt { get; private set; }
    public CareerProfile? CareerProfile { get; private set; }

    private CareerRecommendation() { }

    public static CareerRecommendation Create(Guid attemptId, Guid userId, Guid careerProfileId,
        decimal score, int rank, string? explanationJson = null)
        => new CareerRecommendation
        {
            AttemptId = attemptId, UserId = userId, CareerProfileId = careerProfileId,
            Score = score, Rank = rank, ExplanationJson = explanationJson
        };
}
