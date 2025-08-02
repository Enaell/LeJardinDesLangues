import { useTranslation as useI18nTranslation } from 'react-i18next';

/**
 * Hook personnalisé pour la traduction
 * Wrapper autour de useTranslation de react-i18next
 * avec une API simplifiée pour notre application
 */
export const useTranslation = (namespace?: string) => {
  const { t, i18n } = useI18nTranslation(namespace);

  return {
    t,
    changeLanguage: i18n.changeLanguage,
    currentLanguage: i18n.language,
    isReady: i18n.isInitialized,
  };
};

// Type helper pour l'autocomplétion des clés de traduction
export type TranslationKey = string;
