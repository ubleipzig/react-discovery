import de from './locales/de/translation.json';
import en from './locales/en/translation.json';
import { initReactI18next } from 'react-i18next';
const i18n = require('i18next');

export const resources = {
  de,
  en,
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    lng: 'en',
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      transSupportBasicHtmlNodes: true,
      useSuspense: true,
    },
    resources,
  });

export default i18n;
