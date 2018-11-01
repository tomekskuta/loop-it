import strings from '../locale';

const locale = {
  state: '',
  reducers: {
    getLocale: () => {
      const storageLocale = localStorage.getItem('locale');
      if (storageLocale) {
        strings.setLanguage(storageLocale);
        return storageLocale;
      }

      const defaultLocale = strings.getLanguage();
      localStorage.setItem('locale', defaultLocale);
      return defaultLocale;
    },

    setLocale: (state, locale) => {
      localStorage.setItem('locale', locale);
      strings.setLanguage(locale);
      return locale;
    }
  },
  effects: dispatch => ({})
};

export default locale;
