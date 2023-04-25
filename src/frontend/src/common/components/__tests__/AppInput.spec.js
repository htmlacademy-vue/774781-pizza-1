import { shallowMount } from '@vue/test-utils'
import AppInput from '../AppInput.vue';

describe('AppInput', () => {
  const propsData = {
    value: 'testValue',
    name: 'testName',
    type: 'text',
    placeholder: 'Test',
    errors: ['Error'],
    required: true
  };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppInput, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('It sets the initial model value', () => {
    createComponent({ propsData });
    expect(wrapper.find('input').element.value).toBe(propsData.value);
  });

  it('It emits an input event when typing', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    input.trigger('input');
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it('emits the current input value when typing', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    input.element.value = 'test';
    input.trigger('input');
    expect(wrapper.emitted().input[0][0]).toEqual('test');
  });

  it('input name is prop name', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    expect(input.attributes('name')).toBe(propsData.name);
  });

  it('input type is prop type', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    expect(input.attributes('type')).toBe(propsData.type);
  });

  it('input placeholder is prop placeholder', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe(propsData.placeholder);
  });

  it('has error message', () => {
    createComponent({ propsData });
    let firstError = wrapper.find('.input__errors span');
    expect(firstError.text()).toBe(propsData.errors[0]);
  });

  it('does not have error message', () => {
    propsData.errors = [];
    createComponent({ propsData });
    expect(wrapper.html()).not.toContain('.input__errors');
  });
});
