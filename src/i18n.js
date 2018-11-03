import i18n from 'i18next';
import { initReactI18n } from 'react-i18next/hooks';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import locales from './locales';

const defaultNameSpace = 'general';

const handleLanguage = error => {
  const langs = i18n.languages;
  const lang = i18n.language;
  if (error) console.log(error);
  if (langs[0] === lang) return;

  const shortLang = lang.split('-')[0];
  const hasResource = i18n.hasResourceBundle(shortLang, defaultNameSpace);
  const changeLang = lang => i18n.changeLanguage(lang);
  return (hasResource && changeLang(shortLang)) || changeLang('en');
};

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18n)
  .init(
    {
      resources: locales,
      fallbackLng: 'en',
      defaultNS: defaultNameSpace,
      debug: true,
      interpolation: {
        escapeValue: false
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'lang'
      }
    },
    handleLanguage
  );

export default i18n;
