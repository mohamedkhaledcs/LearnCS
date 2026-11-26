using LearnCS.Application.Contracts.Persistence;
using LearnCS.Infrastructure.Persistence;

namespace LearnCS.Infrastructure.Repositories;

/// <summary>
/// Wraps AppDbContext.SaveChangesAsync so Application use cases
/// can commit changes without a direct EF Core dependency.
/// </summary>
internal sealed class UnitOfWork(AppDbContext db) : IUnitOfWork
{
    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        => db.SaveChangesAsync(cancellationToken);
}
