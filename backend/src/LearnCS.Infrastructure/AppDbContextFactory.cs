using LearnCS.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace LearnCS.Infrastructure;

/// <summary>
/// Allows EF Core CLI tools (dotnet ef migrations add) to create the DbContext
/// without requiring the API to be running.
///
/// Credentials are read from:
/// 1. The LEARNCS_DB_CONNECTION environment variable if set.
/// 2. appsettings.Development.json / appsettings.json in the LearnCS.API directory.
/// </summary>
public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var connectionString = Environment.GetEnvironmentVariable("LEARNCS_DB_CONNECTION");

        if (string.IsNullOrEmpty(connectionString))
        {
            var basePath = Directory.GetCurrentDirectory();
            var apiPath = Path.Combine(basePath, "..", "LearnCS.API");
            var configPath = Directory.Exists(apiPath) ? apiPath : basePath;

            var config = new ConfigurationBuilder()
                .SetBasePath(configPath)
                .AddJsonFile("appsettings.json", optional: true)
                .AddJsonFile("appsettings.Development.json", optional: true)
                .Build();

            connectionString = config.GetConnectionString("DefaultConnection");
        }

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException(
                "Could not locate database connection string for EF Core design-time factory. " +
                "Set LEARNCS_DB_CONNECTION environment variable or ensure appsettings.Development.json exists.");
        }

        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql(connectionString, npgsql =>
                npgsql.MigrationsAssembly(typeof(AppDbContextFactory).Assembly.FullName))
            .Options;

        return new AppDbContext(options);
    }
}
