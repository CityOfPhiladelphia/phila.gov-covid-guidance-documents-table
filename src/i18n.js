import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  silentTranslationWarn: process.env.NODE_ENV === 'production' ? true : false,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    "en-US": '',
  },
});

const loadedLanguages = [ 'en-US' ]; // our default language that is preloaded

function setI18nLanguage (lang) {
  i18n.locale = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

export function loadLanguageAsync (lang) {

  if (lang === 'en') {
    lang = 'en-US';
  }

  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }
  // console.log('wow');
  // If the language hasn't been loaded yet
  i18n.setLocaleMessage(lang, languages[lang]);
  loadedLanguages.push(lang);
  return setI18nLanguage(lang);
}

const languages = {
  'en-US': {
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