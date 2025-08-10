import { useCallback } from 'react';
import { useNotify } from '@core/hooks';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const API_BASE_PREFIX = '/api/v1';
console.log('API_BASE_URL:', API_BASE_URL);
// Type d'erreur API pour une meilleure gestion
export type ApiError = {
  message: string;
  statusCode: number;
  timestamp?: string;
  path?: string;
};

// Helper pour créer une URL complète
export const createApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${API_BASE_PREFIX}${endpoint}`;
};

// Helper pour gérer les erreurs d'API
export const handleApiError = async (response: Response) => {
  if (!response.ok) {
    let errorData: ApiError;

    try {
      // Essayer de parser la réponse d'erreur du serveur
      errorData = await response.json();
    } catch {
      // Si le parsing échoue, créer une erreur générique
      errorData = {
        message: `HTTP Error ${response.status}: ${response.statusText}`,
        statusCode: response.status,
      };
    }

    // Lancer une erreur avec les données structurées
    const error = new Error(errorData.message) as Error & ApiError;
    error.statusCode = errorData.statusCode;
    error.timestamp = errorData.timestamp;
    error.path = errorData.path;

    throw error;
  }
  return response;
};

// Helper pour les requêtes avec authentification
export const createAuthenticatedRequest = (token?: string): RequestInit => ({
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

// Hook de base pour les appels API - utilisé par les hooks spécialisés
export const useApi = () => {
  const { notifyApiError } = useNotify();

  const request = useCallback(async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const url = createApiUrl(endpoint);

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Important pour les cookies de session
      ...options,
    };

    try {
      const response = await fetch(url, config);
      await handleApiError(response);
      return await response.json();
    } catch (error) {
      // Gérer les erreurs réseau et autres erreurs non-HTTP
      if (error instanceof TypeError && error.message.includes('fetch')) {
        const networkError = new Error('Erreur de connexion réseau') as Error & { name: string; };
        networkError.name = 'NetworkError';
        throw networkError;
      }

      // Re-lancer l'erreur si elle est déjà formatée
      throw error;
    }
  }, []);

  const requestWithErrorHandling = useCallback(async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    try {
      return await request<T>(endpoint, options);
    } catch (error) {
      notifyApiError(error);
      throw error;
    }
  }, [request, notifyApiError]);

  return {
    // Méthode de base sans gestion d'erreur automatique
    request,
    // Méthode avec gestion d'erreur automatique (notifications)
    requestWithErrorHandling,
  };
};
