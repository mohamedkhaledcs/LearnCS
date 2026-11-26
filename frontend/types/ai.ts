export interface AiMessageDto {
  id: string;
  conversationId: string;
  role: "User" | "Assistant" | "System";
  content: string;
  createdAt: string;
}

export interface AiConversationSummaryDto {
  id: string;
  title: string;
  isActive: boolean;
  createdAt: string;
  lastMessageAt: string;
  messageCount: number;
}

export interface AiConversationDetailsDto {
  id: string;
  learnerId: string;
  title: string;
  isActive: boolean;
  createdAt: string;
  lastMessageAt: string;
  messages: AiMessageDto[];
}

export interface StartAiConversationRequest {
  topic?: string;
  context?: string;
}

export interface SendAiMessageRequest {
  content: string;
}
