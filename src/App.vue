<template>
  <div id="app">
    <datatable
      :columns="[
        {
          header: 'Name',
          name: 'name',
          filter: 'name',
          sort: true,
        },
        {
          header: '<i>Age</i>',
          name: 'age',
          filter: true,
          sort: true,
        },
        {
          header: 'Email',
          name: 'email',
          filter: {
            options: [
              {
                label: 'all emails',
                value: '',
              },
              '@gmail.com',
              '@hotmail.com',
              '@yahoo.com',
            ],
            key: 'email',
          },
          sort: true,
        },
        {
          header: 'Sex',
          name: 'sex',
          filter: [
            'Male',
            'Female',
            {
              label: 'All Sex',
              value: '',
            },
          ],
          sort: true,
        },
        {
          header: 'Actions',
          name: 'actions',
        },
      ]"
      :rows="rows"
      :sort="sort"
      :filter-params.sync="filterParams"
      @update:sort="updateSort"
    >
      <template slot="empty">
        No results found.
      </template>
      <template scope="props" slot="actions">
        <button
          class="button"
          @click="view(props.row)"
        >
          View
        </button>
      </template>

      <template scope="props" slot="age">
        <span @click="$emit('watever', props.row)"> {{ props.row.age }} years old </span>
      </template>

      <template scope="props" slot="age_filter">
        <input
          class="Vuelma-Datatable__input input"
          type="number"
          v-model="filterParams[(typeof props.column.filter === 'boolean') ? props.column.name : props.column.filter]"
        >
      </template>
    </datatable>
  </div>
</template>

<script>
import Datatable from './components/VuelmaDatatable';

