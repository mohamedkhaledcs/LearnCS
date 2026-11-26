using LearnCS.Application.Common;
using LearnCS.Application.Contracts.AI;
using LearnCS.Application.Contracts.Persistence;
using LearnCS.Application.Features.AI.DTOs;
using LearnCS.Domain.Platform;

namespace LearnCS.Application.Features.AI.Services;

public class AiConversationService(
    IAiConversationRepository aiConversationRepository,
    IUserRepository userRepository,
    ILlmProvider llmProvider,
    IUnitOfWork unitOfWork) : IAiConversationService
{
    private const int MaxMessageLength = 4000;

    public async Task<Result<AiConversationDetailsDto>> StartConversationAsync(
        Guid userId,
        StartAiConversationRequest request,
        CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<AiConversationDetailsDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var user = await userRepository.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            return Result<AiConversationDetailsDto>.Failure("User account not found.", "USER_NOT_FOUND");
        }

        var title = string.IsNullOrWhiteSpace(request.Title)
            ? $"{request.Mode} Session"
            : request.Title.Trim();

        var conversation = AiConversation.Create(
            userId,
            request.Mode,
            title,
            request.ConceptId,
            request.LessonId,
            request.LearningPathId
        );

        aiConversationRepository.AddConversation(conversation);

        // Process optional initial prompt if supplied
        if (!string.IsNullOrWhiteSpace(request.InitialMessage))
        {
            var initialContent = request.InitialMessage.Trim();

            if (initialContent.Length > MaxMessageLength)
            {
                return Result<AiConversationDetailsDto>.Failure(
                    $"Initial message exceeds maximum allowed length of {MaxMessageLength} characters.",
                    "INVALID_INPUT"
                );
            }

            var userMsg = AiMessage.Create(conversation.Id, AiMessageRole.User, initialContent);
            aiConversationRepository.AddMessage(userMsg);
            conversation.Messages.Add(userMsg);

            var systemPrompt = BuildSystemPrompt(conversation.Mode);
            var llmMessages = new List<LlmChatMessage>
            {
                new(LlmRole.User, initialContent)
            };

            try
            {
                var completion = await llmProvider.CompleteAsync(
                    new LlmCompletionRequest(llmMessages, SystemPrompt: systemPrompt),
                    cancellationToken
                );

                if (completion.IsSuccess)
                {
                    var assistantMsg = AiMessage.Create(
                        conversation.Id,
                        AiMessageRole.Assistant,
                        completion.Content,
                        completion.InputTokens,
                        completion.OutputTokens,
                        completion.ModelUsed
                    );

                    aiConversationRepository.AddMessage(assistantMsg);
                    conversation.Messages.Add(assistantMsg);
                }
            }
            catch
            {
                // Provider failure fallback, conversation is created safely, user can retry sending message
            }
        }

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<AiConversationDetailsDto>.Success(MapToDetailsDto(conversation));
    }

    public async Task<Result<AiMessageDto>> SendMessageAsync(
        Guid userId,
        Guid conversationId,
        SendAiMessageRequest request,
        CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<AiMessageDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        if (string.IsNullOrWhiteSpace(request?.Content))
        {
            return Result<AiMessageDto>.Failure("Message content cannot be empty.", "INVALID_INPUT");
        }

        var content = request.Content.Trim();
        if (content.Length > MaxMessageLength)
        {
            return Result<AiMessageDto>.Failure(
                $"Message content exceeds maximum allowed length of {MaxMessageLength} characters.",
                "INVALID_INPUT"
            );
        }

        var conversation = await aiConversationRepository.FindByIdWithMessagesAsync(conversationId, cancellationToken);
        if (conversation == null || conversation.UserId != userId)
        {
            return Result<AiMessageDto>.Failure("AI conversation not found or access denied.", "NOT_FOUND");
        }

        if (!conversation.IsActive)
        {
            return Result<AiMessageDto>.Failure("AI conversation is closed.", "CONVERSATION_CLOSED");
        }

        // Build LLM prompt from conversation history + new user message
        var llmMessages = conversation.Messages
            .OrderBy(m => m.CreatedAt)
            .Select(m => new LlmChatMessage(MapToLlmRole(m.Role), m.Content))
            .ToList();

        llmMessages.Add(new LlmChatMessage(LlmRole.User, content));

        var systemPrompt = BuildSystemPrompt(conversation.Mode);
        var llmRequest = new LlmCompletionRequest(llmMessages, SystemPrompt: systemPrompt);

        LlmCompletionResponse completion;
        try
        {
            completion = await llmProvider.CompleteAsync(llmRequest, cancellationToken);
        }
        catch (Exception ex)
        {
            return Result<AiMessageDto>.Failure($"AI provider service error: {ex.Message}", "AI_PROVIDER_ERROR");
        }

        if (!completion.IsSuccess)
        {
            return Result<AiMessageDto>.Failure(completion.ErrorMessage ?? "AI completion failed.", "AI_PROVIDER_ERROR");
        }

        // Persist User Message & Assistant Message
        var userMsg = AiMessage.Create(conversation.Id, AiMessageRole.User, content);
        var assistantMsg = AiMessage.Create(
            conversation.Id,
            AiMessageRole.Assistant,
            completion.Content,
            completion.InputTokens,
            completion.OutputTokens,
            completion.ModelUsed
        );

        aiConversationRepository.AddMessage(userMsg);
        aiConversationRepository.AddMessage(assistantMsg);

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<AiMessageDto>.Success(MapToMessageDto(assistantMsg));
    }

    public async Task<Result<IReadOnlyList<AiConversationSummaryDto>>> GetMyConversationsAsync(
        Guid userId,
        CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<IReadOnlyList<AiConversationSummaryDto>>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var user = await userRepository.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            return Result<IReadOnlyList<AiConversationSummaryDto>>.Failure("User account not found.", "USER_NOT_FOUND");
        }

        var conversations = await aiConversationRepository.GetActiveConversationsForUserAsync(userId, cancellationToken);
        var dtos = conversations.Select(MapToSummaryDto).ToList();

        return Result<IReadOnlyList<AiConversationSummaryDto>>.Success(dtos);
    }

    public async Task<Result<AiConversationDetailsDto>> GetConversationByIdAsync(
        Guid userId,
        Guid conversationId,
        CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<AiConversationDetailsDto>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var conversation = await aiConversationRepository.FindByIdWithMessagesAsync(conversationId, cancellationToken);
        if (conversation == null || conversation.UserId != userId)
        {
            return Result<AiConversationDetailsDto>.Failure("AI conversation not found or access denied.", "NOT_FOUND");
        }

        return Result<AiConversationDetailsDto>.Success(MapToDetailsDto(conversation));
    }

    public async Task<Result<bool>> CloseConversationAsync(
        Guid userId,
        Guid conversationId,
        CancellationToken cancellationToken = default)
    {
        if (userId == Guid.Empty)
        {
            return Result<bool>.Failure("Invalid user identifier context.", "UNAUTHORIZED");
        }

        var conversation = await aiConversationRepository.FindByIdAsync(conversationId, trackForUpdate: true, cancellationToken);
        if (conversation == null || conversation.UserId != userId)
        {
            return Result<bool>.Failure("AI conversation not found or access denied.", "NOT_FOUND");
        }

        conversation.Close();
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<bool>.Success(true);
    }

    private static string BuildSystemPrompt(AiMentorMode mode)
    {
        return mode switch
        {
            AiMentorMode.Study => "You are LearnCS AI Mentor. Help the student study computer science concepts clearly with simple explanations and practical examples.",
            AiMentorMode.Explain => "You are LearnCS AI Mentor. Explain computer science topics step-by-step with practical code snippets.",
            AiMentorMode.Hint => "You are LearnCS AI Mentor. Give helpful guidance and hints without revealing full solutions directly.",
            AiMentorMode.Revision => "You are LearnCS AI Mentor. Guide the student in revising key computer science topics.",
            AiMentorMode.Quiz => "You are LearnCS AI Mentor. Quiz the student on computer science concepts and evaluate their answers.",
            AiMentorMode.CareerMentor => "You are LearnCS AI Career Mentor. Provide guidance on Computer Science career paths, skills, and industry specializations.",
            _ => "You are LearnCS AI Mentor. Assist the student in learning computer science."
        };
    }

    private static LlmRole MapToLlmRole(AiMessageRole role)
    {
        return role switch
        {
            AiMessageRole.User => LlmRole.User,
            AiMessageRole.Assistant => LlmRole.Assistant,
            AiMessageRole.System => LlmRole.System,
            _ => LlmRole.User
        };
    }

    private static AiConversationSummaryDto MapToSummaryDto(AiConversation c)
    {
        var messages = c.Messages ?? [];
        var count = messages.Count;
        var lastMsgAt = messages.OrderByDescending(m => m.CreatedAt).FirstOrDefault()?.CreatedAt;

        return new AiConversationSummaryDto(
            c.Id,
            c.UserId,
            c.Mode.ToString(),
            c.Title,
            c.ConceptId,
            c.LessonId,
            c.LearningPathId,
            c.IsActive,
            c.CreatedAt,
            count,
            lastMsgAt
        );
    }

    private static AiConversationDetailsDto MapToDetailsDto(AiConversation c)
    {
        var msgDtos = (c.Messages ?? [])
            .OrderBy(m => m.CreatedAt)
            .Select(MapToMessageDto)
            .ToList();

        return new AiConversationDetailsDto(
            c.Id,
            c.UserId,
            c.Mode.ToString(),
            c.Title,
            c.ConceptId,
            c.LessonId,
            c.LearningPathId,
            c.IsActive,
            c.CreatedAt,
            msgDtos
        );
    }

    private static AiMessageDto MapToMessageDto(AiMessage m)
    {
        return new AiMessageDto(
            m.Id,
            m.ConversationId,
            m.Role.ToString(),
            m.Content,
            m.CreatedAt,
            m.InputTokens,
            m.OutputTokens,
            m.ModelUsed
        );
    }
}
