import { apiClient } from "./client";
import type { LearnerProgressSummaryDto, ConceptMasteryItemDto } from "@/types/progress";

export const ProgressService = {
  getSummary: async (): Promise<LearnerProgressSummaryDto> => {
    const response = await apiClient.get<LearnerProgressSummaryDto>("/api/progress/summary");
    return response.data;
  },
  
  getMastery: async (): Promise<ConceptMasteryItemDto[]> => {
    const response = await apiClient.get<ConceptMasteryItemDto[]>("/api/progress/mastery");
    return response.data;
  },

  // Record lesson progress
  completeLesson: async (lessonId: string, durationSeconds: number): Promise<any> => {
    const response = await apiClient.post("/api/progress/lessons/complete", { lessonId, durationSeconds });
    return response.data;
  },
  
  // Get progress for a specific path
  getPathProgress: async (pathId: string): Promise<any> => {
    const response = await apiClient.get(`/api/progress/paths/${pathId}`);
    return response.data;
  }
};
