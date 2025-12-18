import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

import en from './en.json';
import lt from './lt.json';
import lv from './lv.json';
import ru from './ru.json';
import ee from './ee.json';
import cr from './cr.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  lng: 'en',
  debug: false,

  react: {
    useSuspense: false, // 🔴 BU SATIR ŞART
  },

  resources: {
    en: { translation: en },
    lt: { translation: lt },
    lv: { translation: lv },
    ru: { translation: ru },
    ee: { translation: ee },
    cr: { translation: cr },
  },
});



// export directly and use i18n.t to translate functionally
export { i18n };
