namespace LearnCS.Application.Features.AI.DTOs;

/// <summary>
/// Request payload to send a user message to an active AI conversation.
/// Security Rule: Role is NOT accepted from client (always server-assigned as User).
/// </summary>
public record SendAiMessageRequest(
    string Content
);
