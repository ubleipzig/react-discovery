import i18n from "i18next"
import {initReactI18next} from 'react-i18next'
import resources from "./resources"

i18n
  .use(initReactI18next)
  .init({
    defaultNS: 'common',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    lng: 'en',
    react: {
      bindI18n: 'languageChanged',
      transEmptyNodeValue: '',
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      transSupportBasicHtmlNodes: true,
      useSuspense: false,
    },
    resources
  });

export default i18n;
