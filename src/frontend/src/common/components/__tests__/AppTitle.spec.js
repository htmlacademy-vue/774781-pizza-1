import { shallowMount } from '@vue/test-utils'
import AppTitle from "../AppTitle.vue";

describe('AppTitle', () => {
  const listeners = { click: null };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppTitle, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders out the slot content', () => {
    createComponent({ slots: { default: 'content' } });
    expect(wrapper.html()).toContain('content');
  });

  it('title level 1', () => {
    createComponent();
    expect(wrapper.element.tagName).toBe('H1');
  });

  it('title level 5 with small size', () => {
    createComponent({ propsData: { level: 5, small: true } });
    expect(wrapper.classes()).toStrictEqual(['title', 'title--small']);
    expect(wrapper.element.tagName).toBe('H5');
  });

  it('title level 2 with big size', () => {
    createComponent({ propsData: { level: 2, big: true } });
    expect(wrapper.classes()).toStrictEqual(['title', 'title--big']);
    expect(wrapper.element.tagName).toBe('H2');
  });
});
