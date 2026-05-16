import { useMutation, useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useNotify, useTranslation } from '@core/hooks';
import { useAuthApi } from '../services/useAuthApi';
import { isAuthenticatedCookie } from '../services/utils';
import type { AuthResponse, RegisterRequest, LoginRequest, User, AuthError } from '../types';

// Clés de requête pour le cache
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
  user: (id: number) => [...authKeys.all, 'user', id] as const,
};

// Hook pour l'inscription
export const useRegister = () => {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyApiError } = useNotify();
  const { t } = useTranslation();
  const authApi = useAuthApi();

  return useMutation<AuthResponse, AuthError, RegisterRequest>({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      // Mettre en cache les données utilisateur (le cookie httpOnly est posé par le serveur)
      queryClient.setQueryData(authKeys.profile(), data.user);
      notifySuccess(t('auth.success.registrationSuccess'));
    },
    onError: (error) => {
      console.error("Erreur lors de l'inscription:", error);
      notifyApiError(error);
    },
  });
};

// Hook pour la connexion
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyApiError } = useNotify();
  const { t } = useTranslation();
  const authApi = useAuthApi();

  return useMutation<AuthResponse, AuthError, LoginRequest>({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Mettre en cache les données utilisateur (le cookie httpOnly est posé par le serveur)
      queryClient.setQueryData(authKeys.profile(), data.user);
      notifySuccess(t('auth.success.loginSuccess'));
    },
    onError: (error) => {
      console.error('Erreur lors de la connexion:', error);
      notifyApiError(error);
    },
  });
};

// Hook pour obtenir le profil utilisateur
// Le cookie is_authenticated (non-httpOnly) indique si une session est active sans exposer le token.
export const useProfile = (enabled: boolean = true) => {
  const authApi = useAuthApi();

  return useQuery<User, AuthError>({
    queryKey: authKeys.profile(),
    queryFn: () => authApi.getProfile(),
    enabled: enabled && isAuthenticatedCookie(),
    staleTime: 60 * 60 * 1000, // 60 minutes
    gcTime: 60 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error && 'statusCode' in error && error.statusCode === 401) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook pour la déconnexion
export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const authApi = useAuthApi();

  return useMutation<void, AuthError, void>({
    mutationFn: async () => {
      // Appel serveur pour invalider la session et effacer les cookies httpOnly
      await authApi.logout();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.all });
      router.navigate({ to: '/' });
    },
    onError: (error) => {
      console.error('Erreur lors de la déconnexion:', error);
      // Nettoyer le cache même en cas d'erreur réseau
      queryClient.removeQueries({ queryKey: authKeys.all });
      router.navigate({ to: '/' });
    },
  });
};

// Hook pour vérifier l'état d'authentification
export const useAuth = () => {
  const { data: user, isLoading, error, isError } = useProfile();

  const isAuthenticated = !!user && !isError;
  const isUnauthenticated = !isAuthenticatedCookie() || isError;

  return {
    user,
    isAuthenticated,
    isUnauthenticated,
    isLoading,
    error,
  };
};

// Hook pour la redirection Google OAuth
export const useGoogleAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const authApi = useAuthApi();

  return useMutation<AuthResponse, AuthError, void>({
    mutationFn: () => authApi.googleAuth(),
    onSuccess: (data) => {
      // Le cookie httpOnly est posé par le serveur dans la popup
      queryClient.setQueryData(authKeys.profile(), data.user);
      router.navigate({ to: '/profile' }).catch(() => {
        router.navigate({ to: '/' });
      });
    },
    onError: (error) => {
      console.error("Erreur lors de l'authentification Google:", error);
    },
  });
};

// Utilitaire pour invalider les données d'authentification
export const invalidateAuthData = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: authKeys.all });
};

// Utilitaire pour précharger les données utilisateur
export const prefetchUserProfile = async (queryClient: QueryClient) => {
  if (!isAuthenticatedCookie()) return;

  const apiBaseUrl = import.meta.env.VITE_API_URL || '';
  await queryClient.prefetchQuery({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const response = await fetch(`${apiBaseUrl}/api/v1/auth/profile`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });
};
