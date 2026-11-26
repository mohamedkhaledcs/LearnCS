namespace LearnCS.Application.Contracts.AI;

public enum LlmRole
{
    System = 0,
    User = 1,
    Assistant = 2
}

/// <summary>
/// Provider-agnostic chat message item for LLM completion requests.
/// </summary>
public record LlmChatMessage(LlmRole Role, string Content);
