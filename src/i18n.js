import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  silentTranslationWarn: process.env.NODE_ENV === 'production' ? true : false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    "en": '',
  },
});

function setI18nLanguage (lang) {
  i18n.locale = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

export function loadLanguageAsync (lang) {

  i18n.setLocaleMessage(lang, languages[lang]);
  return setI18nLanguage(lang);
}

const languages = {
  'en': {
    "categoryPlaceholder": "Showing all categories",
    "filterPlaceholder": "Begin typing to filter by title or category",
    "title": "Title",
    "category": "Category",
    "format": "Format",
  },
  'es': {
    "categoryPlaceholder": "Mostrando todas las categorías",
    "filterPlaceholder": "Comience a escribir para filtrar por título o categoría",
    "title": "Título",
    "category": "Categoría",
    "format": "Formato",
  },
};