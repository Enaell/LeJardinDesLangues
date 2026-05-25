import { useCallback } from 'react';
import { dictionaryControllerSearchWords } from '@core/api/dictionnaire/dictionnaire';
import type { DictionaryControllerSearchWordsParams } from '@core/api/model';

export const useDictionaryApi = () => {
  const searchWords = useCallback(
    async (params: DictionaryControllerSearchWordsParams): Promise<void> => {
      const response = await dictionaryControllerSearchWords(params);
      if (response.status === 200) return response.data;
      throw new Error('Unexpected search response');
    },
    [],
  );

  return { searchWords };
};
