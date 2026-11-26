using System.Security.Claims;
using LearnCS.API.Controllers;
using LearnCS.Application.Common;
using LearnCS.Application.Features.AI.DTOs;
using LearnCS.Application.Features.AI.Services;
using LearnCS.Domain.Platform;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Controllers;

public class AiControllerTests
{
    private readonly Mock<IAiConversationService> _aiConversationServiceMock = new();
    private readonly AiController _sut;

    public AiControllerTests()
    {
        _sut = new AiController(_aiConversationServiceMock.Object);
    }

    private void SetUserContext(Guid userId)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, userId.ToString())
        };
        var identity = new ClaimsIdentity(claims, "TestAuth");
        var claimsPrincipal = new ClaimsPrincipal(identity);

        _sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = claimsPrincipal }
        };
    }

    [Fact]
    public async Task StartConversation_Authenticated_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        SetUserContext(userId);

        var request = new StartAiConversationRequest(AiMentorMode.Mentor, "Loops Question", null, null, null, "How do loops work in C#?");
        var details = new AiConversationDetailsDto(
            Guid.NewGuid(), userId, "General", "Loops Question", null, null, null, true, DateTime.UtcNow, new List<AiMessageDto>()
        );

        _aiConversationServiceMock.Setup(s => s.StartConversationAsync(userId, request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AiConversationDetailsDto>.Success(details));

        // Act
        var actionResult = await _sut.StartConversation(request, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<AiConversationDetailsDto>(okResult.Value);
        Assert.Equal(userId, responseValue.UserId);
        Assert.Equal("General", responseValue.Mode);
    }

    [Fact]
    public async Task StartConversation_Unauthenticated_ReturnsUnauthorized()
    {
        // Arrange
        _sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = new ClaimsPrincipal() }
        };

        _aiConversationServiceMock.Setup(s => s.StartConversationAsync(Guid.Empty, It.IsAny<StartAiConversationRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AiConversationDetailsDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED"));

        // Act
        var actionResult = await _sut.StartConversation(new StartAiConversationRequest(AiMentorMode.Mentor, "Hi"), CancellationToken.None);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(unauthorizedResult.Value);
        Assert.Equal(401, problem.Status);
        Assert.Equal("UNAUTHORIZED", problem.Extensions["code"]);
    }

    [Fact]
    public async Task GetMyConversations_Authenticated_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        SetUserContext(userId);

        var conversations = new List<AiConversationSummaryDto>
        {
            new(Guid.NewGuid(), userId, "General", "Loops Question", null, null, null, true, DateTime.UtcNow, 2, DateTime.UtcNow)
        };

        _aiConversationServiceMock.Setup(s => s.GetMyConversationsAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<IReadOnlyList<AiConversationSummaryDto>>.Success(conversations));

        // Act
        var actionResult = await _sut.GetMyConversations(CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<List<AiConversationSummaryDto>>(okResult.Value);
        Assert.Single(responseValue);
        Assert.Equal(userId, responseValue[0].UserId);
    }

    [Fact]
    public async Task GetConversationById_Success_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var conversationId = Guid.NewGuid();
        SetUserContext(userId);

        var details = new AiConversationDetailsDto(
            conversationId, userId, "General", "Title", null, null, null, true, DateTime.UtcNow, new List<AiMessageDto>()
        );

        _aiConversationServiceMock.Setup(s => s.GetConversationByIdAsync(userId, conversationId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AiConversationDetailsDto>.Success(details));

        // Act
        var actionResult = await _sut.GetConversationById(conversationId, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<AiConversationDetailsDto>(okResult.Value);
        Assert.Equal(conversationId, responseValue.Id);
    }

    [Fact]
    public async Task GetConversationById_Forbidden_IDOR_ReturnsForbidden()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var conversationId = Guid.NewGuid();
        SetUserContext(userId);

        _aiConversationServiceMock.Setup(s => s.GetConversationByIdAsync(userId, conversationId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AiConversationDetailsDto>.Failure("Access denied to this AI conversation.", "FORBIDDEN"));

        // Act
        var actionResult = await _sut.GetConversationById(conversationId, CancellationToken.None);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(actionResult);
        Assert.Equal(403, objectResult.StatusCode);
        var problem = Assert.IsType<ProblemDetails>(objectResult.Value);
        Assert.Equal(403, problem.Status);
        Assert.Equal("FORBIDDEN", problem.Extensions["code"]);
    }

    [Fact]
    public async Task SendMessage_Success_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var conversationId = Guid.NewGuid();
        SetUserContext(userId);

        var request = new SendAiMessageRequest("Explain recursion.");
        var messageDto = new AiMessageDto(Guid.NewGuid(), conversationId, "Assistant", "Recursion is when a function calls itself.", DateTime.UtcNow, 15, 25, "NoOpMockProvider");

        _aiConversationServiceMock.Setup(s => s.SendMessageAsync(userId, conversationId, request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AiMessageDto>.Success(messageDto));

        // Act
        var actionResult = await _sut.SendMessage(conversationId, request, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        var responseValue = Assert.IsType<AiMessageDto>(okResult.Value);
        Assert.Equal("Assistant", responseValue.Role);
    }

    [Fact]
    public async Task SendMessage_ClosedConversation_ReturnsBadRequest()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var conversationId = Guid.NewGuid();
        SetUserContext(userId);

        var request = new SendAiMessageRequest("Hello");

        _aiConversationServiceMock.Setup(s => s.SendMessageAsync(userId, conversationId, request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<AiMessageDto>.Failure("Cannot send message to a closed conversation.", "CONVERSATION_CLOSED"));

        // Act
        var actionResult = await _sut.SendMessage(conversationId, request, CancellationToken.None);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult);
        var problem = Assert.IsType<ProblemDetails>(badRequestResult.Value);
        Assert.Equal(400, problem.Status);
        Assert.Equal("CONVERSATION_CLOSED", problem.Extensions["code"]);
    }

    [Fact]
    public async Task CloseConversation_Success_ReturnsOkResult()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var conversationId = Guid.NewGuid();
        SetUserContext(userId);

        _aiConversationServiceMock.Setup(s => s.CloseConversationAsync(userId, conversationId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result<bool>.Success(true));

        // Act
        var actionResult = await _sut.CloseConversation(conversationId, CancellationToken.None);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(actionResult);
        Assert.True((bool)okResult.Value!);
    }
}
