namespace LearnCS.Application.Features.Career.DTOs;

/// <summary>
/// Learner career assessment result payload containing ranked recommendations.
/// </summary>
public record CareerAssessmentResultDto(
    Guid AttemptId,
    Guid UserId,
    string Status,
    DateTime StartedAt,
    DateTime? CompletedAt,
    IReadOnlyList<CareerRecommendationDto> Recommendations
);
