import { useCallback } from 'react';
import { useApi, createApiUrl } from '@core/services/api';
import type { AuthResponse, RegisterRequest, LoginRequest, User } from '../types';

// Hook spécialisé pour les API d'authentification
export const useAuthApi = () => {
  const { request } = useApi();

  // Inscription d'un nouvel utilisateur
  const register = useCallback(
    async (data: RegisterRequest): Promise<AuthResponse> => {
      return await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    [request],
  );

  // Connexion d'un utilisateur
  const login = useCallback(
    async (data: LoginRequest): Promise<AuthResponse> => {
      return await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    [request],
  );

  // Obtenir le profil — les cookies httpOnly sont envoyés automatiquement
  const getProfile = useCallback(async (): Promise<User> => {
    return await request('/auth/profile', { method: 'GET' });
  }, [request]);

  // Déconnexion — invalide la session côté serveur et efface les cookies
  const logout = useCallback(async (): Promise<void> => {
    await request('/auth/logout', { method: 'POST' });
  }, [request]);

  // Authentification Google (popup)
  const googleAuth = useCallback((): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      const popup = window.open(
        createApiUrl('/auth/google'),
        'googleAuth',
        'width=500,height=600,scrollbars=yes,resizable=yes',
      );

      if (!popup) {
        reject(
          new Error(
            "Impossible d'ouvrir la popup. Vérifiez que les popups ne sont pas bloquées.",
          ),
        );
        return;
      }

      const handleMessage = (event: MessageEvent) => {
        // Vérifier l'origine pour la sécurité
        const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        if (event.origin !== apiBaseUrl) return;

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
          reject(new Error('Authentification annulée par l\'utilisateur'));
        }
      }, 1000);
    });
  }, []);

  return {
    register,
    login,
    getProfile,
    logout,
    googleAuth,
  };
};
