namespace LearnCS.Application.Contracts.AI;

/// <summary>
/// Provider-agnostic LLM contract for LearnCS.
/// Decouples Application use cases from specific providers (OpenAI, Gemini, Claude, etc.).
/// </summary>
public interface ILlmProvider
{
    /// <summary>
    /// Identifier of the active AI provider (e.g. "OpenAI", "Gemini", "NoOp").
    /// </summary>
    string ProviderName { get; }

    /// <summary>
    /// Generates an AI completion asynchronously for the given request.
    /// </summary>
    Task<LlmCompletionResponse> CompleteAsync(LlmCompletionRequest request, CancellationToken cancellationToken = default);
}
