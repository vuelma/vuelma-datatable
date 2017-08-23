<template>
  <table class="Vuelma-Datatable table">
    <thead class="Vuelma-Datatable__head">
      <tr class="Vuelma-Datatable__row">
        <th
          class="Vuelma-Datatable__header"
          v-for="column in columns"
          v-html="column.header"
        ></th>
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
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
  },
  methods: {
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
    hasSlot(slot) {
      return !!this.$scopedSlots[slot];
    },
  },
};
</script>
