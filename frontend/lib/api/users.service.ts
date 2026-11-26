import { apiClient } from "./client";

export const UsersService = {
  getMe: async () => {
    const response = await apiClient.get("/api/users/me");
    return response.data;
  },
  
  getProfile: async () => {
    const response = await apiClient.get("/api/users/me/profile");
    return response.data;
  },

  updateProfile: async (data: any) => {
    const response = await apiClient.put("/api/users/me/profile", data);
    return response.data;
  },

  getSettings: async () => {
    const response = await apiClient.get("/api/users/me/settings");
    return response.data;
  },

  updateSettings: async (data: any) => {
    const response = await apiClient.put("/api/users/me/settings", data);
    return response.data;
  }
};
