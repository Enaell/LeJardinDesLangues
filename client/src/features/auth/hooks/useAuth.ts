import { useMutation, useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { authApi, tokenUtils } from '../services/authApi';
import type {
  AuthResponse,
  RegisterRequest,
  LoginRequest,
  User,
  AuthError
} from '../types';

// Clés de requête pour le cache
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
  user: (id: number) => [...authKeys.all, 'user', id] as const,
};

// Hook pour l'inscription
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, AuthError, RegisterRequest>({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      // Sauvegarder le token
      tokenUtils.saveToken(data.accessToken);

      // Mettre en cache les données utilisateur
      queryClient.setQueryData(authKeys.profile(), data.user);

      // Invalider les requêtes liées à l'auth pour forcer la mise à jour
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (error) => {
      console.error('Erreur lors de l\'inscription:', error);
    },
  });
};

// Hook pour la connexion
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, AuthError, LoginRequest>({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Sauvegarder le token
      tokenUtils.saveToken(data.accessToken);

      // Mettre en cache les données utilisateur
      queryClient.setQueryData(authKeys.profile(), data.user);

      // Invalider les requêtes liées à l'auth pour forcer la mise à jour
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
    onError: (error) => {
      console.error('Erreur lors de la connexion:', error);
    },
  });
};

// Hook pour obtenir le profil utilisateur
export const useProfile = (enabled: boolean = true) => {
  const token = tokenUtils.getToken();

  return useQuery<User, AuthError>({
    queryKey: authKeys.profile(),
    queryFn: () => {
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }
      return authApi.getProfile(token);
    },
    enabled: enabled && !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (anciennement cacheTime)
    retry: (failureCount, error) => {
      // Ne pas réessayer si le token est invalide (401)
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

  return useMutation<void, AuthError, void>({
    mutationFn: async () => {
      // Supprimer le token
      tokenUtils.removeToken();
    },
    onSuccess: () => {
      // Supprimer uniquement les données d'authentification du cache
      queryClient.removeQueries({ queryKey: authKeys.all });

      // Rediriger vers la page d'accueil
      router.navigate({ to: '/' });
    },
    onError: (error) => {
      console.error('Erreur lors de la déconnexion:', error);
    },
  });
};

// Hook pour vérifier l'état d'authentification
export const useAuth = () => {
  const token = tokenUtils.getToken();
  const { data: user, isLoading, error, isError } = useProfile(!!token);

  const isAuthenticated = !!token && !!user && !isError;
  const isUnauthenticated = !token || isError;

  return {
    user,
    isAuthenticated,
    isUnauthenticated,
    isLoading,
    error,
    token,
  };
};

// Hook pour la redirection Google OAuth
export const useGoogleAuth = () => {
  return useMutation<void, AuthError, void>({
    mutationFn: async () => {
      authApi.googleAuth();
    },
    onError: (error) => {
      console.error('Erreur lors de l\'authentification Google:', error);
    },
  });
};

// Utilitaire pour invalider les données d'authentification
export const invalidateAuthData = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: authKeys.all });
};

// Utilitaire pour précharger les données utilisateur
export const prefetchUserProfile = async (queryClient: QueryClient, token?: string) => {
  const authToken = token || tokenUtils.getToken();

  if (!authToken) return;

  await queryClient.prefetchQuery({
    queryKey: authKeys.profile(),
    queryFn: () => authApi.getProfile(authToken),
    staleTime: 5 * 60 * 1000,
  });
};
