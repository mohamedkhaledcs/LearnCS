import { apiClient } from "./client";

export const LessonsService = {
  getById: async (id: string) => {
    const response = await apiClient.get(`/api/lessons/${id}`);
    return response.data;
  },
  
  getBySlug: async (slug: string) => {
    const response = await apiClient.get(`/api/lessons/${slug}`);
    return response.data;
  }
};
