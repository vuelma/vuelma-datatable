/* eslint-disable no-underscore-dangle, no-undef, no-unused-vars */
import Vue from 'vue';
import VuelmaDatatable from '@/components/VuelmaDatatable';

function getView() {
  return new Vue({
    template: '<datatable ref="datatable" :columns="[ { header: \'Name\', name: \'name\', filter: \'name\', }, { header: \'<i>Age</i>\', name: \'age\', filter: true, }, { header: \'Email\', name: \'email\', filter: { options: [ { label: \'all emails\', value: \'\', }, \'@gmail.com\', \'@hotmail.com\', \'@yahoo.com\', ], key: \'email\', }, }, { header: \'Sex\', name: \'sex\', filter: [ \'Male\', \'Female\', { label: \'All Sex\', value: \'\', }, ], }, { header: \'Actions\', name: \'actions\', filter: false, }, ]" :rows="rows" :sort.sync="sort" :filter-params.sync="filterParams"></datatable>',
    components: {
      datatable: VuelmaDatatable,
    },
    data() {
      return {
        rows: [],
        sort: '',
        filterParams: {
          name: '',
          age: '',
          email: '',
          sex: '',
        },
      };
    },
  }).$mount();
}

function getComponent(newProps = {}) {
  const Constructor = Vue.extend(VuelmaDatatable);
  const propsData = {
    columns: [
      {
        header: 'Name',
        name: 'name',
        filter: 'name',
      },
      {
        header: '<i>Age</i>',
        name: 'age',
        filter: true,
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
      },
      {
        header: 'Actions',
        name: 'actions',
        filter: false,
      },
    ],
    rows: [],
    filterParams: {
      name: '',
      age: '',
      email: '',
      sex: '',
    },
    sort: '',
  };
  return new Constructor({
    propsData: { ...propsData, ...newProps },
  }).$mount();
}

describe('VuelmaDatatable.vue', () => {
  describe('updateSort()', () => {
    const vm = getView();
    it('sort should update for ascending', () => {
      vm.$refs.datatable.updateSort('name');
      expect(vm.sort).to.eql('name');
    });

    it('sort should update for descending', (done) => {
      vm.sort = 'name';

      Vue.nextTick(() => {
        vm.$refs.datatable.updateSort('name');
        expect(vm.sort).to.eql('name-');
        done();
      });
    });
  });

  describe('updateFilterParams()', () => {
    const vm = getView();
    it('should update filterParams', (done) => {
      vm.filterParams = {};

      Vue.nextTick(() => {
        vm.$refs.datatable.updateFilterParams({ name: 'email', value: '@test.com' });
        expect(vm.filterParams.email).to.eql('@test.com');
        done();
      });
    });
  });

  describe('extract()', () => {
    const vm = getComponent();

    it('should be able to extract data from a flat object', () => {
      expect(vm.extract({ name: 'correct' }, 'name')).to.eql('correct');
    });

    it('should be able to extract data from a deep object', () => {
      expect(vm.extract({ profile: { name: 'name', role: { name: 'correct' } } }, 'profile.role.name')).to.eql('correct');
    });

    it('should use fallback if no item is found', () => {
      expect(vm.extract({ name: 'wrong' }, 'profile.role.name', 'correct')).to.eql('correct');
    });
  });
});
