import { shallowMount } from '@vue/test-utils'
import AppInput from '../AppInput.vue';

describe('AppInput', () => {
  const propsData = {
    value: 'testValue',
    name: 'testName',
    type: 'text',
    placeholder: 'Test',
    errors: ['Error'],
    required: true,
    largeTitle: true,
    visuallyHidden: false,
  };

  const disabledPropsData = {
    value: 'testValue',
    name: 'testName',
    type: 'text',
    placeholder: 'Test',
    errors: ['Error'],
    visuallyHidden: true,
    disabled: true,
  };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppInput, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('set value', () => {
    createComponent({ propsData });
    expect(wrapper.find('input').element.value).toBe(propsData.value);
  });

  it('emit input event', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    input.trigger('input');
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it('emitted event payload', () => {
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

  it('input disable is prop disable', () => {
    createComponent({ propsData: disabledPropsData });
    let input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeTruthy();
  });

  it('label has large font size', () => {
    createComponent({ propsData });
    let label = wrapper.find('label');
    expect(label.attributes('class')).toContain('input--big-label');
  });

  it('label is hidden', () => {
    createComponent({ propsData: disabledPropsData });
    let label = wrapper.find('label > span');
    console.log(label.html());
    expect(label.attributes('class')).toContain('visually-hidden');
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
