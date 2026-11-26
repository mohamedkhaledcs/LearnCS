import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ApiErrorResponse, ProblemDetails } from '@/types/api';
import type { AuthResponse } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const TOKEN_STORAGE_KEY = 'learncs_auth_state';

export interface StoredAuthState {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  userId: string;
}

export function getStoredAuth(): StoredAuthState | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as StoredAuthState;
  } catch {
    return null;
  }
}

export function setStoredAuth(state: StoredAuthState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(state));
}

export function clearStoredAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

// Request Interceptor: Attach JWT Bearer Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const auth = getStoredAuth();
    if (auth?.accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Refresh on 401 & Normalize Errors
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ProblemDetails>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized and Refresh Token Rotation
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (originalRequest.url?.includes('/api/auth/login') || originalRequest.url?.includes('/api/auth/register')) {
        return Promise.reject(normalizeApiError(error));
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const auth = getStoredAuth();
      if (!auth?.refreshToken || !auth?.userId) {
        clearStoredAuth();
        isRefreshing = false;
        if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('auth:unauthorized'));
        return Promise.reject(normalizeApiError(error));
      }

      try {
        const refreshResponse = await axios.post<AuthResponse>(`${API_BASE_URL}/api/auth/refresh-token`, {
          userId: auth.userId,
          refreshToken: auth.refreshToken,
        });

        const newAuthData: StoredAuthState = {
          accessToken: refreshResponse.data.accessToken,
          refreshToken: refreshResponse.data.refreshToken,
          expiresAt: refreshResponse.data.accessTokenExpiresAt,
          userId: refreshResponse.data.user.id,
        };

        setStoredAuth(newAuthData);
        processQueue(null, newAuthData.accessToken);
        isRefreshing = false;

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAuthData.accessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        isRefreshing = false;
        clearStoredAuth();
        if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('auth:unauthorized'));
        return Promise.reject(normalizeApiError(error));
      }
    }

    return Promise.reject(normalizeApiError(error));
  }
);

export function normalizeApiError(error: AxiosError<ProblemDetails>): ApiErrorResponse {
  const status = error.response?.status;
  const isNetworkError = !error.response || error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED';
  const isServerError = status ? status >= 500 : false;

  if (isNetworkError || isServerError) {
    return {
      message: 'Unable to connect to the server. Please make sure the API is running.',
      status: status || 500,
    };
  }

  if (error.response?.data && typeof error.response.data === 'object') {
    const pd = error.response.data as any;

    // Check if ASP.NET validation errors dictionary is present
    let validationMsg = '';
    if (pd.errors && typeof pd.errors === 'object') {
      const fieldKeys = Object.keys(pd.errors);
      if (fieldKeys.length > 0) {
        const firstField = pd.errors[fieldKeys[0]];
        if (Array.isArray(firstField) && firstField.length > 0) {
          validationMsg = firstField[0];
        } else if (typeof firstField === 'string') {
          validationMsg = firstField;
        }
      }
    }

    const message = pd.detail || 
      validationMsg || 
      (pd.title && pd.title !== 'One or more validation errors occurred.' ? pd.title : null) || 
      'Invalid request. Please check your inputs.';

    return {
      message,
      code: pd.extensions?.code,
      status: error.response.status,
      problemDetails: pd,
    };
  }

  return {
    message: 'An unexpected error occurred. Please try again.',
    status: status || 500,
  };
}
