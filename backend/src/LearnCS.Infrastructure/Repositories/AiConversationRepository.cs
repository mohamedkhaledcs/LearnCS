using LearnCS.Application.Contracts.Persistence;
using LearnCS.Domain.Platform;
using LearnCS.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LearnCS.Infrastructure.Repositories;

internal sealed class AiConversationRepository(AppDbContext db) : IAiConversationRepository
{
    public Task<AiConversation?> FindByIdAsync(Guid conversationId, bool trackForUpdate = false, CancellationToken cancellationToken = default)
    {
        var query = db.AiConversations.AsQueryable();
        if (!trackForUpdate)
            query = query.AsNoTracking();

        return query.FirstOrDefaultAsync(c => c.Id == conversationId, cancellationToken);
    }

    public Task<AiConversation?> FindByIdWithMessagesAsync(Guid conversationId, CancellationToken cancellationToken = default)
        => db.AiConversations
             .Include(c => c.Messages.OrderBy(m => m.CreatedAt))
             .FirstOrDefaultAsync(c => c.Id == conversationId, cancellationToken);

    public async Task<IReadOnlyList<AiConversation>> GetActiveConversationsForUserAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await db.AiConversations
            .AsNoTracking()
            .Include(c => c.Messages)
            .Where(c => c.UserId == userId && c.IsActive)
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public void AddConversation(AiConversation conversation)
        => db.AiConversations.Add(conversation);

    public void AddMessage(AiMessage message)
        => db.AiMessages.Add(message);

    public void AddSnapshot(AiContextSnapshot snapshot)
        => db.AiContextSnapshots.Add(snapshot);
}