export default {
  name: 'app',
  components: {
    Datatable,
  },
  data() {
    return {
      sort: '',
      filterParams: {
        name: '',
        age: '',
        email: '',
        sex: 'Male',
      },
    };
  },
  computed: {
    rows() {
      let rows = JSON.parse('[{"name":"Coby Gerhold","email":"Alisha.Bailey53@hotmail.com","age":25,"sex":"Female"},{"name":"Rupert Ankunding","email":"Heather52@hotmail.com","age":17,"sex":"Female"},{"name":"Jordy Bednar","email":"Albin.Jacobson@gmail.com","age":27,"sex":"Male"},{"name":"Mr. Teagan Jenkins","email":"Ignacio.Towne@hotmail.com","age":23,"sex":"Female"},{"name":"Aracely Mueller","email":"Precious.Pagac44@yahoo.com","age":29,"sex":"Female"},{"name":"Eveline Steuber","email":"Fritz_Wehner70@yahoo.com","age":20,"sex":"Female"},{"name":"Hershel Donnelly","email":"Oma39@gmail.com","age":29,"sex":"Female"},{"name":"Heather Hoeger","email":"Issac_Feeney@yahoo.com","age":16,"sex":"Female"},{"name":"Warren Altenwerth","email":"Donald.Grant@gmail.com","age":18,"sex":"Female"},{"name":"Meggie Kulas","email":"Flossie4@yahoo.com","age":24,"sex":"Male"},{"name":"Athena Hilpert","email":"Dolores.Cummerata@hotmail.com","age":20,"sex":"Female"},{"name":"Fernando Veum","email":"Humberto_Murphy@hotmail.com","age":18,"sex":"Female"},{"name":"Madilyn Schmeler","email":"Steve73@yahoo.com","age":21,"sex":"Female"},{"name":"Darwin Hickle","email":"Baby_Ebert@yahoo.com","age":18,"sex":"Female"},{"name":"Jonathon Hand","email":"Shania92@yahoo.com","age":23,"sex":"Female"},{"name":"Jack Sawayn","email":"Eriberto.Hamill73@hotmail.com","age":16,"sex":"Male"},{"name":"Cory Hilll","email":"Reina57@yahoo.com","age":24,"sex":"Male"},{"name":"Marta Considine","email":"Jedidiah.Considine53@hotmail.com","age":21,"sex":"Male"},{"name":"Darron Douglas","email":"Vaughn_Romaguera@hotmail.com","age":21,"sex":"Female"},{"name":"Lempi DAmore","email":"Aida51@yahoo.com","age":15,"sex":"Male"},{"name":"Dr. Deondre Nicolas","email":"Coralie_Altenwerth58@hotmail.com","age":22,"sex":"Male"},{"name":"Dr. Noble King","email":"Ayden.Hodkiewicz@yahoo.com","age":24,"sex":"Female"},{"name":"Ashly Weissnat","email":"Nicole_Bode91@hotmail.com","age":23,"sex":"Male"},{"name":"Luigi Gaylord","email":"Tianna48@gmail.com","age":22,"sex":"Female"},{"name":"Mr. Jaclyn Hauck","email":"Jodie.Beier@hotmail.com","age":19,"sex":"Female"},{"name":"Ms. Elvis Ziemann","email":"Jeff.Collins@gmail.com","age":25,"sex":"Male"},{"name":"Merlin Wintheiser","email":"Brenda94@yahoo.com","age":23,"sex":"Female"},{"name":"Kenna Yundt","email":"Clementina.Goldner@hotmail.com","age":29,"sex":"Male"},{"name":"Kelton King","email":"Sarina67@gmail.com","age":27,"sex":"Female"},{"name":"Mr. Kody Rempel","email":"Cristian.Murphy78@gmail.com","age":30,"sex":"Male"},{"name":"Seamus Stanton","email":"Thurman95@yahoo.com","age":22,"sex":"Female"},{"name":"Dr. Anita Koelpin","email":"Raleigh_Mosciski46@yahoo.com","age":18,"sex":"Male"},{"name":"Alverta Rippin","email":"Christelle_Tillman@hotmail.com","age":21,"sex":"Female"},{"name":"Myles Ledner","email":"Willa67@hotmail.com","age":18,"sex":"Male"},{"name":"Mr. Donny Quitzon","email":"Novella.Hauck@hotmail.com","age":23,"sex":"Female"},{"name":"Mrs. Thea Deckow","email":"Antoinette_Volkman@yahoo.com","age":16,"sex":"Female"},{"name":"Felicita Borer","email":"Jacinto.Greenholt@yahoo.com","age":30,"sex":"Male"},{"name":"Willow Bechtelar","email":"Alphonso71@yahoo.com","age":28,"sex":"Female"},{"name":"Dayna Waters","email":"Octavia14@hotmail.com","age":20,"sex":"Female"},{"name":"Dr. Ottilie Kihn","email":"Lily.Walsh@yahoo.com","age":19,"sex":"Male"},{"name":"Ryley Erdman","email":"Furman_Zieme85@gmail.com","age":16,"sex":"Male"},{"name":"Colin Erdman","email":"Jayson.Hirthe99@yahoo.com","age":21,"sex":"Female"}]');

      Object.keys(this.filterParams).forEach((key) => {
        rows = rows.filter(row => String(row[key]).includes(this.filterParams[key]));
      });

      const sort = (this.sort.charAt(0) === '-') ? this.sort.slice(1, this.sort.length) : this.sort;

      rows.sort((rowA, rowB) => {
        const a = String(rowA[sort]).toUpperCase();
        const b = String(rowB[sort]).toUpperCase();

        if (a < b) {
          return -1;
        }

        if (a > b) {
          return 1;
        }

        return 0;
      });

      if (this.sort.charAt(0) === '-') {
        rows.reverse();
      }

      return rows;
    },
  },
  methods: {
    updateSort(sort) {
      this.sort = sort;
    },
    view(row) {
      console.log(row); // eslint-disable-line no-console
    },
  },
};
</script>

<style lang="scss">
@import '~bulma';
$fa-font-path: "~font-awesome/fonts";
@import "~font-awesome/scss/font-awesome";

.Vuelma-Datatable {

  &__header {
    cursor: pointer;
  }

  .Vuelma-Datatable__cell-empty {
    text-align: center;
  }
}
</style>
