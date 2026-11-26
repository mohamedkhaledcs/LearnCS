namespace LearnCS.Application.Features.Profile.DTOs;

/// <summary>
/// User application preferences and notification settings DTO.
/// </summary>
public record UserSettingsDto(
    Guid UserId,
    string Language,
    string Theme,
    bool EmailNotifications,
    bool PushNotifications,
    bool MarketingEmails
);
