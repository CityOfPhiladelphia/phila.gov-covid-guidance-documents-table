import BrowserSupport from './assets/browser-support.js';
BrowserSupport.isIE10();

import Vue from 'vue';
import App from './App.vue';
import { i18n } from './i18n.js';
import VueRouter from 'vue-router';
import underscore from 'vue-underscore';
import './styles/app.scss';

Vue.config.productionTip = false;
Vue.use(underscore);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'main',
    },
  ],
});

new Vue({
  el: '#vue-app',
  router,
  i18n,
  render (h) {
    return h(App, {});
  },
});
