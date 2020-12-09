<template>
  <div id="vue-app">
    <div
      data-swiftype-index="true"
      class="entry-content"
    >
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
    };
  },
  created () {
    let vm = this;
    vm.init();
  },
  methods: {
    getDocumentTables () {
      let vm = this;
      let slug = window.location.pathname;
      slug = 'https://api.airtable.com/v0/app6HWoBlToNp1uKQ/Table%201?&view=Grid%20view';
      return axios.get(
        slug,
        { headers: { Authorization: "Bearer " + app_key } },
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
        });

         
        vm.documentTables = tempData;
        return true;
      }).catch(() => {
        return false;
      });
    },

    async setCategories() {
      let vm = this;
      var unique = [...new Set(vm.documentTables.map(item => item.Category))];
      vm.categories = unique;
    },

    async parseQuery () {
      let vm = this;
      vm.query = vm.$route.hash;
    },
    async init () {
      let vm = this;
      await vm.parseQuery();
      await vm.getDocumentTables();
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
  },
};
</script>
<style src="../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>
