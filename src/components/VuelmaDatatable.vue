<template>
  <table class="Vuelma-Datatable table">
    <thead class="Vuelma-Datatable__head">
      <tr class="Vuelma-Datatable__row">
        <vuelma-datatable-header
          v-for="column in columns"
          v-bind="$props"
          :column="column"
          :key="column.name"
          @update:sort="updateSort"
        ></vuelma-datatable-header>
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

      <tr
        class="Vuelma-Datatable__row-empty"
        v-if="rows.length <= 0 && $slots.empty"
      >
        <td
          class="Vuelma-Datatable__cell-empty"
          :colspan="columns.length"
        >
          <slot name="empty">
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import VuelmaDatatableFilter from './VuelmaDatatableFilter';
import VuelmaDatatableHeader from './VuelmaDatatableHeader';

export default {
  name: 'vuelma-datatable',
  components: {
    VuelmaDatatableFilter,
    VuelmaDatatableHeader,
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
      default: `
        <span class="icon">
          <i class="fa fa-sort-asc"></i>
        </span>
      `,
    },
    sortDesc: {
      type: String,
      default: `
        <span class="icon">
          <i class="fa fa-sort-desc"></i>
        </span>
      `,
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
    updateSort(sort) {
      this.$emit('update:sort', sort);
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

      return (value === undefined || value === null) ? fallback : value;
    },
  },
};
</script>
