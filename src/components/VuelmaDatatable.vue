<template>
  <table class="Vuelma-Datatable table">
    <thead class="Vuelma-Datatable__head">
      <tr class="Vuelma-Datatable__row">
        <th
          class="Vuelma-Datatable__header"
          v-for="column in columns"
          @click="updateSort(column.name)"
        >
          <span v-html="column.header"></span>

          <span
            v-if="sort.replace('-', '') === column.name"
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
            <input
              class="Vuelma-Datatable__input input"
              type="text"
              :name="(typeof column.filter === 'boolean') ? column.name : column.filter"
              :value="filterParams[(typeof column.filter === 'boolean') ? column.name : column.filter]"
              v-if="isInput(column.filter)"
              @input="updateFilterParams"
            >
            <div
              class="select is-fullwidth"
              v-else-if="isSelect(column.filter)"
            >
              <select
                :name="(column.filter.key) ? column.filter.key : column.name"
                :value="filterParams[(column.filter.key) ? column.filter.key : column.name]"
                @input="updateFilterParams"
              >
                <option
                  v-if="Array.isArray(column.filter)"
                  v-for="option in column.filter"
                  v-html="(typeof option === 'object') ? option.label : option"
                  :value="(typeof option === 'object') ? option.value : option"
                ></option>
                <option
                  v-for="option in column.filter.options"
                  v-html="(typeof option === 'object') ? option.label : option"
                  :value="(typeof option === 'object') ? option.value : option"
                ></option>
              </select>
            </div>
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
            {{ get(row, column.name) }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'vuelma-datatable',
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
    updateSort(name) {
      if (name === this.sort) {
        this.$emit('update:sort', `${this.sort}-`);
      } else {
        this.$emit('update:sort', name);
      }
    },

    /**
     * Checks if the filter satisfies the condition
     * to render input tag.
     */
    isInput(filter) {
      if (
        (typeof filter === 'boolean' && filter)
        || (typeof filter === 'string' && filter)
      ) {
        return true;
      }

      return false;
    },

    /**
     * Checks if the filter satisfies the condition
     * to render select tag.
     */
    isSelect(filter) {
      if (
        Array.isArray(filter)
        || (typeof filter === 'object')
      ) {
        return true;
      }

      return false;
    },

    /**
     * Emit an update for filterParams that can be handled
     * outside the component.
     */
    updateFilterParams({ target }) {
      this.$emit('update:filterParams', { ...this.filterParams, [target.name]: target.value });
    },

    /**
     * Retrieve deep object property.
     */
    get(row, column, fallback = '') {
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
