import { useCallback } from 'react';
import type { AuthResponse, RegisterRequest, LoginRequest, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
const API_PREFIX = '/api/v1';

const apiUrl = (endpoint: string) => `${API_BASE_URL}${API_PREFIX}${endpoint}`;

const apiFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(apiUrl(endpoint), {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let errorData: { message: string; statusCode: number; };
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: `HTTP ${response.status}: ${response.statusText}`, statusCode: response.status };
    }
    const error = Object.assign(new Error(errorData.message), { statusCode: errorData.statusCode });
    throw error;
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
};

export const createApiUrl = apiUrl;

export const useAuthApi = () => {
  const register = useCallback(
    (data: RegisterRequest): Promise<AuthResponse> =>
      apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    [],
  );

  const login = useCallback(
    (data: LoginRequest): Promise<AuthResponse> =>
      apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    [],
  );

  const getProfile = useCallback(
    (): Promise<User> => apiFetch('/auth/profile', { method: 'GET' }),
    [],
  );

  const logout = useCallback(
    (): Promise<void> => apiFetch('/auth/logout', { method: 'POST' }),
    [],
  );

  const googleAuth = useCallback((): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      const popup = window.open(
        apiUrl('/auth/google'),
        'googleAuth',
        'width=500,height=600,scrollbars=yes,resizable=yes',
      );

      if (!popup) {
        reject(new Error("Impossible d'ouvrir la popup. Vérifiez que les popups ne sont pas bloquées."));
        return;
      }

      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== API_BASE_URL) return;
        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          window.removeEventListener('message', handleMessage);
          clearInterval(checkClosed);
          popup.close();
          resolve(event.data.payload as AuthResponse);
        } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
          window.removeEventListener('message', handleMessage);
          clearInterval(checkClosed);
          popup.close();
          reject(new Error(event.data.error || "Erreur lors de l'authentification Google"));
        }
      };

      window.addEventListener('message', handleMessage);

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          reject(new Error("Authentification annulée par l'utilisateur"));
        }
      }, 1000);
    });
  }, []);

  return { register, login, getProfile, logout, googleAuth };
};

