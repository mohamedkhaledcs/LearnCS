namespace LearnCS.Infrastructure.AI;

/// <summary>
/// Options for configuring AI providers and models in appsettings.
/// </summary>
public class AiOptions
{
    public const string SectionName = "AI";

    /// <summary>
    /// AI Provider type: "none", "openai", "gemini", "claude", etc.
    /// </summary>
    public string Provider { get; set; } = "none";

    /// <summary>
    /// Default model name for completions (e.g., "gpt-4o", "gemini-1.5-pro", etc.).
    /// </summary>
    public string ModelName { get; set; } = "gpt-4o";

    /// <summary>
    /// API key for external provider (optional in dev, bound from configuration/secrets).
    /// </summary>
    public string? ApiKey { get; set; }

    /// <summary>
    /// Custom API endpoint if using custom host/gateway.
    /// </summary>
    public string? Endpoint { get; set; }

    public int MaxTokens { get; set; } = 1000;
    public double Temperature { get; set; } = 0.7;
}
