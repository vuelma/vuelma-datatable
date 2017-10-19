<template>
  <th
    :class="className"
    @click="updateSort"
  >
    <span v-html="header"></span>

    <span
      v-if="sort.replace('-', '') === sortKey && sort"
      v-html="(sort === sortKey) ? sortAsc : sortDesc"
    ></span>
  </th>
</template>

<script>
export default {
  name: 'vuelma-datatable-header',
  props: {
    column: Object,
    sort: String,
    sortAsc: String,
    sortDesc: String,
  },
  computed: {
    /**
     * Return the key/name of the sort property.
     */
    sortKey() {
      return (typeof this.column.sort === 'boolean') ? this.column.name : this.column.sort;
    },

    /**
     * Return the header column name.
     */
    header() {
      if (this.column.header) {
        return this.column.header;
      }

      return this.column.name.split('_').map(char => (
        char.charAt(0).toUpperCase() + char.substring(1)
      )).join(' ');
    },

    /**
     * Return the header class name.
     */
    className() {
      if (this.column.sort) {
        return 'Vuelma-Datatable__header--sortable';
      }

      return 'Vuelma-Datatable__header';
    },
  },
  methods: {
    /**
     * Emit an event for updating sort value.
     */
    updateSort() {
      if (this.column.sort) {
        if (this.sort === this.sortKey) {
          this.$emit('update:sort', `-${this.sortKey}`);
        } else {
          this.$emit('update:sort', this.sortKey);
        }
      }
    },
  },
};
</script>
