<template>
  <div>
    <div>
      <v-client-table
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
// import { Event } from 'vue-tables-2';

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
    // onRowClick(event) {
    //   window.location.href = event.row.url;
    // },
    // async init () {
    //   let vm = this;
    //   await vm.searchQuery();
    //   await vm.populateCategoryList();
    // },
    // async searchQuery () {
    //   let vm = this;
    //   if(vm.$route.query.table && vm.$route.query.q ) {
    //     let table = vm.$route.query.table;
    //     vm.searchTerm = vm.$route.query.q.split('-').join(' ');
    //     if( table == vm.titleId) {
    //       vm.showMessage();
    //       vm.$refs[vm.titleId].setFilter(vm.searchTerm);
    //     }
    //   }
    // },
    // async populateCategoryList () {
    //   let vm = this;
    //   let description = false;
    //   let tempCategoryList = vm.documentTable.map(doc => {
    //     if(doc.description) {
    //       description = true;
    //     }
    //     return doc.Category || 'All categories';
    //   });
    //   let uniqueCategories = Array.from(new Set(tempCategoryList));
    //   if(uniqueCategories.length > 1) {
    //     tempCategoryList.push('All categories');
    //   } else {
    //     tempCategoryList = [];
    //   }
    //   if (vm.documentTable.labelColumnTitle) {
    //     vm.columns.push(vm.documentTable.labelColumnTitle);
    //   }
    //   vm.columns.push('title');
    //   if (description) {
    //     vm.columns.push('description');
    //   }
    //   if (tempCategoryList.length) {
    //     vm.columns.push('Category');
    //   }
    //   vm.columns.push('Issued or revised date');
    //   vm.categoryList = [ ...new Set(tempCategoryList) ];
    // },
    filterTable () {
      let vm  = this;
      if (vm.multiselectValue == "All categories") {
        Event.$emit(`vue-tables.${vm.titleId}.filter::dropdownFilter`, null);
      } else {
        Event.$emit(`vue-tables.${vm.titleId}.filter::dropdownFilter`, vm.multiselectValue);
      }
    },
    // closeMessage () {
    //   let vm  = this;
    //   vm.viewMessage = false;
    //   vm.$refs[vm.titleId].resetQuery();
    // },
    // showMessage () {
    //   let vm  = this;
    //   vm.viewMessage = true;
    // },
  },
  data: function() {
    return {
      // categoryList: ['Category', 'Title'],
      multiselectValue: "",
      columns: [ 'Title', 'Category',  'Format'],
      // column_titles: ['Access Center', 'Address', 'ZIP Code'],
      options: {
        texts: {
          filterPlaceholder: "Begin typing to filter by title or category",
        },
        perPage: 400,
        perPageValues: [],
      },
      titleId: this.titleHash.split(' ').join('-').toLowerCase(),
      title: "Guidance documents",
    };
  },
};
</script>

