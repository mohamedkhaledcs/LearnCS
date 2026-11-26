using LearnCS.Application.Features.AI.Services;
using LearnCS.Application.Features.Assessments.Services;
using LearnCS.Application.Features.Auth.Services;
using LearnCS.Application.Features.Career.Services;
using LearnCS.Application.Features.Knowledge.Services;
using LearnCS.Application.Features.LearningPaths.Services;
using LearnCS.Application.Features.Profile.Services;
using LearnCS.Application.Features.Progress.Services;
using LearnCS.Application.Features.Projects.Services;
using Microsoft.Extensions.DependencyInjection;

namespace LearnCS.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IProfileService, ProfileService>();
        services.AddScoped<IConceptService, ConceptService>();
        services.AddScoped<ILearningPathService, LearningPathService>();
        services.AddScoped<IAssessmentService, AssessmentService>();
        services.AddScoped<ICareerService, CareerService>();
        services.AddScoped<IAiConversationService, AiConversationService>();
        services.AddScoped<IProgressService, ProgressService>();
        services.AddScoped<IProjectService, ProjectService>();

        return services;
    }
}
