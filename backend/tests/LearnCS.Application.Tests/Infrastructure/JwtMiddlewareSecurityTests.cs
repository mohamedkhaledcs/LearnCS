using System.Security.Claims;
using LearnCS.API.Controllers;
using LearnCS.Application.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace LearnCS.Application.Tests.Infrastructure;

public class JwtMiddlewareSecurityTests
{
    private class TestApiController : ApiControllerBase
    {
        public Guid TestGetUserId() => GetUserId();
        public IActionResult TestHandleResult<T>(Result<T> result) => HandleResult(result);
    }

    [Fact]
    public void GetUserId_WithValidNameIdentifierClaim_ExtractsGuidCorrectly()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var sut = new TestApiController();
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, userId.ToString())
        };
        sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext
            {
                User = new ClaimsPrincipal(new ClaimsIdentity(claims, "TestAuth"))
            }
        };

        // Act
        var result = sut.TestGetUserId();

        // Assert
        Assert.Equal(userId, result);
    }

    [Fact]
    public void GetUserId_WithoutNameIdentifierClaim_FallsBackToSubClaim()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var sut = new TestApiController();
        var claims = new List<Claim>
        {
            new("sub", userId.ToString())
        };
        sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext
            {
                User = new ClaimsPrincipal(new ClaimsIdentity(claims, "TestAuth"))
            }
        };

        // Act
        var result = sut.TestGetUserId();

        // Assert
        Assert.Equal(userId, result);
    }

    [Fact]
    public void GetUserId_UnauthenticatedUser_ReturnsEmptyGuid()
    {
        // Arrange
        var sut = new TestApiController();
        sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext
            {
                User = new ClaimsPrincipal(new ClaimsIdentity())
            }
        };

        // Act
        var result = sut.TestGetUserId();

        // Assert
        Assert.Equal(Guid.Empty, result);
    }

    [Fact]
    public void HandleResult_UnauthorizedErrorCode_Returns401WithProblemDetails()
    {
        // Arrange
        var sut = new TestApiController();
        var result = Result<string>.Failure("Authentication token is missing or expired.", "UNAUTHORIZED");

        // Act
        var actionResult = sut.TestHandleResult(result);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(actionResult);
        Assert.Equal(401, unauthorizedResult.StatusCode);
        var problem = Assert.IsType<ProblemDetails>(unauthorizedResult.Value);
        Assert.Equal(401, problem.Status);
        Assert.Equal("UNAUTHORIZED", problem.Extensions["code"]);
        Assert.Equal("Unauthorized", problem.Title);
    }

    [Fact]
    public void HandleResult_ForbiddenErrorCode_Returns403WithProblemDetails()
    {
        // Arrange
        var sut = new TestApiController();
        var result = Result<string>.Failure("You do not have access to this resource.", "FORBIDDEN");

        // Act
        var actionResult = sut.TestHandleResult(result);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(actionResult);
        Assert.Equal(403, statusCodeResult.StatusCode);
        var problem = Assert.IsType<ProblemDetails>(statusCodeResult.Value);
        Assert.Equal(403, problem.Status);
        Assert.Equal("FORBIDDEN", problem.Extensions["code"]);
        Assert.Equal("Forbidden", problem.Title);
    }
}
