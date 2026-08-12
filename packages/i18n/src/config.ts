import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import frTranslations from './locales/fr/translation.json';
import enTranslations from './locales/en/translation.json';

// Configuration d'i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: frTranslations,
      },
      en: {
        translation: enTranslations,
      },
    },
    lng: 'fr', // Langue par défaut
    fallbackLng: 'fr', // Langue de repli
    interpolation: {
      escapeValue: false, // Réact a déjà protégé contre les XSS
    },
    detection: {
      order: ['navigator', 'localStorage', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;