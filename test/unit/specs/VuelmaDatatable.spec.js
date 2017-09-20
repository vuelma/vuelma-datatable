/* eslint-disable no-underscore-dangle, no-undef, no-unused-vars */
import Vue from 'vue';
import VuelmaDatatable from '@/components/VuelmaDatatable';

function getComponent(newProps = {}) {
  const Constructor = Vue.extend(VuelmaDatatable);
  const propsData = {
    columns: [
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
        filter: false,
        sort: false,
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
    it('should dispatch update:sort with the right payload', () => {
      let vm = getComponent();
      let spy = sinon.spy();
      vm.$on('update:sort', spy);
      vm.updateSort(vm.columns[0]);

      expect(spy).to.have.been.calledWith('name');

      vm = getComponent({ sort: 'name' });
      spy = sinon.spy();
      vm.$on('update:sort', spy);
      vm.updateSort(vm.columns[0]);

      expect(spy).to.have.been.calledWith('-name');

      spy = sinon.spy();
      vm.$on('update:sort', spy);
      vm.updateSort({ ...vm.columns[0], sort: false });

      expect(spy).to.have.been.not.calledWith('name');
    });
  });

  describe('updateFilterParams()', () => {
    it('should dispatch update:filterParams with the right payload', () => {
      const vm = getComponent({
        filterParams: {
          name: '',
          email: '',
        },
      });
      const spy = sinon.spy();
      vm.$on('update:filterParams', spy);
      vm.updateFilterParams({ name: 'email', value: '@test.com' });

      expect(spy).to.have.been.calledWith({ name: '', email: '@test.com' });
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
