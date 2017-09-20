<template>
  <table class="Vuelma-Datatable table">
    <thead class="Vuelma-Datatable__head">
      <tr class="Vuelma-Datatable__row">
        <th
          class="Vuelma-Datatable__header"
          v-for="column in columns"
          @click="updateSort(column)"
        >
          <span v-html="column.header"></span>

          <span
            v-if="sort.replace('-', '') === column.name && sort"
            v-html="(sort === column.name) ? sortAsc : sortDesc"
          ></span>
        </th>
      </tr>

      <tr
        class="Vuelma-Datatable__row"
        v-if="hasFilter"
      >
        <th
          class="Vuelma-Datatable__filter"
          v-for="column in columns"
        >
          <slot
            :name="`${column.filter === true ? column.name : column.filter}_filter`"
            :column="column"
          >
            <vuelma-datatable-filter
              :column="column"
              :filter-params="filterParams"
              @update="updateFilterParams"
            ></vuelma-datatable-filter>
          </slot>
        </th>
      </tr>
    </thead>

    <tbody class="Vuelma-Datatable__body">
      <tr
        class="Vuelma-Datatable__row"
        v-for="row in rows"
      >
        <td
          class="Vuelma-Datatable__cell"
          v-for="column in columns"
        >
          <slot
            :row="row"
            :name="column.name"
          >
            {{ extract(row, column.name) }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import VuelmaDatatableFilter from './VuelmaDatatableFilter';

export default {
  name: 'vuelma-datatable',
  components: {
    VuelmaDatatableFilter,
  },
  props: {
    /**
     * Table props.
     */
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },

    /**
     * Sort functionality props.
     */
    sort: {
      type: String,
      default: '',
    },
    sortAsc: {
      type: String,
      default: '+',
    },
    sortDesc: {
      type: String,
      default: '-',
    },

    /**
     * Filter params props.
     */
    filterParams: Object,
  },
  computed: {
    /**
     * Checks if there's at least one column with filter.
     */
    hasFilter() {
      return this.columns.some(el => el.filter);
    },
  },
  methods: {
    /**
     * Emit an update sort event to be handled
     * outside the component.
     */
    updateSort(column) {
      if (column.sort) {
        if (column.name === this.sort) {
          this.$emit('update:sort', `-${this.sort}`);
        } else {
          this.$emit('update:sort', column.name);
        }
      }
    },

    /**
     * Emit an update for filterParams that can be handled
     * outside the component.
     */
    updateFilterParams(target) {
      this.$emit('update:filterParams', { ...this.filterParams, [target.name]: target.value });
    },

    /**
     * Retrieve deep object property.
     */
    extract(row, column, fallback = '') {
      const keys = column.split('.');
      let value = null;
      keys.forEach((key) => {
        if (value !== undefined) {
          value = value !== null ? value[key] : row[key];
        }
      });

      return value || fallback;
    },
  },
};
</script>
