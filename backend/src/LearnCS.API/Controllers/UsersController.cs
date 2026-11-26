using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.Auth.DTOs;
using LearnCS.Application.Features.Auth.Services;
using LearnCS.Application.Features.Profile.DTOs;
using LearnCS.Application.Features.Profile.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnCS.API.Controllers;

[ApiController]
[Route("api/users")]
[Authorize]
public class UsersController(IProfileService profileService) : ApiControllerBase
{
    /// <summary>
    /// Retrieves the current authenticated user's identity summary information including roles.
    /// </summary>
    [HttpGet("me")]
    [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetCurrentUser([FromServices] IUserRepository userRepository, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        var user = await userRepository.FindByIdWithRolesAsync(userId, cancellationToken);
        if (user == null)
        {
            return NotFound();
        }

        var roles = user.UserRoles
            .Select(ur => ur.Role?.Name ?? "User")
            .Distinct()
            .ToList();
        if (roles.Count == 0)
        {
            roles.Add("User");
        }
        var userDto = new UserDto(
            user.Id,
            user.Username,
            user.Email,
            user.AccountStatus.ToString(),
            user.EmailVerified,
            roles
        );

        return Ok(userDto);
    }


    /// <summary>
    /// Retrieves the current authenticated user's profile.
    /// </summary>
    [HttpGet("me/profile")]
    [ProducesResponseType(typeof(UserProfileDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetMyProfile(CancellationToken cancellationToken)
    {
        var result = await profileService.GetMyProfileAsync(GetUserId(), cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Updates user-editable profile details for the current authenticated user.
    /// </summary>
    [HttpPut("me/profile")]
    [ProducesResponseType(typeof(UserProfileDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> UpdateMyProfile([FromBody] UpdateProfileRequest request, CancellationToken cancellationToken)
    {
        var result = await profileService.UpdateMyProfileAsync(GetUserId(), request, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Retrieves application settings for the current authenticated user.
    /// </summary>
    [HttpGet("me/settings")]
    [ProducesResponseType(typeof(UserSettingsDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetMySettings(CancellationToken cancellationToken)
    {
        var result = await profileService.GetMySettingsAsync(GetUserId(), cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Updates application settings for the current authenticated user.
    /// </summary>
    [HttpPut("me/settings")]
    [ProducesResponseType(typeof(UserSettingsDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> UpdateMySettings([FromBody] UpdateSettingsRequest request, CancellationToken cancellationToken)
    {
        var result = await profileService.UpdateMySettingsAsync(GetUserId(), request, cancellationToken);
        return HandleResult(result);
    }

    /// <summary>
    /// Updates the password for the current authenticated user.
    /// </summary>
    [HttpPut("me/password")]
    [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> ChangeMyPassword(
        [FromBody] ChangePasswordRequest request,
        [FromServices] IAuthService authService,
        CancellationToken cancellationToken)
    {
        var result = await authService.ChangePasswordAsync(GetUserId(), request, cancellationToken);
        return HandleResult(result);
    }
}
