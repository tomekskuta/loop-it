import i18n from 'i18next';
import { initReactI18n } from 'react-i18next/hooks';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import locales from './locales';

const defaultNameSpace = 'general';

const handleLanguage = error => {
  if (error) console.log(error);

  const isLang = locale => locale === 'en' || locale === 'pl';

  const lang = i18n.language;
  if (isLang(lang)) return;

  const shortLang = lang.split('-')[0];
  const changeLang = lang => i18n.changeLanguage(lang);
  if (isLang(shortLang)) return changeLang(shortLang);

  return changeLang('en');
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
