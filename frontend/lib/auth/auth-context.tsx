"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiClient, getStoredAuth, setStoredAuth, clearStoredAuth, StoredAuthState } from "@/lib/api/client";
import type { UserDto, AuthResponse } from "@/types/auth";
import { LearningPathsService } from "@/lib/api/learning-paths.service";

interface AuthContextValue {
  user: UserDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const hydrateUser = useCallback(async () => {
    const stored = getStoredAuth();
    if (!stored?.accessToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiClient.get<UserDto>("/api/users/me");
      setUser(res.data);
    } catch {
      // Token may be expired, the interceptor handles refresh.
      // If it still fails, clear auth.
      clearStoredAuth();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    hydrateUser();

    // Listen for forced logout events from the API interceptor
    const handleUnauthorized = () => {
      setUser(null);
      clearStoredAuth();
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [hydrateUser]);

  const login = async (email: string, password: string) => {
    const res = await apiClient.post<AuthResponse>("/api/auth/login", { emailOrUsername: email, password });
    const authState: StoredAuthState = {
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
      expiresAt: res.data.accessTokenExpiresAt,
      userId: res.data.user.id,
    };
    setStoredAuth(authState);
    setUser(res.data.user);
    await handlePostAuthTasks();
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await apiClient.post<AuthResponse>("/api/auth/register", {
      username: name,
      email,
      password,
    });
    const authState: StoredAuthState = {
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
      expiresAt: res.data.accessTokenExpiresAt,
      userId: res.data.user.id,
    };
    setStoredAuth(authState);
    setUser(res.data.user);
    await handlePostAuthTasks();
  };

  const handlePostAuthTasks = async () => {
    // If user took the diagnostic assessment before authenticating, persist their diagnostic breakdown + enroll in top track
    if (typeof window !== "undefined") {
      const offlineResultRaw = localStorage.getItem("learncs_assessment_result");
      if (offlineResultRaw) {
        try {
          const parsed = JSON.parse(offlineResultRaw);
          if (parsed && parsed.sessionId) {
            await apiClient.post("/api/progress/diagnostic", {
              sessionId: parsed.sessionId,
              overallScore: parsed.overallScore ?? 0,
              maxScore: parsed.maxScore ?? 1,
              percentage: parsed.percentage ?? 0,
              recommendedLevel: parsed.recommendedLevel ?? "beginner",
              resultJson: offlineResultRaw,
            });
          }
          const paths = await LearningPathsService.getPublished();
          const preferredId = parsed?.recommendedPaths?.[0]?.pathId;
          const matchingPath = preferredId
            ? paths?.find((p: { id?: string; slug?: string }) => p.id === preferredId || p.slug === preferredId)
            : null;
          const targetPath = matchingPath || (paths && paths.length > 0 ? paths[0] : null);
          if (targetPath?.id) {
            await LearningPathsService.enroll(targetPath.id);
          }
        } catch (err) {
          console.error("Failed to sync diagnostic assessment post auth", err);
        } finally {
          localStorage.removeItem("learncs_assessment_result");
          localStorage.removeItem("learncs_assessment_completed");
        }
      }
    }
  };

  const logout = () => {
    clearStoredAuth();
    setUser(null);
    // Also clear the old legacy key
    if (typeof window !== "undefined") {
      localStorage.removeItem("learncs_auth");
    }
  };

  const refreshUser = async () => {
    await hydrateUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
