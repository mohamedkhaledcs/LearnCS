using System.Text;
using System.Text.Json;
using LearnCS.Application.Contracts.AI;
using LearnCS.Application.Contracts.Authentication;
using LearnCS.Application.Contracts.Persistence;
using LearnCS.Infrastructure.AI;
using LearnCS.Infrastructure.Authentication;
using LearnCS.Infrastructure.Persistence;
using LearnCS.Infrastructure.Repositories;
using LearnCS.Infrastructure.Seeding;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace LearnCS.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseNpgsql(connectionString, npgsql =>
            {
                npgsql.MigrationsAssembly(typeof(DependencyInjection).Assembly.FullName);
                npgsql.EnableRetryOnFailure(maxRetryCount: 3);
            });
        });

        // ── Repositories & Unit of Work ──────────────────────────────────────────
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IUserProfileRepository, UserProfileRepository>();
        services.AddScoped<IConceptRepository, ConceptRepository>();
        services.AddScoped<ILearningPathRepository, LearningPathRepository>();
        services.AddScoped<IAssessmentRepository, AssessmentRepository>();
        services.AddScoped<ICareerRepository, CareerRepository>();
        services.AddScoped<IIntelligenceRepository, IntelligenceRepository>();
        services.AddScoped<IGamificationRepository, GamificationRepository>();
        services.AddScoped<IAiConversationRepository, AiConversationRepository>();
        services.AddScoped<IProjectRepository, ProjectRepository>();

        // ── AI Infrastructure ─────────────────────────────────────────────────────
        services.Configure<AiOptions>(configuration.GetSection(AiOptions.SectionName));
        services.AddScoped<ILlmProvider, NoOpLlmProvider>();

        // ── Authentication & Security Infrastructure ──────────────────────────────
        services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.SectionName));
        services.AddScoped<IPasswordHasher, PasswordHasher>();
        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

        var jwtOptions = configuration.GetSection(JwtOptions.SectionName).Get<JwtOptions>() ?? new JwtOptions();

        if (string.IsNullOrWhiteSpace(jwtOptions.SecretKey) || Encoding.UTF8.GetByteCount(jwtOptions.SecretKey) < 32)
        {
            throw new InvalidOperationException(
                "JWT SecretKey is missing or invalid. Configure 'Jwt:SecretKey' in application settings (must be at least 32 characters / 256 bits long).");
        }

        var keyBytes = Encoding.UTF8.GetBytes(jwtOptions.SecretKey);

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
                ValidateIssuer = !string.IsNullOrWhiteSpace(jwtOptions.Issuer),
                ValidIssuer = jwtOptions.Issuer,
                ValidateAudience = !string.IsNullOrWhiteSpace(jwtOptions.Audience),
                ValidAudience = jwtOptions.Audience,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromMinutes(1)
            };

            options.Events = new JwtBearerEvents
            {
                OnChallenge = async context =>
                {
                    context.HandleResponse();
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "application/problem+json";

                    var problem = new ProblemDetails
                    {
                        Title = "Unauthorized",
                        Detail = "Authentication token is missing, invalid, or expired.",
                        Status = StatusCodes.Status401Unauthorized,
                        Extensions = { ["code"] = "UNAUTHORIZED" }
                    };

                    await context.Response.WriteAsync(JsonSerializer.Serialize(problem));
                },
                OnForbidden = async context =>
                {
                    context.Response.StatusCode = StatusCodes.Status403Forbidden;
                    context.Response.ContentType = "application/problem+json";

                    var problem = new ProblemDetails
                    {
                        Title = "Forbidden",
                        Detail = "You do not have permission to access this resource.",
                        Status = StatusCodes.Status403Forbidden,
                        Extensions = { ["code"] = "FORBIDDEN" }
                    };

                    await context.Response.WriteAsync(JsonSerializer.Serialize(problem));
                }
            };
        });

        return services;
    }

    /// <summary>
    /// Creates PostgreSQL schemas, applies migrations, and optionally seeds dev data.
    /// Called once at startup.
    /// </summary>
    public static async Task InitialiseDatabaseAsync(this IServiceProvider services, IConfiguration? configuration = null)
    {
        using var scope = services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        // Ensure PostgreSQL schemas exist
        await db.Database.ExecuteSqlRawAsync("""
            CREATE SCHEMA IF NOT EXISTS identity;
            CREATE SCHEMA IF NOT EXISTS knowledge;
            CREATE SCHEMA IF NOT EXISTS learning;
            CREATE SCHEMA IF NOT EXISTS assessment;
            CREATE SCHEMA IF NOT EXISTS intelligence;
            CREATE SCHEMA IF NOT EXISTS gamification;
            CREATE SCHEMA IF NOT EXISTS career;
            CREATE SCHEMA IF NOT EXISTS platform;
        """);

        // Apply pending migrations
        await db.Database.MigrateAsync();

        // Seed development data
        await DataSeeder.SeedAsync(db, configuration);
    }
}
