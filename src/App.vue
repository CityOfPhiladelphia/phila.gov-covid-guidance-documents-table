<template>
  <div id="vue-app">
    <div
      data-swiftype-index="true"
      class="entry-content row"
    >
      <div class="grid-container translations-container">
        <div class="grid-x medium-24 bg-ghost-gray mvl translations">
          <span class="phm globe"><i class="fas fa-globe fa-2x" /></span>
          <ul
            id="main-translation-bar"
            class="inline-list no-bullet mbn pln no-dropdown"
          >
            <li
              v-for="(language, index) of post.language_list"
              :key="index"
              class=" phm phs"
              :class="{ active: activeLanguage==index }"
              @click="setActiveLanguage(index)"
            >
              <a
                href="#"
                class="dropdown-selector"
                v-html="index"
              />
            </li>
          </ul>
        </div>
      </div>
      <!-- Site finder -->
      <section class="mtl">
        <div class="large-24 columns">
          <SiteFinder
            :document-table="documentTables"
            :categories="categories"
            :query="query"
            title-hash="Guidance documents"
          />
        </div>
      </section>
      <div>
        <a
          :href="theArchiveLink"
          target="_blank"
        >
          <i class="fas fa-newspaper" />
          <span>Visit the News & Events section to view press releases and posts.</span>
        </a>
      </div>
      <!-- Site finder -->
    </div> <!-- End .entry-content -->
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import SiteFinder from './components/SiteFinder.vue';
import { ClientTable } from 'vue-tables-2';
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
      documentTables: [],
      query: null,
      categories: [],
      post: null,
      activeLanguage: 'english',
    };
  },
  computed: {
    theArchiveLink() {
      return 'https://www.phila.gov/the-latest/archives/#/?templates=press_release&templates=post&language=' + encodeURIComponent(this.activeLanguage);
    },
  },
  created () {
    let vm = this;
    vm.init();
  },
  methods: {
    async getPost () {
      let vm = this;
      return axios.get( 'https://localhost:19107/wp-json/programs/v1/archives/31584' )
        .then(async (result) => {
          vm.post = result.data;
          return true;
        }).catch(() => {
          return false;
        });
    },
    async getDocumentTables () {
      let vm = this;
      let slug = window.location.pathname;
      slug = 'https://api.airtable.com/v0/app6HWoBlToNp1uKQ/Table%201?&view=Grid%20view';
      return axios.get(
        slug,
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

    async parseQuery () {
      let vm = this;
      vm.query = vm.$route.hash;
    },
    async init () {
      let vm = this;
      await vm.parseQuery();
      await vm.getDocumentTables();
      await vm.getPost();
      await vm.setCategories();
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
    setActiveLanguage( language ) {
      let vm = this;
      vm.activeLanguage = language;
    },
  },
};
</script>