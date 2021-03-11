<template>
  <div>
    <div>
      <v-client-table
        :id="titleId"
        :ref="titleId"
        :name="titleId"
        :data="documentTable"
        :columns="columns"
        :options="options"
      >
        <div
          :id="row.id"
          :slot="$t('title')"
          slot-scope="{row}"
        >
          <div 
            v-if="row.Title"
            class="block"
          >
            <a 
              :href="row.Active_Link"
            >
              <span class="title">{{ row.Active_Title }}</span>
            </a>
          </div>
        </div>
        <div
          :slot="$t('category')"
          slot-scope="{row}"
        >
          <div 
            v-if="row.Category"
            class="block"
          >
            <span class="category">{{ row.Category }}</span>
          </div>
        </div>
        <div
          :slot="$t('format')"
          slot-scope="{row}"
        >
          <div 
            v-if="row.Format"
            class="block"
          >
            <span class="format">{{ row.Format }}</span>
          </div>
        </div>
        <div
          slot="beforeFilter"
          class="multiselect-before-filter"
        >
          <multiselect
            v-model="multiselectValue"
            :options="categories"
            :placeholder="$t('categoryPlaceholder')"
            @input="filterTable"
          />
        </div>
        <div slot="afterFilter">
          <span><i class="fas fa-search fa-2x" /></span>
        </div>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { Event } from 'vue-tables-2';

export default {
  name: 'SiteFinder',
  components: {
    Multiselect,
  },
  props: {
    documentTable: {
      type: Array,
      default: () => {
        return [];
      },
    },
    categories: {
      type: Array,
      default: () => {
        return [];
      },
    },
    query: {
      type: String,
      default: () => {
        return null;
      },
    },
    titleHash: {
      type: String,
      default: () => {
        return null;
      },
    },
  },
  data: function() {
    return {
      multiselectValue: "",
      titleId: this.titleHash.split(' ').join('-').toLowerCase(),
      title: "Guidance documents",
      searchTerm: null,
      
    };
  },
  computed: {
    columns() {
      return [ this.$i18n.t('title'), this.$i18n.t('category'), this.$i18n.t('format') ];
    },
    theArchiveLink() {
      return this.api.url+'the-latest/archives/#/?templates=press_release&templates=post&search=covid&language=' + encodeURIComponent(this.activeLanguage);
    },
    options() {
      return {
        addSortedClassToCells: true,
        sortIcon: {
          base : 'fa',
          is: 'fa-sort',
          up: 'fa-sort-up',
          down: 'fa-sort-down',
        },
        orderBy:{
          column: this.$i18n.t('category'),
        },
        multiSorting: {
          Category: [
            {
              column: this.$i18n.t('title'),
              matchDir: true,
            },
          ],
        },
        texts: {
          filterPlaceholder: this.$i18n.t('filterPlaceholder'),
        },
        perPage: 400,
        perPageValues: [],
        customFilters: [{
          name: 'dropdownFilter',
          callback: function (row, query) {
            return row.Category == query;
          },
        }],
        filterAlgorithm: {
          // Add all titles, categories, and formats to this list
          Título(row, query) {
            return (row.Active_Title).includes(query);
          },
          Categoría(row, query) {
            return (row.Category).includes(query);
          },
          Formato(row, query) {
            return (row.Format).includes(query);
          },
        },
      };
    },
  },
  mounted () {
    
  },
  methods: {
    async searchQuery () {
      let vm = this;
      if(vm.$route.query.table && vm.$route.query.q ) {
        let table = vm.$route.query.table;
        vm.searchTerm = vm.$route.query.q.split('-').join(' ');
        if( table == vm.titleId) {
          vm.showMessage();
          vm.$refs[vm.titleId].setFilter(vm.searchTerm);
        }
      }
    },
    filterTable (reset = false) {
      let vm  = this;
      if (reset == true ) {
        vm.multiselectValue = null;
      }
      if (vm.multiselectValue == this.$i18n.t("All categories")) {
        Event.$emit(`vue-tables.${vm.titleId}.filter::dropdownFilter`, null);
      } else {
        Event.$emit(`vue-tables.${vm.titleId}.filter::dropdownFilter`, vm.multiselectValue);
      }
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.block {
  display: block;
  padding: 1rem 0;
}
#vue-app .VueTables__row  tr {
  cursor: default !important;
}
</style>