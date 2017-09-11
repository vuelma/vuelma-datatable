<template>
  <input
    class="Vuelma-Datatable__input input"
    type="text"
    :name="columnKey"
    :value="filterParams[columnKey]"
    v-if="isInput"
    @input="$emit('update', $event.target)"
  >
  <div
    class="select is-fullwidth"
    v-else-if="isSelect"
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
      if (this.isSelect) {
        return (this.column.filter.key) ? this.column.filter.key : this.column.name;
      }

      return (typeof this.column.filter === 'boolean') ? this.column.name : this.column.filter;
    },

    /**
     * Checks if the filter satisfies the condition
     * to render input tag.
     */
    isInput() {
      if (
        (typeof this.column.filter === 'boolean' && this.column.filter)
        || (typeof this.column.filter === 'string' && this.column.filter)
      ) {
        return true;
      }

      return false;
    },

    /**
     * Checks if the filter satisfies the condition
     * to render select tag.
     */
    isSelect() {
      if (
        Array.isArray(this.column.filter)
        || (typeof this.column.filter === 'object')
      ) {
        return true;
      }

      return false;
    },
  },
};
</script>

