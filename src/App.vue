<template>
  <div id="vue-app">
    <div
      data-swiftype-index="true"
      class="entry-content row"
    >
      <h1 v-html="$t('test')" />
      <div class="grid-container translations-container">
        <div class="grid-x medium-24 bg-ghost-gray mvl translations">
          <span class="phm globe"><i class="fas fa-globe fa-2x" /></span>
          <ul
            v-if="post"
            id="main-translation-bar"
            class="inline-list no-bullet mbn pln no-dropdown"
          >
            <li
              v-for="(language, index) of post.language_list"
              :key="index"
              class=" phm phs"
              :class="{ active: activeLanguage==language.language }"
              @click="setActiveLanguage(language.language)"
              v-html="language.key"
            />
          </ul>
        </div>
      </div>
      <!-- Site finder -->
      <section class="mtl">
        <div class="large-24 columns">
          <SiteFinder
            :document-table="filteredTable"
            :categories="categories"
            :query="query"
            title-hash="Guidance documents"
          />
        </div>
      </section>
      <!-- Site finder -->
      <section class="mtl">
        <div class="large-24 columns archive-link">
          <a
            :href="theArchiveLink"
            target="_blank"
          >
            <i class="fas fa-newspaper fa-2x prm" />
            <span>Visit the News & Events section to view press releases and posts.</span>
          </a>
        </div>
      </section>
    </div> <!-- End .entry-content -->
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import SiteFinder from './components/SiteFinder.vue';
import { ClientTable } from 'vue-tables-2';
import { loadLanguageAsync } from './i18n.js';
// import { _ } from 'vue-underscore';
const app_key = "keyNcseMILLKVVFC3";

Vue.use(ClientTable, {
  options: {}, 
  useVuex: false,
  theme: 'bootstrap3',
  template: 'default',
});

export default {
  name: 'App',
  components: {
    SiteFinder,
  },
  data () {
    return {
      // postId: window.phila_js_vars.postID,
      postId: 31584,
      api: {
        url: process.env.VUE_APP_API_URL,
        endpoint: 'wp-json/programs/v1/archives/',
        airTable: process.env.VUE_APP_AIR_TABLES_API,
      },
      documentTables: [],
      query: null,
      categories: [],
      post: null,
      activeLanguage: 'english',
      filteredTable: [],
      activeLink: 'Link',
      activeTitle: 'Title',
    };
  },
  computed: {
    theArchiveLink() {
      return this.api.url+'the-latest/archives/#/?templates=press_release&templates=post&search=covid&language=' + encodeURIComponent(this.activeLanguage);
    },
  },
  created () {
    let vm = this;
    vm.init();
  },
  methods: {
    async getPost () {
      let vm = this;
      return axios.get( vm.api.url+vm.api.endpoint+vm.postId )
        .then(async (result) => {
          vm.post = result.data;
          return true;
        }).catch(() => {
          return false;
        });
    },
    async getDocumentTables () {
      let vm = this;
      return axios.get(
        vm.api.airTable,
        { headers: { Authorization: "Bearer " + app_key }},
      ).
        then(async (response) => {
        
          let tempData = response.data.records.map(function(entry) {
            return entry["fields"];
          });

          tempData.forEach(function(site) {
            site['Title'] = site['English title'];
            delete site['English title'];
            site['Format'] = site['Type'];
            delete site['Type'];
            site['Link'] = site['English URL'];
            delete site['English URL'];

            site['Spanish_title'] = site['Spanish title'];
            delete site['Spanish title'];
            site['Spanish_link'] = site['Spanish URL'];
            delete site['Spanish URL'];

            site['Chinese_title'] = site['Chinese title'];
            delete site['Chinese title'];
            site['Chinese_link'] = site['Chinese URL'];
            delete site['Chinese URL'];

            site['French_title'] = site['French title'];
            delete site['French title'];
            site['French_link'] = site['French URL'];
            delete site['French URL'];

            site['Vietnamese_title'] = site['Vietnamese title'];
            delete site['Vietnamese title'];
            site['Vietnamese_link'] = site['Vietnamese URL'];
            delete site['Vietnamese URL'];

            site['Russian_title'] = site['Russian title'];
            delete site['Russian title'];
            site['Russian_link'] = site['Russian URL'];
            delete site['Russian URL'];
            site['Active_link'] = site['Link'];
            site['Active_Title'] = site['Title'];
          });
          vm.documentTables = tempData;
          return true;
        }).catch(() => {
          return false;
        });
    },
    async setCategories() {
      let vm = this;
      var unique = [ ...new Set(vm.documentTables.map(item => item.Category)) ];
      unique.push('All categories');
      vm.categories = unique.sort();
    },
    async setLanguageFilter() {
      let vm = this;
      if(vm.activeLanguage == 'spanish') {
        vm.activeLink = 'Spanish_link';
        vm.activeTitle = 'Spanish_title';
      } else if(vm.activeLanguage == 'russian') {
        vm.activeLink = 'Russian_link';
        vm.activeTitle = 'Russian_title';
      } else if(vm.activeLanguage == 'french') {
        vm.activeLink = 'French_link';
        vm.activeTitle = 'French_title';
      } else if(vm.activeLanguage == 'vietnamese') {
        vm.activeLink = 'Vietnamese_link';
        vm.activeTitle = 'Vietnamese_title';
      } else {
        vm.activeLink = 'Link';
        vm.activeTitle = 'Title';
      }
      vm.documentTables.forEach(function( site ) {
        site['Active_Link'] = site[ vm.activeLink ];
        site['Active_Title'] = site[ vm.activeTitle ];
      });
      vm.filteredTable = vm.documentTables.filter(site => !!site.Active_Title);
    },
    async parseQuery () {
      let vm = this;
      vm.query = vm.$route.hash;
    },
    async init () {
      let vm = this;
      await vm.parseQuery();
      await vm.getPost();
      await vm.getDocumentTables();
      await vm.setCategories();
      await vm.setLanguageFilter();
      await vm.scrollToDiv(); 
    },
    async scrollToDiv() {
      let vm = this;
      let div = vm.$route.hash.split('#')[1];
      if ( div ) {
        let distance = document.getElementById(div).offsetTop;
        window.scrollTo({
          top: distance,
          behavior: 'smooth',
        });
      }
    },
    languageToLang () {
      let vm = this;
      if ( vm.activeLanguage == 'english' ) {
        return 'en-US';
      } else if(vm.activeLanguage == 'spanish') {
        return 'es';
      } else if(vm.activeLanguage == 'french') {
        return 'fr';
      } else if(vm.activeLanguage == 'russian') {
        return 'ru';
      } else if(vm.activeLanguage == 'vietnamese') {
        return 'vt';
      } 
      return 'en-US';
    },
    setActiveLanguage( language ) {
      let vm = this;
      vm.activeLanguage = language;
      let lang = this.languageToLang();
      // console.log(lang);
      loadLanguageAsync(lang);
      // set table values here
      // if (lang !== this.$route.query.lang) {
      //   this.$router.push({ query: { lang }});
      // }
      vm.setLanguageFilter();
    },
  },
};
</script>
<style lang="scss" >
#vue-app {
  .multiselect__tags {
    cursor: pointer;
  }
  .phm {
    &.phs {
      padding: 1rem 2rem;
      color: #0f4d90;
      font-weight: 700;
      text-decoration: underline;
      &:hover {
        color: white;
      }
      &.active {
        color: white;
        font-weight: 600;
        text-decoration: none;
      }
    }
  }
  .archive-link {
    span {
      vertical-align: super;
    }
  }
} 
</style>