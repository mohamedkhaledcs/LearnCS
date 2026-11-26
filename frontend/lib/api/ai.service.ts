import { apiClient } from "./client";
import type { 
  AiConversationDetailsDto, 
  AiConversationSummaryDto, 
  AiMessageDto, 
  StartAiConversationRequest, 
  SendAiMessageRequest 
} from "@/types/ai";

export const AiService = {
  startConversation: async (data: StartAiConversationRequest = {}): Promise<AiConversationDetailsDto> => {
    const response = await apiClient.post<AiConversationDetailsDto>("/api/ai/conversations", data);
    return response.data;
  },

  getMyConversations: async (): Promise<AiConversationSummaryDto[]> => {
    const response = await apiClient.get<AiConversationSummaryDto[]>("/api/ai/conversations");
    return response.data;
  },

  getConversationById: async (id: string): Promise<AiConversationDetailsDto> => {
    const response = await apiClient.get<AiConversationDetailsDto>(`/api/ai/conversations/${id}`);
    return response.data;
  },

  sendMessage: async (id: string, data: SendAiMessageRequest): Promise<AiMessageDto> => {
    const response = await apiClient.post<AiMessageDto>(`/api/ai/conversations/${id}/messages`, data);
    return response.data;
  },

  closeConversation: async (id: string): Promise<boolean> => {
    const response = await apiClient.post<boolean>(`/api/ai/conversations/${id}/close`);
    return response.data;
  }
};
