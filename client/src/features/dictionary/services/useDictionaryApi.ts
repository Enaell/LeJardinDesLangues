import { useCallback } from 'react';
import { useApi } from '@core/services/api';

// Types placeholder - à définir plus tard
export type DictionaryEntry = {
  id: string;
  word: string;
  translation: string;
  // ... autres propriétés à définir
};

export type DictionarySearchParams = {
  query: string;
  language?: 'fr' | 'zh';
  limit?: number;
};

// Hook spécialisé pour les API de dictionnaire
export const useDictionaryApi = () => {
  const { requestWithErrorHandling } = useApi();

  // Rechercher des mots dans le dictionnaire
  const searchWords = useCallback(async (params: DictionarySearchParams): Promise<DictionaryEntry[]> => {
    // TODO: Implémenter la recherche réelle
    console.log('[useDictionaryApi] searchWords - Placeholder implementation', params);

    // Future implementation:
    // const searchParams = new URLSearchParams({
    //   q: params.query,
    //   lang: params.language || 'fr',
    //   ...(params.limit && { limit: params.limit.toString() }),
    // });
    // return await requestWithErrorHandling(`/dictionary/search?${searchParams.toString()}`);

    // Simulation temporaire
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            word: params.query,
            translation: `Traduction de "${params.query}"`,
          }
        ]);
      }, 500);
    });
  }, [requestWithErrorHandling]);

  // Obtenir une entrée spécifique du dictionnaire
  const getEntry = useCallback(async (id: string): Promise<DictionaryEntry> => {
    // TODO: Implémenter la récupération réelle
    console.log('[useDictionaryApi] getEntry - Placeholder implementation', id);

    // Simulation temporaire
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          word: `Mot ${id}`,
          translation: `Traduction du mot ${id}`,
        });
      }, 300);
    });

    // Code réel (commenté pour l'instant) :
    // return await requestWithErrorHandling(`/dictionary/entries/${id}`);
  }, [requestWithErrorHandling]);

  // Obtenir des suggestions de mots
  const getSuggestions = useCallback(async (prefix: string): Promise<string[]> => {
    // TODO: Implémenter les suggestions réelles
    console.log('[useDictionaryApi] getSuggestions - Placeholder implementation', prefix);

    // Simulation temporaire
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          `${prefix}word1`,
          `${prefix}word2`,
          `${prefix}word3`,
        ]);
      }, 200);
    });

    // Code réel (commenté pour l'instant) :
    // return await requestWithErrorHandling(`/dictionary/suggestions?prefix=${encodeURIComponent(prefix)}`);
  }, [requestWithErrorHandling]);

  return {
    searchWords,
    getEntry,
    getSuggestions,
  };
};
