namespace LearnCS.Application.Contracts.AI;

/// <summary>
/// Provider-agnostic request structure for requesting an LLM completion.
/// </summary>
public record LlmCompletionRequest(
    IReadOnlyList<LlmChatMessage> Messages,
    string? SystemPrompt = null,
    double Temperature = 0.7,
    int MaxTokens = 1000,
    string? ModelOverride = null
);
