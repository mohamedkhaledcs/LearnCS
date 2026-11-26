import { apiClient } from "./client";

export const LearningPathsService = {
  getPublished: async () => {
    const response = await apiClient.get("/api/learningpaths");
    return response.data;
  },
  
  getDetails: async (idOrSlug: string) => {
    const response = await apiClient.get(`/api/learningpaths/${idOrSlug}`);
    return response.data;
  },

  enroll: async (pathId: string) => {
    const response = await apiClient.post(`/api/learningpaths/${pathId}/enroll`);
    return response.data;
  },

  getMyEnrollments: async () => {
    const response = await apiClient.get("/api/learningpaths/my-enrollments");
    return response.data;
  }
};
