import Vue from 'vue';
import VueI18n from 'vue-i18n';
import * as messages from '/public/lang/en-US.json';
import axios from 'axios';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  silentTranslationWarn: process.env.NODE_ENV === 'production' ? true : false,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    "en-US": messages.default, // set locale messages
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
  axios({
    method: 'get',
    // url: `public/${lang}.json`,
    url: `lang/${lang}.json`,
  }).then(response => {
    i18n.setLocaleMessage(lang, response.data);
    loadedLanguages.push(lang);
    return setI18nLanguage(lang);
  }).catch(() => {
  });

}
