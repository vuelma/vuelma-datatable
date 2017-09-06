<template>
  <input
    class="Vuelma-Datatable__input input"
    type="text"
    :name="columnKey"
    :value="filterParams[columnKey]"
    v-if="isInput(column.filter)"
    @input="$emit('update', $event.target)"
  >
  <div
    class="select is-fullwidth"
    v-else-if="isSelect(column.filter)"
  >
    <select
      :name="columnKey"
      :value="filterParams[columnKey]"
      @input="$emit('update', $event.target)"
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
</template>

<script>
export default {
  name: 'vuelma-datatable-filter',
  props: {
    column: {
      required: true,
      type: Object,
    },
    filterParams: {
      required: true,
      type: Object,
    },
  },
  computed: {
    /**
     * Returns the key/name of the column
     */
    columnKey() {
      if (this.isInput(this.column.filter)) {
        return (typeof this.column.filter === 'boolean') ? this.column.name : this.column.filter;
      } else if (this.isSelect(this.column.filter)) {
        return (this.column.filter.key) ? this.column.filter.key : this.column.name;
      }

      return '';
    },
  },
  methods: {
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
  },
};
</script>

