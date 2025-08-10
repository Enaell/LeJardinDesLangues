import { QueryCache, MutationCache } from '@tanstack/react-query';

// Cette fonction sera appelée après l'initialisation du NotificationProvider
export const setupGlobalErrorHandling = (notifyApiError: (error: unknown) => void) => {
  // Intercepteur global pour les erreurs de queries
  const queryCache = new QueryCache({
    onError: (error) => {
      // Afficher automatiquement l'erreur via le système de notifications
      notifyApiError(error);
    },
  });

  // Intercepteur global pour les erreurs de mutations
  const mutationCache = new MutationCache({
    onError: (error) => {
      // Afficher automatiquement l'erreur via le système de notifications
      notifyApiError(error);
    },
  });

  return { queryCache, mutationCache };
};
