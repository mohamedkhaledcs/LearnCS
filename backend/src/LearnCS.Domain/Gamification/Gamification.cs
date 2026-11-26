using LearnCS.Domain.Common;

namespace LearnCS.Domain.Gamification;

public class Badge : BaseEntity
{
    public string Name { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public string? IconUrl { get; private set; }
    public string? CriteriaJson { get; private set; }
    public bool IsActive { get; private set; } = true;

    private Badge() { }

    public static Badge Create(string name, string description, string? iconUrl = null)
        => new Badge { Name = name, Description = description, IconUrl = iconUrl };
}

public enum AchievementTrigger
{
    FirstLesson = 0,
    FirstAssessment = 1,
    PathCompleted = 2,
    StreakDays7 = 3,
    StreakDays30 = 4,
    ProjectSubmitted = 5,
    ConceptMastered = 6,
    CareerAssessmentCompleted = 7,
    Custom = 99
}

public class Achievement : BaseEntity
{
    public string? Code { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string? TitleAr { get; private set; }
    public string Description { get; private set; } = string.Empty;
    public string? DescriptionAr { get; private set; }
    public string? Category { get; private set; }
    public int Threshold { get; private set; } = 1;
    public Guid? BadgeId { get; private set; }
    public int XpReward { get; private set; }
    public AchievementTrigger TriggerType { get; private set; }
    public string? TriggerConditionJson { get; private set; }
    public bool IsActive { get; private set; } = true;

    public Badge? Badge { get; private set; }
    public ICollection<UserAchievement> UserAchievements { get; private set; } = new List<UserAchievement>();

    private Achievement() { }

    public static Achievement Create(string name, string description, AchievementTrigger trigger,
        int xpReward = 0, Guid? badgeId = null, string? code = null, string? titleAr = null,
        string? descriptionAr = null, string? category = null, int threshold = 1, string? conditionJson = null)
        => new Achievement
        {
            Code = code, Name = name, TitleAr = titleAr, Description = description,
            DescriptionAr = descriptionAr, Category = category, Threshold = threshold,
            TriggerType = trigger, TriggerConditionJson = conditionJson, XpReward = xpReward, BadgeId = badgeId
        };
}

public class UserAchievement : BaseEntity
{
    public Guid UserId { get; private set; }
    public Guid AchievementId { get; private set; }
    public DateTime EarnedAt { get; private set; } = DateTime.UtcNow;

    public Achievement? Achievement { get; private set; }

    private UserAchievement() { }

    public static UserAchievement Create(Guid userId, Guid achievementId)
        => new UserAchievement { UserId = userId, AchievementId = achievementId };
}

public class UserXpEvent : BaseEntity
{
    public Guid UserId { get; private set; }
    public int XpAmount { get; private set; }
    public string Source { get; private set; } = string.Empty;
    public Guid? ReferenceId { get; private set; }
    public string? Note { get; private set; }

    private UserXpEvent() { }

    public static UserXpEvent Create(Guid userId, int xp, string source, Guid? referenceId = null, string? note = null)
        => new UserXpEvent { UserId = userId, XpAmount = xp, Source = source, ReferenceId = referenceId, Note = note };
}

public class StudyStreak : BaseEntity
{
    public Guid UserId { get; private set; }
    public int CurrentStreak { get; private set; }
    public int LongestStreak { get; private set; }
    public DateOnly? LastStudyDate { get; private set; }

    private StudyStreak() { }

    public static StudyStreak Create(Guid userId)
        => new StudyStreak { UserId = userId };

    public void RecordStudy(DateOnly today)
    {
        if (LastStudyDate.HasValue)
        {
            var daysSinceLast = today.DayNumber - LastStudyDate.Value.DayNumber;
            if (daysSinceLast == 1) CurrentStreak++;
            else if (daysSinceLast > 1) CurrentStreak = 1;
            // Same day = no change
        }
        else
        {
            CurrentStreak = 1;
        }

        if (CurrentStreak > LongestStreak) LongestStreak = CurrentStreak;
        LastStudyDate = today;
        SetUpdated();
    }
}
