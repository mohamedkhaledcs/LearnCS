using LearnCS.Domain.Platform;

namespace LearnCS.Application.Contracts.Persistence;

/// <summary>
/// Persistence contract for AI conversations, message history, and context snapshots.
/// </summary>
public interface IAiConversationRepository
{
    Task<AiConversation?> FindByIdAsync(Guid conversationId, bool trackForUpdate = false, CancellationToken cancellationToken = default);
    Task<AiConversation?> FindByIdWithMessagesAsync(Guid conversationId, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<AiConversation>> GetActiveConversationsForUserAsync(Guid userId, CancellationToken cancellationToken = default);

    void AddConversation(AiConversation conversation);
    void AddMessage(AiMessage message);
    void AddSnapshot(AiContextSnapshot snapshot);
}
