import { shallowMount } from '@vue/test-utils'
import AppTitle from "../AppTitle.vue";

describe('AppTitle', () => {
  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppTitle, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders slot content', () => {
    createComponent({ slots: { default: 'content' } });
    expect(wrapper.html()).toContain('content');
  });

  it('title level 1', () => {
    createComponent();
    expect(wrapper.element.tagName).toBe('H1');
  });

  it('heading level is prop level', () => {
    createComponent({ propsData: { level: 5 } });
    expect(wrapper.element.tagName).toBe('H5');
  });

  it('small font size', () => {
    createComponent({ propsData: { small: true } });
    expect(wrapper.attributes('class')).toContain('title--small');
  });

  it('large font size', () => {
    createComponent({ propsData: { big: true } });
    expect(wrapper.attributes('class')).toContain('title--big');
  });
});
