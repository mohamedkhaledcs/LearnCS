using System.Security.Claims;
using LearnCS.Application.Common;
using Microsoft.AspNetCore.Mvc;

namespace LearnCS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class ApiControllerBase : ControllerBase
{
    protected IActionResult HandleResult<T>(Result<T> result)
    {
        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }

        return result.ErrorCode switch
        {
            "UNAUTHORIZED" or "INVALID_CREDENTIALS" => Unauthorized(CreateProblem(result, 401, "Unauthorized")),
            "FORBIDDEN" => StatusCode(403, CreateProblem(result, 403, "Forbidden")),
            "NOT_FOUND" or "USER_NOT_FOUND" => NotFound(CreateProblem(result, 404, "Not Found")),
            "DUPLICATE_USERNAME" or "DUPLICATE_EMAIL" or "INVALID_INPUT" or "CONVERSATION_CLOSED" => BadRequest(CreateProblem(result, 400, "Bad Request")),
            "AI_PROVIDER_ERROR" => StatusCode(503, CreateProblem(result, 503, "Service Unavailable")),
            _ => BadRequest(CreateProblem(result, 400, "Bad Request"))
        };
    }

    protected Guid GetUserId()
    {
        var claim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst("sub");
        if (claim != null && Guid.TryParse(claim.Value, out var userId))
        {
            return userId;
        }

        return Guid.Empty;
    }

    private static ProblemDetails CreateProblem<T>(Result<T> result, int statusCode, string title)
    {
        return new ProblemDetails
        {
            Title = title,
            Detail = result.ErrorMessage,
            Status = statusCode,
            Extensions = { ["code"] = result.ErrorCode }
        };
    }
}
