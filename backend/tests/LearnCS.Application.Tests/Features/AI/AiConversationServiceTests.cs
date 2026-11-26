using LearnCS.Application.Contracts.AI;
using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.AI.DTOs;
using LearnCS.Application.Features.AI.Services;
using LearnCS.Domain.Identity;
using LearnCS.Domain.Platform;
using Moq;
using Xunit;

namespace LearnCS.Application.Tests.Features.AI;

public class AiConversationServiceTests
{
    private readonly Mock<IAiConversationRepository> _aiRepoMock = new();
    private readonly Mock<IUserRepository> _userRepoMock = new();
    private readonly Mock<ILlmProvider> _llmProviderMock = new();
    private readonly Mock<IUnitOfWork> _unitOfWorkMock = new();
    private readonly AiConversationService _sut;

    public AiConversationServiceTests()
    {
        _sut = new AiConversationService(_aiRepoMock.Object, _userRepoMock.Object, _llmProviderMock.Object, _unitOfWorkMock.Object);
    }

    [Fact]
    public async Task StartConversation_ValidLearner_CreatesConversationSession()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var user = User.Create("learner1", "learner1@example.com", "hash");

        _userRepoMock.Setup(r => r.FindByIdAsync(userId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);

        var request = new StartAiConversationRequest(AiMentorMode.Explain, "Understanding Recursion");

        // Act
        var result = await _sut.StartConversationAsync(userId, request);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal("Explain", result.Value.Mode);
        Assert.Equal("Understanding Recursion", result.Value.Title);
        Assert.True(result.Value.IsActive);
        _aiRepoMock.Verify(r => r.AddConversation(It.IsAny<AiConversation>()), Times.Once);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task SendMessage_ValidUserAndActiveConversation_InvokesLlmAndPersistsHistory()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var conversationId = Guid.NewGuid();

        var conversation = AiConversation.Create(userId, AiMentorMode.Explain, "Recursion Session");
        typeof(AiConversation).GetProperty("Id")!.SetValue(conversation, conversationId);

        _aiRepoMock.Setup(r => r.FindByIdWithMessagesAsync(conversationId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(conversation);

        _llmProviderMock.Setup(l => l.CompleteAsync(It.IsAny<LlmCompletionRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new LlmCompletionResponse(
                Content: "Recursion is a programming technique where a function calls itself.",
                ModelUsed: "gpt-4o",
                InputTokens: 25,
                OutputTokens: 30,
                IsSuccess: true
            ));

        var sendRequest = new SendAiMessageRequest("What is recursion?");

        // Act
        var result = await _sut.SendMessageAsync(userId, conversationId, sendRequest);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal("Assistant", result.Value.Role);
        Assert.Contains("Recursion is a programming technique", result.Value.Content);
        _aiRepoMock.Verify(r => r.AddMessage(It.IsAny<AiMessage>()), Times.Exactly(2)); // User + Assistant messages
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task SendMessage_IDORCheck_DifferentUserConversation_ReturnsNotFoundFailure()
    {
        // Arrange
        var ownerUserId = Guid.NewGuid();
        var attackerUserId = Guid.NewGuid();
        var conversationId = Guid.NewGuid();

        var conversation = AiConversation.Create(ownerUserId, AiMentorMode.Explain);

        _aiRepoMock.Setup(r => r.FindByIdWithMessagesAsync(conversationId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(conversation);

        var sendRequest = new SendAiMessageRequest("Explain arrays");

        // Act
        var result = await _sut.SendMessageAsync(attackerUserId, conversationId, sendRequest);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("NOT_FOUND", result.ErrorCode);
        _llmProviderMock.Verify(l => l.CompleteAsync(It.IsAny<LlmCompletionRequest>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task SendMessage_ExceedingMaxLength_ReturnsInvalidInputFailure()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var conversationId = Guid.NewGuid();

        var longMessage = new string('A', 4001); // Exceeds 4000 char max
        var sendRequest = new SendAiMessageRequest(longMessage);

        // Act
        var result = await _sut.SendMessageAsync(userId, conversationId, sendRequest);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("INVALID_INPUT", result.ErrorCode);
    }

    [Fact]
    public async Task SendMessage_EmptyContent_ReturnsInvalidInputFailure()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var conversationId = Guid.NewGuid();
        var sendRequest = new SendAiMessageRequest("   ");

        // Act
        var result = await _sut.SendMessageAsync(userId, conversationId, sendRequest);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("INVALID_INPUT", result.ErrorCode);
    }

    [Fact]
    public async Task SendMessage_ClosedConversation_ReturnsConversationClosedFailure()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var conversationId = Guid.NewGuid();

        var conversation = AiConversation.Create(userId, AiMentorMode.Study);
        conversation.Close(); // Closed session

        _aiRepoMock.Setup(r => r.FindByIdWithMessagesAsync(conversationId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(conversation);

        var sendRequest = new SendAiMessageRequest("Hello");

        // Act
        var result = await _sut.SendMessageAsync(userId, conversationId, sendRequest);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("CONVERSATION_CLOSED", result.ErrorCode);
    }

    [Fact]
    public async Task SendMessage_LlmProviderException_ReturnsProviderErrorFailureWithoutCorruptingState()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var conversationId = Guid.NewGuid();

        var conversation = AiConversation.Create(userId, AiMentorMode.Explain);

        _aiRepoMock.Setup(r => r.FindByIdWithMessagesAsync(conversationId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(conversation);

        _llmProviderMock.Setup(l => l.CompleteAsync(It.IsAny<LlmCompletionRequest>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new HttpRequestException("API connection timeout"));

        var sendRequest = new SendAiMessageRequest("Explain stacks");

        // Act
        var result = await _sut.SendMessageAsync(userId, conversationId, sendRequest);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("AI_PROVIDER_ERROR", result.ErrorCode);
    }

    [Fact]
    public async Task GetConversationById_IDORCheck_DifferentUserConversation_ReturnsNotFoundFailure()
    {
        // Arrange
        var ownerUserId = Guid.NewGuid();
        var attackerUserId = Guid.NewGuid();
        var conversationId = Guid.NewGuid();

        var conversation = AiConversation.Create(ownerUserId, AiMentorMode.Study);

        _aiRepoMock.Setup(r => r.FindByIdWithMessagesAsync(conversationId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(conversation);

        // Act
        var result = await _sut.GetConversationByIdAsync(attackerUserId, conversationId);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Equal("NOT_FOUND", result.ErrorCode);
    }

    [Fact]
    public async Task CloseConversation_ValidOwner_ClosesConversation()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var conversationId = Guid.NewGuid();

        var conversation = AiConversation.Create(userId, AiMentorMode.Study);

        _aiRepoMock.Setup(r => r.FindByIdAsync(conversationId, true, It.IsAny<CancellationToken>()))
            .ReturnsAsync(conversation);

        // Act
        var result = await _sut.CloseConversationAsync(userId, conversationId);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.False(conversation.IsActive);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }
}
