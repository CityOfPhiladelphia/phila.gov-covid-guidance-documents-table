<template>
  <div>
    <div v-if="documentTable.length">
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
        customSorting: {
          Título(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Active_Title >= b.Active_Title ? 1 : -1;
              }
              return a.Active_Title <= b.Active_Title ? 1 : -1;
            };
          },
          Categoría(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Category >= b.Category ? 1 : -1;
              }
              return a.Category <= b.Category ? 1 : -1;
            };
          },
          Formato(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Format >= b.Format ? 1 : -1;
              }
              return a.Format <= b.Format ? 1 : -1;
            };
          },
          Titre(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Active_Title >= b.Active_Title ? 1 : -1;
              }
              return a.Active_Title <= b.Active_Title ? 1 : -1;
            };
          },
          Catégorie(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Category >= b.Category ? 1 : -1;
              }
              return a.Category <= b.Category ? 1 : -1;
            };
          },
          Tit(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Active_Title >= b.Active_Title ? 1 : -1;
              }
              return a.Active_Title <= b.Active_Title ? 1 : -1;
            };
          },
          Kategori(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Category >= b.Category ? 1 : -1;
              }
              return a.Category <= b.Category ? 1 : -1;
            };
          },
          Fòma(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Format >= b.Format ? 1 : -1;
              }
              return a.Format <= b.Format ? 1 : -1;
            };
          },
          Judul(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Active_Title >= b.Active_Title ? 1 : -1;
              }
              return a.Active_Title <= b.Active_Title ? 1 : -1;
            };
          },
          តួនាទី(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Active_Title >= b.Active_Title ? 1 : -1;
              }
              return a.Active_Title <= b.Active_Title ? 1 : -1;
            };
          },
          ប្រភេទ(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Category >= b.Category ? 1 : -1;
              }
              return a.Category <= b.Category ? 1 : -1;
            };
          },
          ទ្រង់ទ្រាយ(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Format >= b.Format ? 1 : -1;
              }
              return a.Format <= b.Format ? 1 : -1;
            };
          },
          제목(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Active_Title >= b.Active_Title ? 1 : -1;
              }
              return a.Active_Title <= b.Active_Title ? 1 : -1;
            };
          },
          범주(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Category >= b.Category ? 1 : -1;
              }
              return a.Category <= b.Category ? 1 : -1;
            };
          },
          형식(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Format >= b.Format ? 1 : -1;
              }
              return a.Format <= b.Format ? 1 : -1;
            };
          },
          Название(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Active_Title >= b.Active_Title ? 1 : -1;
              }
              return a.Active_Title <= b.Active_Title ? 1 : -1;
            };
          },
          Категория(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Category >= b.Category ? 1 : -1;
              }
              return a.Category <= b.Category ? 1 : -1;
            };
          },
          Формат(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Format >= b.Format ? 1 : -1;
              }
              return a.Format <= b.Format ? 1 : -1;
            };
          },
          Tiêu_đề(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Active_Title >= b.Active_Title ? 1 : -1;
              }
              return a.Active_Title <= b.Active_Title ? 1 : -1;
            };
          },
          Hạng_mục(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Category >= b.Category ? 1 : -1;
              }
              return a.Category <= b.Category ? 1 : -1;
            };
          },
          Định_dạng(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Format >= b.Format ? 1 : -1;
              }
              return a.Format <= b.Format ? 1 : -1;
            };
          },
          Kichwa(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Active_Title >= b.Active_Title ? 1 : -1;
              }
              return a.Active_Title <= b.Active_Title ? 1 : -1;
            };
          },
          Kategoria(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Category >= b.Category ? 1 : -1;
              }
              return a.Category <= b.Category ? 1 : -1;
            };
          },
          Umbizo(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Format >= b.Format ? 1 : -1;
              }
              return a.Format <= b.Format ? 1 : -1;
            };
          },
          标题(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Active_Title >= b.Active_Title ? 1 : -1;
              }
              return a.Active_Title <= b.Active_Title ? 1 : -1;
            };
          },
          类别(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Category >= b.Category ? 1 : -1;
              }
              return a.Category <= b.Category ? 1 : -1;
            };
          },
          格式(ascending) {
            return function (a, b) {
              if (ascending) {
                return a.Format >= b.Format ? 1 : -1;
              }
              return a.Format <= b.Format ? 1 : -1;
            };
          },
        },
        filterAlgorithm: {
          Título(row, query) {
            return this.theFilter(row.Active_Title, query);
          },
          Categoría(row, query) {
            return this.theFilter(row.Category, query);
          },
          Formato(row, query) {
            return this.theFilter(row.Format, query);
          },
          Titre(row, query) {
            return this.theFilter(row.Active_Title, query);
          },
          Catégorie(row, query) {
            return this.theFilter(row.Category, query);
          },
          Tit(row, query) {
            return this.theFilter(row.Active_Title, query);
          },
          Kategori(row, query) {
            return this.theFilter(row.Category, query);
          },
          Fòma(row, query) {
            return this.theFilter(row.Format, query);
          },
          Judul(row, query) {
            return this.theFilter(row.Active_Title, query);
          },
          តួនាទី(row, query) {
            return this.theFilter(row.Active_Title, query);
          },
          ប្រភេទ(row, query) {
            return this.theFilter(row.Category, query);
          },
          ទ្រង់ទ្រាយ(row, query) {
            return this.theFilter(row.Format, query);
          },
          제목(row, query) {
            return this.theFilter(row.Active_Title, query);
          },
          범주(row, query) {
            return this.theFilter(row.Category, query);
          },
          형식(row, query) {
            return this.theFilter(row.Format, query);
          },
          Название(row, query) {
            return this.theFilter(row.Active_Title, query);
          },
          Категория(row, query) {
            return this.theFilter(row.Category, query);
          },
          Формат(row, query) {
            return this.theFilter(row.Format, query);
          },
          Tiêu_đề(row, query) {
            return this.theFilter(row.Active_Title, query);
          },
          Hạng_mục(row, query) {
            return this.theFilter(row.Category, query);
          },
          Định_dạng(row, query) {
            return this.theFilter(row.Format, query);
          },
          Kichwa(row, query) {
            return this.theFilter(row.Active_Title, query);
          },
          Kategoria(row, query) {
            return this.theFilter(row.Category, query);
          },
          Umbizo(row, query) {
            return this.theFilter(row.Format, query);
          },
          标题(row, query) {
            return this.theFilter(row.Active_Title, query);
          },
          类别(row, query) {
            return this.theFilter(row.Category, query);
          },
          格式(row, query) {
            return this.theFilter(row.Format, query);
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
    theFilter( item , query ) {
      return item.toLowerCase().includes(query.toLowerCase());
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