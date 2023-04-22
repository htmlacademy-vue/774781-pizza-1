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

  it('transparent button with type button', () => {
    createComponent({ propsData: { transparent: true, type: 'button' } });
    expect(wrapper.attributes('type')).toBe('button');
    expect(wrapper.classes()).toStrictEqual(['button', 'button--transparent']);
  });

  it('link looks like bordered button with arrow', () => {
    createComponent({ propsData: { tag: 'a', bordered: true, arrow: true } });
    expect(wrapper.classes()).toStrictEqual(['button', 'button--border', 'button--arrow']);
    expect(wrapper.element.tagName).toBe('A');
  })
});
