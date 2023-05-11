import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import { generateMockStore } from '../../store/mocks';
import AppLayoutHeader from "../AppLayoutHeader.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AppLayoutHeader', () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(AppLayoutHeader, options);
  }

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('mounted', () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });
})
