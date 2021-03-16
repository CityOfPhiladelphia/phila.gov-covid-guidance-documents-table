<template>
  <div id="vue-app">
    <div
      data-swiftype-index="true"
      class="entry-content row"
    >
      <section
        v-if="post.translated_content"
      >
        <div class="grid-x">
          <div class="cell">
            <h2
              class="contrast"
              v-html="theActiveWysiwyg[0].phila_custom_wysiwyg.phila_wysiwyg_title"
            />
          </div>
        </div>
      </section>
      <div class="translations-container">
        <div class="grid-x medium-24 bg-ghost-gray translations">
          <span class="phm globe"><i class="fas fa-globe fa-2x" /></span>
          <ul
            v-if="post"
            id="main-translation-bar"
            class="inline-list no-bullet mbn pln no-dropdown"
          >
            <li
              v-for="(language, index) in post.translated_content"
              :key="index"
              class=" phm phs"
              :class="{ active: activeLanguage==language.translated_language }"
              @click="setActiveLanguage(language.translated_language)"
              v-html="languageMap(language.translated_language)"
            />
          </ul>
        </div>
      </div>
      <section class="mtl">
        <div class="large-24 columns">
          <p v-html="theActiveWysiwyg[0].phila_custom_wysiwyg.phila_wysiwyg_content" />
        </div>
      </section>
      <!-- Site finder -->
      <section class="mtl">
        <div class="large-24 columns">
          <h3
            id="documents"
            class="h2 mls mbm"
            v-html="theActiveWysiwyg[0].phila_custom_wysiwyg.phila_wysiwyg_title"
          />
          <SiteFinder
            ref="siteFinder"
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
            <span v-html="$t('news')" />
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
      postId: 121009,
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
    theActiveWysiwyg() {
      let vm = this;
      return vm.post.translated_content.filter(wys => {
        return wys.translated_language == vm.activeLanguage;
      });
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
    async orderLanguages () {
      let vm = this;
      let sortOrder = [ 'english', 'spanish', 'chinese', 'vietnamese', 'russian', 'french', 'arabic', 'bengali', 'haitian', 'hindo', 'indonesian', 'khmer', 'korean', 'portuguese', 'swahili', 'urdu' ];
      var ordering = {};
      for ( let i=0; i<sortOrder.length; i++) {
        ordering[sortOrder[i]] = i;
      }

      vm.post.translated_content.sort( function(a, b) {
        return (ordering[a.translated_language] - ordering[b.translated_language]);
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
            site['Format'] = site['Type'].trim();
            site['Default_format'] = site['Type'].trim();
            site['Default_category'] = site['Category'];
            delete site['Type'];
            site['Link'] = site['English URL'];
            delete site['English URL'];

            site['Chinese_title'] = site['Chinese title'];
            delete site['Chinese title'];
            site['Chinese_link'] = site['Chinese URL'];
            delete site['Chinese URL'];

            site['French_title'] = site['French title'];
            delete site['French title'];
            site['French_link'] = site['French URL'];
            delete site['French URL'];

            site['Haitian_Creole_title'] = site['Haitian-Creole title'];
            delete site['Haitian-Creole title'];
            site['Haitian_Creole_link'] = site['Haitian-Creole URL'];
            delete site['Haitian-Creole URL'];

            site['Indonesian_title'] = site['Indonesian title'];
            delete site['Indonesian title'];
            site['Indonesian_link'] = site['Indonesian URL'];
            delete site['Indonesian URL'];

            site['Khmer_title'] = site['Khmer title'];
            delete site['Khmer title'];
            site['Khmer_link'] = site['Khmer URL'];
            delete site['Khmer URL'];

            site['Korean_title'] = site['Korean title'];
            delete site['Korean title'];
            site['Korean_link'] = site['Korean URL'];
            delete site['Korean URL'];

            site['Korean_title'] = site['Korean title'];
            delete site['Korean title'];
            site['Korean_link'] = site['Korean URL'];
            delete site['Korean URL'];

            site['Haitian_Creole_title'] = site['Haitian-Creole title'];
            delete site['Haitian-Creole title'];
            site['Haitian_Creole_link'] = site['Haitian-Creole URL'];
            delete site['Haitian-Creole URL'];

            site['Indonesian_title'] = site['Indonesian title'];
            delete site['Indonesian title'];
            site['Indonesian_link'] = site['Indonesian URL'];
            delete site['Indonesian URL'];

            site['Khmer_title'] = site['Khmer title'];
            delete site['Khmer title'];
            site['Khmer_link'] = site['Khmer URL'];
            delete site['Khmer URL'];

            site['Swahili_title'] = site['Swahili title'];
            delete site['Swahili title'];
            site['Swahili_link'] = site['Swahili URL'];
            delete site['Swahili URL'];

            site['Russian_title'] = site['Russian title'];
            delete site['Russian title'];
            site['Russian_link'] = site['Russian URL'];
            delete site['Russian URL'];

            site['Spanish_title'] = site['Spanish title'];
            delete site['Spanish title'];
            site['Spanish_link'] = site['Spanish URL'];
            delete site['Spanish URL'];

            site['Swahili_title'] = site['Swahili title'];
            delete site['Swahili title'];
            site['Swahili_link'] = site['Swahili URL'];
            delete site['Swahili URL'];

            site['Vietnamese_title'] = site['Vietnamese title'];
            delete site['Vietnamese title'];
            site['Vietnamese_link'] = site['Vietnamese URL'];
            delete site['Vietnamese URL'];

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
      let unique = [ ...new Set(vm.documentTables.map(item => vm.$i18n.t(item.Default_category))) ];
      unique.push(vm.$i18n.t('All categories'));
      vm.categories = unique.sort();
    },
    async setLanguageFilter() {
      let vm = this;
      if(vm.activeLanguage == 'chinese') {
        vm.activeLink = 'Chinese_link';
        vm.activeTitle = 'Chinese_title'; 
      } else if(vm.activeLanguage == 'french') {
        vm.activeLink = 'French_link';
        vm.activeTitle = 'French_title';
      } else if(vm.activeLanguage == 'haitian') {
        vm.activeLink = 'Haitian-Creole_link';
        vm.activeTitle = 'Haitian-Creole_title'; 
      } else if(vm.activeLanguage == 'indonesian') {
        vm.activeLink = 'Indonesian_link';
        vm.activeTitle = 'Indonesian_title'; 
      } else if(vm.activeLanguage == 'khmer') {
        vm.activeLink = 'Khmer_link';
        vm.activeTitle = 'Khmer_title';
      } else if(vm.activeLanguage == 'korean') {
        vm.activeLink = 'Korean_link';
        vm.activeTitle = 'Korean_title';
      } else if(vm.activeLanguage == 'russian') {
        vm.activeLink = 'Russian_link';
        vm.activeTitle = 'Russian_title';
      } else if(vm.activeLanguage == 'spanish') {
        vm.activeLink = 'Spanish_link';
        vm.activeTitle = 'Spanish_title';
      } else if(vm.activeLanguage == 'swahili') {
        vm.activeLink = 'Swahili_link';
        vm.activeTitle = 'Swahili_title';
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
        site['Category'] = vm.$i18n.t(site['Default_category']);
        site['Format'] = vm.$i18n.t(site['Default_format']);
      });
      vm.filteredTable = vm.documentTables.filter(site => !!site.Active_Title);
    },
    async parseQuery () {
      let vm = this;
      vm.query = vm.$route.query.language;
      vm.setActiveLanguage( vm.query );
    },
    async init () {
      let vm = this;
      await vm.parseQuery();
      await vm.getPost();
      await vm.orderLanguages();
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
        return 'en';
      } else if ( vm.activeLanguage == 'chinese' ) {
        return 'zh';
      } else if ( vm.activeLanguage == 'french' ) {
        return 'fr';
      } else if ( vm.activeLanguage == 'haitian' ) {
        return 'ht';
      } else if ( vm.activeLanguage == 'indonesian' ) {
        return 'id';
      } else if ( vm.activeLanguage == 'khmer' ) {
        return 'km';
      } else if ( vm.activeLanguage == 'korean' ) {
        return 'ko';
      } else if ( vm.activeLanguage == 'russian' ) {
        return 'ru';
      } else if ( vm.activeLanguage == 'spanish' ) {
        return 'es';
      } else if ( vm.activeLanguage == 'swahili' ) {
        return 'sw';
      } else if ( vm.activeLanguage == 'vietnamese' ) {
        return 'vt';
      }
      return 'en';
    },
    languageMap ( language ) {
      if ( language == 'english' ) {
        return 'English';
      } else if ( language == 'chinese' ) {
        return '中文';
      } else if ( language == 'french' ) {
        return 'Français';
      } else if ( language == 'haitian' ) {
        return 'Ayisyen';
      } else if ( language == 'indonesian' ) {
        return 'Bahasa Indonesia';
      } else if ( language == 'khmer' ) {
        return 'ខ្មែរ';
      } else if ( language == 'korean' ) {
        return '한국어';
      } else if ( language == 'russian' ) {
        return 'Pусский';
      } else if ( language == 'spanish' ) {
        return 'Español';
      } else if ( language == 'swahili' ) {
        return 'Kiswahili';
      } else if ( language == 'vietnamese' ) {
        return 'Tiếng Việt';
      }
      return 'en';
    },
    async setActiveLanguage( language ) {
      let vm = this;
      if (language == undefined) {
        vm.activeLanguage = 'english';
      } else {
        vm.activeLanguage = language;
      }
      let lang = this.languageToLang();
      loadLanguageAsync(lang);
      if (language !== vm.$route.query.language) {
        this.$router.push({ query: { language }});
      }
      await vm.setLanguageFilter();
      await vm.setCategories();
      this.$refs.siteFinder.filterTable( true );
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