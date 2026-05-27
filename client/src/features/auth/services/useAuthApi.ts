import { useCallback } from 'react';
import {
  authControllerRegister,
  authControllerLogin,
  authControllerGetProfile,
  authControllerLogout,
  getAuthControllerGoogleAuthUrl,
} from '@core/api/authentification/authentification';
import type { AuthResponseDto, LoginDto, RegisterDto } from '@core/api/model';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const useAuthApi = () => {
  const register = useCallback(
    async (data: RegisterDto): Promise<AuthResponseDto> => {
      const response = await authControllerRegister(data);
      if (response.status === 201) return response.data;
      throw new Error('Unexpected registration response');
    },
    [],
  );

  const login = useCallback(
    async (data: LoginDto): Promise<AuthResponseDto> => {
      const response = await authControllerLogin(data);
      if (response.status === 200) return response.data;
      throw new Error('Unexpected login response');
    },
    [],
  );

  const getProfile = useCallback(
    async (): Promise<AuthResponseDto['user']> => {
      const response = await authControllerGetProfile();
      if (response.status === 200) return response.data;
      throw new Error('Unauthorized');
    },
    [],
  );

  const logout = useCallback(
    async (): Promise<void> => {
      await authControllerLogout();
    },
    [],
  );

  const googleAuth = useCallback((): Promise<AuthResponseDto> => {
    return new Promise((resolve, reject) => {
      const channel = new BroadcastChannel('google_auth');

      const popup = window.open(
        `${API_BASE_URL}${getAuthControllerGoogleAuthUrl()}`,
        'googleAuth',
        'width=500,height=600,scrollbars=yes,resizable=yes',
      );

      if (!popup) {
        channel.close();
        reject(new Error("Impossible d'ouvrir la popup. Vérifiez que les popups ne sont pas bloquées."));
        return;
      }

      channel.onmessage = (event) => {
        channel.close();
        clearInterval(checkClosed);
        popup.close();
        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          resolve(event.data.payload as AuthResponseDto);
        } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
          reject(new Error(event.data.error || "Erreur lors de l'authentification Google"));
        }
      };

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          channel.close();
          reject(new Error("Authentification annulée par l'utilisateur"));
        }
      }, 1000);
    });
  }, []);

  return { register, login, getProfile, logout, googleAuth };
};

