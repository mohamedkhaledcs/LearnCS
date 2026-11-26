using LearnCS.Application.Contracts.AI;
using Microsoft.Extensions.Options;

namespace LearnCS.Infrastructure.AI;

/// <summary>
/// Safe fallback provider when AI provider is disabled ("none") or API key is unconfigured.
/// Returns friendly system guidance without invoking external APIs.
/// </summary>
internal sealed class NoOpLlmProvider(IOptions<AiOptions> options) : ILlmProvider
{
    public string ProviderName => "NoOp";

    public Task<LlmCompletionResponse> CompleteAsync(LlmCompletionRequest request, CancellationToken cancellationToken = default)
    {
        var model = options.Value.ModelName ?? "none";
        var responseContent =
            "[AI Mentor System]: AI provider is currently set to 'none' or unconfigured. " +
            "Set a valid AI Provider and API key in appsettings to enable live LLM responses.";

        return Task.FromResult(new LlmCompletionResponse(
            Content: responseContent,
            ModelUsed: model,
            InputTokens: 0,
            OutputTokens: 0,
            IsSuccess: true
        ));
    }
}
