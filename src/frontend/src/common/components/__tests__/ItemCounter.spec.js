import { shallowMount } from '@vue/test-utils'
import ItemCounter from '../ItemCounter.vue';
import { counterLimit } from '../../const';

describe('ItemCounter', () => {
  const listeners = { click: null };
  const propsData = {
    counter: 1,
    orange: true,
  }

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(ItemCounter, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should be orange theme', () => {
    createComponent({ propsData });
    const increaseButton = wrapper.find('.counter__button--plus');
    expect(increaseButton.attributes('class')).toContain('counter__button--orange');
  });

  it('counter value should be 1', () => {
    createComponent({ propsData });
    const input = wrapper.find('.counter__input').element;
    expect(input.value).toContain('1');
  });

  it('emit update event', async () => {
    createComponent({ propsData });
    wrapper.vm.$emit('update', 1);
    expect(wrapper.emitted().update).toBeTruthy();
    expect(wrapper.emitted().update[0]).toEqual([1]);
  });

  it('counter cannot be updated, at max value', async () => {
    createComponent({ propsData: { counter: counterLimit.MAX } });
    wrapper.vm.increase();
    expect(wrapper.emitted().update).not.toBeTruthy();
  });

  it('counter cannot be updated, at min value', async () => {
    createComponent({ propsData: { counter: counterLimit.MIN } });
    wrapper.vm.decrease();
    expect(wrapper.emitted().update).not.toBeTruthy();
  });

  it('increase button should be disabled', async () => {
    createComponent({ propsData: { counter: counterLimit.MAX } });
    const increaseButton = wrapper.find('.counter__button--plus');
    expect(increaseButton.attributes('disabled')).toBeTruthy();
  });

  it('decrease button should be disabled', async () => {
    createComponent({ propsData: { counter: counterLimit.MIN } });
    const increaseButton = wrapper.find('.counter__button--minus');
    expect(increaseButton.attributes('disabled')).toBeTruthy();
  });
});
