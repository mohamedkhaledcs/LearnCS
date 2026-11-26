import { apiClient } from "./client";

export const AssessmentsService = {
  getAvailable: async () => {
    const response = await apiClient.get("/api/assessments");
    return response.data;
  },
  
  startAttempt: async (assessmentId: string) => {
    const response = await apiClient.post(`/api/assessments/${assessmentId}/start`);
    return response.data;
  },

  submitAttempt: async (attemptId: string, answers: any) => {
    const response = await apiClient.post(`/api/assessments/attempts/${attemptId}/submit`, { answers });
    return response.data;
  },

  getMyAttempts: async () => {
    const response = await apiClient.get("/api/assessments/my-attempts");
    return response.data;
  }
};
