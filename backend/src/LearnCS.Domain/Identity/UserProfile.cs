using LearnCS.Domain.Common;

namespace LearnCS.Domain.Identity;

public class UserProfile : BaseEntity
{
    public Guid UserId { get; private set; }
    public string FirstName { get; private set; } = string.Empty;
    public string LastName { get; private set; } = string.Empty;
    public string? DisplayName { get; private set; }
    public string? Bio { get; private set; }
    public string? AvatarUrl { get; private set; }
    public string? Country { get; private set; }
    public string? City { get; private set; }
    public string? Timezone { get; private set; }
    public string? Website { get; private set; }
    public DateOnly? DateOfBirth { get; private set; }

    public User? User { get; private set; }

    private UserProfile() { }

    public static UserProfile Create(Guid userId, string firstName, string lastName)
        => new UserProfile { UserId = userId, FirstName = firstName, LastName = lastName };

    public void Update(string firstName, string lastName, string? displayName, string? bio,
        string? country, string? city, string? timezone, string? website, DateOnly? dob)
    {
        FirstName = firstName;
        LastName = lastName;
        DisplayName = displayName;
        Bio = bio;
        Country = country;
        City = city;
        Timezone = timezone;
        Website = website;
        DateOfBirth = dob;
        SetUpdated();
    }

    public void SetAvatar(string url) { AvatarUrl = url; SetUpdated(); }

    public string FullName => $"{FirstName} {LastName}".Trim();
}

public class UserSettings : BaseEntity
{
    public Guid UserId { get; private set; }
    public string Language { get; private set; } = "en";
    public string Theme { get; private set; } = "system";
    public bool EmailNotifications { get; private set; } = true;
    public bool PushNotifications { get; private set; } = true;
    public bool MarketingEmails { get; private set; }

    public User? User { get; private set; }

    private UserSettings() { }

    public static UserSettings CreateDefaults(Guid userId)
        => new UserSettings { UserId = userId };

    public void Update(string language, string theme, bool emailNotifications,
        bool pushNotifications, bool marketingEmails)
    {
        Language = language;
        Theme = theme;
        EmailNotifications = emailNotifications;
        PushNotifications = pushNotifications;
        MarketingEmails = marketingEmails;
        SetUpdated();
    }
}

public class UserGoal : BaseEntity
{
    public Guid UserId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public DateOnly? TargetDate { get; private set; }
    public GoalStatus Status { get; private set; } = GoalStatus.Active;

    public User? User { get; private set; }

    private UserGoal() { }

    public static UserGoal Create(Guid userId, string title, string? description = null, DateOnly? targetDate = null)
        => new UserGoal { UserId = userId, Title = title, Description = description, TargetDate = targetDate };

    public void Complete() { Status = GoalStatus.Completed; SetUpdated(); }
    public void Archive() { Status = GoalStatus.Archived; SetUpdated(); }
}

public enum GoalStatus { Active = 0, Completed = 1, Abandoned = 2, Archived = 3 }
