import { useCallback } from 'react';
import { useApi, createApiUrl, createAuthenticatedRequest } from '@core/services/api';
import type { AuthResponse, RegisterRequest, LoginRequest, User } from '../types';

// Hook spécialisé pour les API d'authentification
export const useAuthApi = () => {
  const { request } = useApi();

  // Inscription d'un nouvel utilisateur
  const register = useCallback(async (data: RegisterRequest): Promise<AuthResponse> => {
    return await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }, [request]);

  // Connexion d'un utilisateur
  const login = useCallback(async (data: LoginRequest): Promise<AuthResponse> => {
    return await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }, [request]);

  // Obtenir le profil de l'utilisateur connecté
  const getProfile = useCallback(async (token: string): Promise<User> => {
    return await request('/auth/profile', {
      method: 'GET',
      ...createAuthenticatedRequest(token),
    });
  }, [request]);

  // Authentification Google (popup) - garde la logique spéciale
  const googleAuth = useCallback((): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      const popup = window.open(
        createApiUrl('/auth/google'),
        'googleAuth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );

      if (!popup) {
        reject(new Error('Impossible d\'ouvrir la popup. Vérifiez que les popups ne sont pas bloquées.'));
        return;
      }

      // Écouter les messages de la popup
      const handleMessage = (event: MessageEvent) => {
        // Vérifier l'origine pour la sécurité
        const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        if (event.origin !== apiBaseUrl) return;

        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          window.removeEventListener('message', handleMessage);
          popup.close();
          resolve(event.data.payload);
        } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
          window.removeEventListener('message', handleMessage);
          popup.close();
          reject(new Error(event.data.error || 'Erreur lors de l\'authentification Google'));
        }
      };

      window.addEventListener('message', handleMessage);

      // Vérifier si la popup a été fermée manuellement
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          reject(new Error('Authentification annulée par l\'utilisateur'));
        }
      }, 1000);
    });
  }, []);

  // Vérifier la validité d'un token
  const verifyToken = useCallback(async (token: string): Promise<User> => {
    return await request('/auth/profile', {
      method: 'GET',
      ...createAuthenticatedRequest(token),
    });
  }, [request]);

  return {
    register,
    login,
    getProfile,
    googleAuth,
    verifyToken,
  };
};
