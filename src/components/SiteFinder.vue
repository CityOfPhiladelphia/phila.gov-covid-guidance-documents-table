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
        <a
          :id="row.id"
          slot="Title"
          slot-scope="{row}"
          :href="row.Link"
          target="_blank"
        ><span class="title">{{ row.Title }}</span></a>
        <div
          slot="beforeFilter"
          class="multiselect-before-filter"
        >
          <multiselect
            v-model="multiselectValue"
            :options="categories"
            placeholder="Showing all categories"
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
  
    filterTable () {
      let vm  = this;
      if (vm.multiselectValue == "All categories") {
        Event.$emit(`vue-tables.${vm.titleId}.filter::dropdownFilter`, null);
      } else {
        Event.$emit(`vue-tables.${vm.titleId}.filter::dropdownFilter`, vm.multiselectValue);
      }
    },
   
  },
  data: function() {
    return {
      multiselectValue: "",
      columns: [ 'Title', 'Category',  'Format'],
      options: {
        addSortedClassToCells: true,
        sortIcon: {
          base : 'fa',
          is: 'fa-sort',
          up: 'fa-sort-up',
          down: 'fa-sort-down',
        },
        orderBy:{
          column: 'Category'
        },
        multiSorting: {
          Category: [
            {
                column: 'Title',
                matchDir: true
            },
          ]
        },
        texts: {
          filterPlaceholder: "Begin typing to filter by title or category",
        },
        perPage: 400,
        perPageValues: [],
        customFilters: [{
        name: 'dropdownFilter',
          callback: function (row, query) {
            return row.Category == query;
          },
      }],
      },
      titleId: this.titleHash.split(' ').join('-').toLowerCase(),
      title: "Guidance documents",
      searchTerm: null,
      
    };
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
