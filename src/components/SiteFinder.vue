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
       <!-- <a
          slot="format"
          slot-scope="{row}"
          class="text-uppercase"
          :href="row.link"
        >{{ row.format }} <i class="fas fa-download fa-fw" /></a> -->
        <div slot="afterFilter">
          <span><i class="fas fa-search fa-2x" /></span>
        </div>
      </v-client-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SiteFinder',
  props: {
    documentTable: {
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
      columns: [ 'Title', 'Category', 'Format'],
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