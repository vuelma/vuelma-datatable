<template>
  <th
    class="Vuelma-Datatable__header"
    @click="updateSort"
  >
    <span v-html="column.header"></span>

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
