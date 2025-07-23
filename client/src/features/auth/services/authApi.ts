import type { AuthResponse, RegisterRequest, LoginRequest, User } from '../types';

// Configuration de base pour l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_PREFIX = '/api/v1';

// Helper pour créer une URL complète
const createApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${API_PREFIX}${endpoint}`;
};

// Helper pour gérer les erreurs d'API
const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: `HTTP ${response.status}: ${response.statusText}`,
      statusCode: response.status,
    }));

    throw {
      message: errorData.message || 'Une erreur est survenue',
      statusCode: response.status,
    };
  }
  return response;
};

// Helper pour les requêtes avec authentification
const createAuthenticatedRequest = (token?: string): RequestInit => ({
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

// Services d'authentification
export const authApi = {
  // Inscription d'un nouvel utilisateur
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(createApiUrl('/auth/register'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    await handleApiError(response);
    return response.json();
  },

  // Connexion d'un utilisateur
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(createApiUrl('/auth/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    await handleApiError(response);
    return response.json();
  },

  // Obtenir le profil de l'utilisateur connecté
  getProfile: async (token: string): Promise<User> => {
    const response = await fetch(createApiUrl('/auth/profile'), {
      method: 'GET',
      ...createAuthenticatedRequest(token),
    });

    await handleApiError(response);
    return response.json();
  },

  // Authentification Google (redirection)
  googleAuth: (): void => {
    window.location.href = createApiUrl('/auth/google');
  },

  // Vérifier la validité d'un token
  verifyToken: async (token: string): Promise<User> => {
    const response = await fetch(createApiUrl('/auth/profile'), {
      method: 'GET',
      ...createAuthenticatedRequest(token),
    });

    await handleApiError(response);
    return response.json();
  },
};

// Utilitaires pour la gestion des tokens
export const tokenUtils = {
  // Clé pour le stockage local
  TOKEN_KEY: 'auth_token',

  // Sauvegarder le token
  saveToken: (token: string): void => {
    localStorage.setItem(tokenUtils.TOKEN_KEY, token);
  },

  // Récupérer le token
  getToken: (): string | null => {
    return localStorage.getItem(tokenUtils.TOKEN_KEY);
  },

  // Supprimer le token
  removeToken: (): void => {
    localStorage.removeItem(tokenUtils.TOKEN_KEY);
  },

  // Vérifier si un token existe
  hasToken: (): boolean => {
    return !!tokenUtils.getToken();
  },
};
