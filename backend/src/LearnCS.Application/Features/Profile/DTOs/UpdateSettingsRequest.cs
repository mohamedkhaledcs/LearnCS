namespace LearnCS.Application.Features.Profile.DTOs;

/// <summary>
/// Request DTO for updating user application preferences and notification options.
/// </summary>
public record UpdateSettingsRequest(
    string Language,
    string Theme,
    bool EmailNotifications,
    bool PushNotifications,
    bool MarketingEmails
);
