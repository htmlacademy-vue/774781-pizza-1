import { shallowMount } from '@vue/test-utils'
import RadioButton from '../RadioButton.vue';

describe('RadioButton', () => {
  const propsData = {
    checked: true,
    name: "sauces",
    title: "Томатный",
    value: "tomato",
  };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(RadioButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('It sets the initial model value', () => {
    createComponent({ propsData });
    expect(wrapper.find('input').element.value).toBe(propsData.value);
  });

  it('It emits the change event', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    input.trigger('change');
    expect(wrapper.emitted().change).toBeTruthy();
  });

  it('emits the current change value when change', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    input.trigger('change');
    expect(wrapper.emitted().change[0][0]).toEqual(propsData.value);
  });

  it('input name is prop name', () => {
    createComponent({ propsData });
    let input = wrapper.find('input');
    expect(input.attributes('name')).toBe(propsData.name);
  });

  it('label text is prop title', () => {
    createComponent({ propsData });
    let title = wrapper.find('span');
    expect(title.text()).toBe(propsData.title);
  });
});
