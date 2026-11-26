namespace LearnCS.Application.Features.Projects.DTOs;

/// <summary>
/// Request payload to submit or update a project submission.
/// </summary>
public record SubmitProjectRequest(
    string? RepositoryUrl = null,
    string? LiveUrl = null,
    string? Notes = null
);
