using LearnCS.Domain.Common;

namespace LearnCS.Domain.Platform;

public enum AiMessageRole { User = 0, Assistant = 1, System = 2 }

public enum AiMentorMode
{
    Study = 0,
    Explain = 1,
    Hint = 2,
    Revision = 3,
    Quiz = 4,
    Mentor = 5,
    CareerMentor = 6
}

/// <summary>
/// An AI chat session for a user. Provider-agnostic.
/// The actual LLM is called from Application/Infrastructure layer via ILlmProvider.
/// </summary>
public class AiConversation : BaseEntity
{
    public Guid UserId { get; private set; }
    public AiMentorMode Mode { get; private set; }
    public string? Title { get; private set; }

    // Optional context references, what the learner is studying
    public Guid? ConceptId { get; private set; }
    public Guid? LessonId { get; private set; }
    public Guid? LearningPathId { get; private set; }

    public bool IsActive { get; private set; } = true;

    public ICollection<AiMessage> Messages { get; private set; } = new List<AiMessage>();

    private AiConversation() { }

    public static AiConversation Create(Guid userId, AiMentorMode mode, string? title = null,
        Guid? conceptId = null, Guid? lessonId = null, Guid? pathId = null)
        => new AiConversation
        {
            UserId = userId, Mode = mode, Title = title,
            ConceptId = conceptId, LessonId = lessonId, LearningPathId = pathId
        };

    public void Close() { IsActive = false; SetUpdated(); }
    public void UpdateTitle(string title) { Title = title; SetUpdated(); }
}

/// <summary>
/// A single message in an AI conversation.
/// Stores the content, role, and usage metadata for cost tracking.
/// </summary>
public class AiMessage : BaseEntity
{
    public Guid ConversationId { get; private set; }
    public AiMessageRole Role { get; private set; }
    public string Content { get; private set; } = string.Empty;
    public int? InputTokens { get; private set; }
    public int? OutputTokens { get; private set; }
    public string? ModelUsed { get; private set; }

    public AiConversation? Conversation { get; private set; }

    private AiMessage() { }

    public static AiMessage Create(Guid conversationId, AiMessageRole role, string content,
        int? inputTokens = null, int? outputTokens = null, string? modelUsed = null)
        => new AiMessage
        {
            ConversationId = conversationId, Role = role, Content = content,
            InputTokens = inputTokens, OutputTokens = outputTokens, ModelUsed = modelUsed
        };
}

/// <summary>
/// Context snapshot stored at conversation start to give the AI relevant learner context.
/// Supports future RAG integration.
/// </summary>
public class AiContextSnapshot : BaseEntity
{
    public Guid ConversationId { get; private set; }
    public string SnapshotJson { get; private set; } = string.Empty;

    private AiContextSnapshot() { }

    public static AiContextSnapshot Create(Guid conversationId, string snapshotJson)
        => new AiContextSnapshot { ConversationId = conversationId, SnapshotJson = snapshotJson };
}

public enum NotificationType
{
    General = 0,
    Achievement = 1,
    Recommendation = 2,
    Reminder = 3,
    Announcement = 4,
    CareerResult = 5
}

public class Notification : BaseEntity
{
    public Guid UserId { get; private set; }
    public NotificationType Type { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Body { get; private set; } = string.Empty;
    public bool IsRead { get; private set; }
    public DateTime? ReadAt { get; private set; }
    public string? ActionUrl { get; private set; }

    private Notification() { }

    public static Notification Create(Guid userId, NotificationType type, string title, string body, string? actionUrl = null)
        => new Notification { UserId = userId, Type = type, Title = title, Body = body, ActionUrl = actionUrl };

    public void MarkRead() { IsRead = true; ReadAt = DateTime.UtcNow; SetUpdated(); }
}

public class AuditLog : BaseEntity
{
    public Guid? UserId { get; private set; }
    public Guid? ActorUserId { get; private set; }
    public string Action { get; private set; } = string.Empty;
    public string EntityType { get; private set; } = string.Empty;
    public Guid? EntityId { get; private set; }
    public string? Details { get; private set; }
    public string? OldValuesJson { get; private set; }
    public string? NewValuesJson { get; private set; }
    public string? IpAddress { get; private set; }

    private AuditLog() { }

    public static AuditLog Create(string action, string entityType, Guid? userId = null,
        Guid? entityId = null, string? oldValues = null, string? newValues = null, string? ip = null,
        Guid? actorUserId = null, string? details = null)
        => new AuditLog
        {
            Action = action, EntityType = entityType, UserId = userId,
            ActorUserId = actorUserId ?? userId,
            EntityId = entityId, Details = details,
            OldValuesJson = oldValues, NewValuesJson = newValues, IpAddress = ip
        };
}
