import { useCallback } from 'react';
import { flashcardsControllerGetMyFlashcards } from '@core/api/flashcards/flashcards';

export const useFlashcardsApi = () => {
  const getMyFlashcards = useCallback(async (): Promise<void> => {
    const response = await flashcardsControllerGetMyFlashcards();
    if (response.status === 200) return response.data;
    throw new Error('Unexpected flashcards response');
  }, []);

  return { getMyFlashcards };
};
