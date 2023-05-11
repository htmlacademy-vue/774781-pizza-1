import { shallowMount } from '@vue/test-utils'
import AppButton from '../AppButton.vue';

describe('AppButton', () => {
  const listeners = { click: null };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppButton, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('render slot content', () => {
    createComponent({ slots: { default: 'content' } });
    expect(wrapper.html()).toContain('content');
  });

  it('click event fired', () => {
    createComponent({ listeners });
    wrapper.find('button').trigger('click');
    expect(listeners.click).toHaveBeenCalled();
  });

  it('type is submit', () => {
    createComponent();
    expect(wrapper.attributes('type')).toBe('submit');
  });

  it('type is button', () => {
    createComponent({ propsData: { type: 'button' } });
    expect(wrapper.attributes('type')).toBe('button');
  });

  it('transparent style', () => {
    createComponent({ propsData: { transparent: true } });
    expect(wrapper.attributes('class')).toContain('button--transparent');
  });

  it('bordered style', () => {
    createComponent({ propsData: { bordered: true } });
    expect(wrapper.attributes('class')).toContain('button--border');
  });

  it('has icon', () => {
    createComponent({ propsData: { arrow: true } });
    expect(wrapper.attributes('class')).toContain('button--arrow');
  });

  it('is an anchor', () => {
    createComponent({ propsData: { tag: 'a' } });
    expect(wrapper.element.tagName).toBe('A');
  });
});
