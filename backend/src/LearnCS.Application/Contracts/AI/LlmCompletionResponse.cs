namespace LearnCS.Application.Contracts.AI;

/// <summary>
/// Provider-agnostic response structure returned by an ILlmProvider.
/// </summary>
public record LlmCompletionResponse(
    string Content,
    string ModelUsed,
    int InputTokens,
    int OutputTokens,
    bool IsSuccess,
    string? ErrorMessage = null
);
