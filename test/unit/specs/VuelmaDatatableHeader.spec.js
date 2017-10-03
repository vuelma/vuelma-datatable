/* eslint-disable no-underscore-dangle, no-undef, no-unused-vars */
import Vue from 'vue';
import VuelmaDatatableHeader from '@/components/VuelmaDatatableHeader';

function getComponent(newProps = {}) {
  const Constructor = Vue.extend(VuelmaDatatableHeader);
  const propsData = {
    column: {
      header: 'Name',
      name: 'name',
      filter: 'name',
      sort: true,
    },
    sort: '',
  };
  return new Constructor({
    propsData: { ...propsData, ...newProps },
  }).$mount();
}

describe('VuelmaDatatableHeader.vue', () => {
  describe('updateSort()', () => {
    it('should dispatch update:sort with the asc payload', (done) => {
      const vm = getComponent();
      const spy = sinon.spy();
      vm.$nextTick(() => {
        vm.$on('update:sort', spy);
        vm.updateSort();

        expect(spy).to.have.been.calledWith('name');
        done();
      });
    });

    it('should dispatch update:sort with the desc payload', (done) => {
      const vm = getComponent({ sort: 'name' });
      const spy = sinon.spy();
      vm.$nextTick(() => {
        vm.$on('update:sort', spy);
        vm.updateSort();

        expect(spy).to.have.been.calledWith('-name');
        done();
      });
    });

    it('should not dispatch update:sort', (done) => {
      const vm = getComponent({
        column: {
          name: 'header',
          sort: false,
        },
      });
      const spy = sinon.spy();
      vm.$nextTick(() => {
        vm.$on('update:sort', spy);
        vm.updateSort();

        expect(spy).to.not.have.been.called; // eslint-disable-line
        done();
      });
    });
  });
});
