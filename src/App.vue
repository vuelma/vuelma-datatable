<template>
  <div id="app">
    <datatable
      :columns="[
        {
          header: 'Name',
          name: 'name',
          filter: {
            type: 'input',
            key: 'name',
            options: [
            ],
          },
        },
        {
          header: '<i>Age</i>',
          name: 'age',
        },
      ]"
      :rows="rows"
      :sort="sort"
      :sort-asc="sortAsc"
      @update:sort="updateSort"
    >
      <template scope="props" slot="age">
        <span @click="$emit('watever', props.row)"> {{ props.row.age }} years old </span>
      </template>
    </datatable>
  </div>
</template>

<script>
import Hello from './components/Hello';
import Datatable from './components/VuelmaDatatable';

export default {
  name: 'app',
  components: {
    Hello,
    Datatable,
  },
  data() {
    return {
      rows: JSON.parse('[{"name":"Walter, Zion MD","age":22},{"name":"DAmore, Emilia MD","age":2},{"name":"Rolfson, Trace Jr.","age":13},{"name":"Treutel, Enid III","age":13},{"name":"Johnson, Drew III","age":32},{"name":"Pfeffer, Marlon Sr.","age":26},{"name":"Kozey, Madeline Jr.","age":36},{"name":"Stroman, Devin Jr.","age":8},{"name":"Emmerich, Aurelio Jr.","age":25},{"name":"Mohr, Gardner Jr.","age":15},{"name":"Ritchie, Elyssa Jr.","age":12},{"name":"Jaskolski, Lew III","age":1},{"name":"Borer, Shakira III","age":38},{"name":"Rodriguez, Colby DVM","age":12},{"name":"Mante, Carter Sr.","age":6},{"name":"Haley, Franco MD","age":35},{"name":"Brown, Andreane PhD","age":16},{"name":"Parisian, Karlie DDS","age":20},{"name":"OKeefe, Ari II","age":15},{"name":"Kutch, Shanie Sr.","age":18},{"name":"Cremin, Berry Jr.","age":22},{"name":"Stracke, Dedric IV","age":5},{"name":"Gorczany, Raquel V","age":13},{"name":"OReilly, Eunice PhD","age":23},{"name":"Reilly, Kareem MD","age":37},{"name":"Kirlin, Lorine V","age":19},{"name":"Doyle, Brenda I","age":31},{"name":"Glover, Yvette PhD","age":40},{"name":"Cummerata, Barrett II","age":24},{"name":"Zulauf, Maxie Jr.","age":25},{"name":"Spencer, Cathy DVM","age":5},{"name":"Roob, Antone Jr.","age":2},{"name":"Bartell, Kennith Sr.","age":32},{"name":"Kilback, Cathrine V","age":40},{"name":"Kuvalis, Keegan PhD","age":37},{"name":"Brown, Royal Sr.","age":40},{"name":"Huels, Quinn IV","age":26},{"name":"Stamm, Imani Jr.","age":15},{"name":"Kling, Dan Sr.","age":1},{"name":"Gottlieb, Linda IV","age":23},{"name":"Witting, Athena DVM","age":11},{"name":"Kreiger, Zander DDS","age":17},{"name":"Conroy, Skylar DVM","age":9},{"name":"Brekke, Abagail IV","age":39},{"name":"Howell, Madison III","age":10},{"name":"Hansen, Margarete Jr.","age":12},{"name":"Langosh, Reta MD","age":5},{"name":"Mertz, Fredy Jr.","age":28},{"name":"Schoen, Jeff DVM","age":22},{"name":"Toy, Braden Jr.","age":22},{"name":"Kuhn, Leilani Sr.","age":26},{"name":"Langosh, Bethel DVM","age":21},{"name":"Toy, Orval V","age":19},{"name":"Wolf, Mckenzie Jr.","age":33},{"name":"McKenzie, Joana III","age":1},{"name":"Osinski, Sheila I","age":24},{"name":"Lindgren, Conor II","age":32},{"name":"Weber, Soledad III","age":2},{"name":"Schowalter, Luciano III","age":31},{"name":"Rempel, Edwin I","age":15},{"name":"Bergstrom, William IV","age":16},{"name":"Leuschke, Brenda II","age":6},{"name":"Dickens, Natasha DDS","age":37},{"name":"Stoltenberg, Santa PhD","age":33},{"name":"Haag, Manuela IV","age":1},{"name":"Wyman, Joesph DDS","age":12},{"name":"Prosacco, Casey I","age":33},{"name":"McKenzie, Montana MD","age":24},{"name":"Wiza, Wilson Sr.","age":9},{"name":"Block, Trent IV","age":14},{"name":"Jacobi, Brandi Jr.","age":3},{"name":"Beahan, Francesca V","age":3},{"name":"Schiller, Nicola Jr.","age":19},{"name":"Reinger, Johanna DDS","age":17},{"name":"Ruecker, Mohammad MD","age":12},{"name":"Donnelly, Darian IV","age":29},{"name":"Mertz, Consuelo DDS","age":7},{"name":"OHara, Maudie II","age":37},{"name":"Schimmel, Willy MD","age":32},{"name":"Hahn, Stephany PhD","age":7},{"name":"Littel, Art DVM","age":38},{"name":"Reynolds, Ulises IV","age":3},{"name":"Wintheiser, Antwon III","age":6},{"name":"Toy, Dana V","age":31},{"name":"Wiza, Lucile I","age":16},{"name":"Buckridge, Madisen PhD","age":37},{"name":"Kreiger, Judson II","age":16},{"name":"Spencer, Domenic MD","age":39},{"name":"DuBuque, Colt V","age":6},{"name":"Reichel, Alphonso Jr.","age":7},{"name":"Gleichner, Michaela PhD","age":21},{"name":"Corwin, Madaline Jr.","age":10},{"name":"Jakubowski, Linnea II","age":38},{"name":"Braun, Helena IV","age":16},{"name":"Cole, Alize MD","age":19},{"name":"Stanton, Lucy I","age":21},{"name":"Padberg, Lexi PhD","age":11},{"name":"Kohler, Halie III","age":28},{"name":"Nolan, Lesley III","age":13},{"name":"Schmitt, Myah IV","age":28},{"name":"Erdman, Casimer IV","age":34},{"name":"Leannon, Velva Jr.","age":19},{"name":"Hintz, Nannie IV","age":4},{"name":"Hessel, Wanda I","age":12},{"name":"Konopelski, Lucas Sr.","age":23},{"name":"Rohan, Ian V","age":3},{"name":"MacGyver, Bartholome MD","age":33},{"name":"Paucek, Nico DDS","age":1},{"name":"Zemlak, Vincenza I","age":38},{"name":"Berge, Mattie III","age":24},{"name":"Moen, Baylee II","age":16},{"name":"Funk, Mireya Jr.","age":24},{"name":"Marvin, Annette II","age":30},{"name":"Little, Luna III","age":7},{"name":"Cremin, Teresa PhD","age":12},{"name":"Roberts, Benjamin IV","age":8},{"name":"Turner, Geoffrey II","age":36},{"name":"Welch, Albina II","age":7},{"name":"Russel, Jaime MD","age":38},{"name":"Rogahn, Carey PhD","age":34},{"name":"Frami, Douglas V","age":25},{"name":"Gottlieb, Bernadette PhD","age":8},{"name":"Towne, Margie MD","age":18},{"name":"Doyle, Jayda DDS","age":29},{"name":"Windler, Janice DVM","age":26},{"name":"Lemke, Della Jr.","age":16},{"name":"Ankunding, Katharina V","age":20},{"name":"Toy, Stella Sr.","age":27},{"name":"Bartell, Micah II","age":27},{"name":"Hilpert, Myron V","age":33},{"name":"Schuppe, Idell DVM","age":33},{"name":"Erdman, Julianne I","age":7},{"name":"Schinner, Tavares I","age":16},{"name":"Schaefer, General DVM","age":33},{"name":"Leuschke, Reggie Sr.","age":22},{"name":"Boyer, Jaden PhD","age":34},{"name":"Davis, Chelsey Sr.","age":15},{"name":"Monahan, Jeanne III","age":22},{"name":"Ledner, Justina PhD","age":8},{"name":"Stanton, Carolyne DDS","age":29},{"name":"Armstrong, Steve DDS","age":10},{"name":"Reynolds, Matteo DDS","age":18},{"name":"Mante, Daisha DDS","age":28},{"name":"Kerluke, Sibyl III","age":40},{"name":"Kuvalis, Santa II","age":33},{"name":"Bernhard, Bennie MD","age":12},{"name":"OHara, Kelton PhD","age":26},{"name":"Nitzsche, Kevon II","age":26},{"name":"Boyle, Garth II","age":16},{"name":"Pacocha, Leta DDS","age":27},{"name":"Witting, Peggie III","age":10},{"name":"Wiegand, Deion MD","age":32},{"name":"Hills, Lionel V","age":16},{"name":"Veum, Gregory MD","age":1},{"name":"Schmeler, Jeff Sr.","age":35},{"name":"Hamill, Rudy Sr.","age":29},{"name":"Hartmann, Francisco II","age":13},{"name":"Will, Francesco III","age":23},{"name":"Dare, Carlotta V","age":36},{"name":"Herman, Jeanne Sr.","age":15},{"name":"Hessel, Arjun IV","age":26},{"name":"Champlin, Claudine V","age":26},{"name":"McGlynn, Elaina DDS","age":23},{"name":"Anderson, Newell Sr.","age":38},{"name":"Barrows, Jed V","age":28},{"name":"Miller, Adrain I","age":21},{"name":"Kozey, Agustina II","age":36},{"name":"Zemlak, Lenora V","age":38},{"name":"Harvey, Gerald II","age":37},{"name":"Johnson, Sim DDS","age":11}]'),
      sort: '',
      sortAsc: `
        <span class="icon">
          <i class="fa fa-home">+</i>
        </span>
      `,
    };
  },
  methods: {
    updateSort(sort) {
      this.sort = sort;
    },
  },
};
</script>

<style lang="scss">
@import '~bulma';
.Vuelma-Datatable {

  &__header {
    cursor: pointer;
  }
}
</style>
