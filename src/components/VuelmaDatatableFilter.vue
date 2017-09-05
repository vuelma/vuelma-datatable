<template>
  <input
    class="Vuelma-Datatable__input input"
    type="text"
    :name="(typeof column.filter === 'boolean') ? column.name : column.filter"
    :value="filterParams[(typeof column.filter === 'boolean') ? column.name : column.filter]"
    v-if="isInput(column.filter)"
    @input="$emit('update', $event.target)"
  >
  <div
    class="select is-fullwidth"
    v-else-if="isSelect(column.filter)"
  >
    <select
      :name="(column.filter.key) ? column.filter.key : column.name"
      :value="filterParams[(column.filter.key) ? column.filter.key : column.name]"
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

