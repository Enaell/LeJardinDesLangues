import { QueryClient } from '@tanstack/react-query';

// Configuration du QueryClient avec des options optimisées pour l'application
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Durée pendant laquelle les données sont considérées comme "fraîches"
      staleTime: 5 * 60 * 1000, // 5 minutes

      // Durée de conservation en cache après qu'une query ne soit plus utilisée
      gcTime: 10 * 60 * 1000, // 10 minutes (anciennement cacheTime)

      // Logique de retry personnalisée
      retry: (failureCount, error) => {
        // Ne pas réessayer pour les erreurs d'authentification
        if (error && typeof error === 'object' && 'statusCode' in error) {
          const statusCode = (error as any).statusCode;
          if (statusCode === 401 || statusCode === 403) {
            return false;
          }
        }
        // Réessayer maximum 3 fois pour les autres erreurs
        return failureCount < 3;
      },

      // Délai exponentiel entre les tentatives
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch automatique lors du focus de la fenêtre
      refetchOnWindowFocus: false,

      // Refetch automatique lors de la reconnexion
      refetchOnReconnect: true,
    },
    mutations: {
      // Ne pas réessayer les mutations par défaut (souvent non-idempotentes)
      retry: false,

      // Timeout pour les mutations
      networkMode: 'online',
    },
  },
});

// Types d'erreur pour une meilleure gestion
export type ApiError = {
  message: string;
  statusCode: number;
  timestamp?: string;
};
