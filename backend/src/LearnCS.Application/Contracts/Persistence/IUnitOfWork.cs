namespace LearnCS.Application.Contracts.Persistence;

/// <summary>
/// Encapsulates SaveChangesAsync so Application use cases can persist changes
/// without taking a direct dependency on EF Core's DbContext.
/// </summary>
public interface IUnitOfWork
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
