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

  it('renders out the slot content', () => {
    createComponent({ slots: { default: 'content' } });
    expect(wrapper.html()).toContain('content');
  });

  it('raises the click event on click', () => {
    createComponent({ listeners });
    wrapper.find('button').trigger('click');
    expect(listeners.click).toHaveBeenCalled();
  });

  it('button type is submit', () => {
    createComponent();
    expect(wrapper.attributes('type')).toBe('submit');
  });

  it('button type is button', () => {
    createComponent({ propsData: { type: 'button' } });
    expect(wrapper.attributes('type')).toBe('button');
  });

  it('transparent button', () => {
    createComponent({ propsData: { transparent: true } });
    expect(wrapper.attributes('class')).toContain('button--transparent');
  });

  it('button with icon', () => {
    createComponent({ propsData: { arrow: true } });
    expect(wrapper.attributes('class')).toContain('button--arrow');
  });

  it('bordered button', () => {
    createComponent({ propsData: { bordered: true } });
    expect(wrapper.attributes('class')).toContain('button--border');
  });

  it('button with tag link', () => {
    createComponent({ propsData: { tag: 'a' } });
    expect(wrapper.element.tagName).toBe('A');
  });
});
