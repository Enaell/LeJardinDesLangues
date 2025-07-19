import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import des traductions
import fr from '../locales/fr.json';
import en from '../locales/en.json';
import zh from '../locales/zh.json';

const resources = {
  fr: {
    translation: fr
  },
  en: {
    translation: en
  },
  zh: {
    translation: zh
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // langue par défaut
    fallbackLng: 'fr',

    interpolation: {
      escapeValue: false
    },

    react: {
      useSuspense: false
    }
  });

export default i18n;
