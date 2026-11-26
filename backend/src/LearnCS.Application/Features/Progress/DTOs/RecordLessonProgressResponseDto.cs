namespace LearnCS.Application.Features.Progress.DTOs;

/// <summary>
/// Result DTO returned after recording or completing lesson progress.
/// </summary>
public record RecordLessonProgressResponseDto(
    Guid LessonId,
    string Status,
    int XpEarned,
    decimal NewPathProgressPercent,
    DateTime CompletedAt
);
