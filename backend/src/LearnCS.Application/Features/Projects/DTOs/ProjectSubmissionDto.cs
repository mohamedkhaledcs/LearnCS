namespace LearnCS.Application.Features.Projects.DTOs;

/// <summary>
/// Learner project submission record including status and review feedback.
/// </summary>
public record ProjectSubmissionDto(
    Guid Id,
    Guid UserId,
    Guid ProjectId,
    string ProjectTitle,
    string Status,
    string? RepositoryUrl,
    string? LiveUrl,
    string? Notes,
    string? FeedbackNotes,
    DateTime? SubmittedAt,
    DateTime? ReviewedAt
);
