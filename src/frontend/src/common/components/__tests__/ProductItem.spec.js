import { shallowMount } from '@vue/test-utils'
import ProductItem from '../ProductItem.vue';

describe('ProductItem', () => {
  const product = {
    id: "currentPizza_1",
    name: "Луковая",
    doughId: 1,
    sauceId: 1,
    sizeId: 1,
    unitPrice: 502,
    price: 502,
    ingredients: { "3":1, "7":1, "8":1, "11":1 },
    quantity: 1
  }

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(ProductItem, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders product name', () => {
    createComponent({ propsData: { product } });
    const title = wrapper.find('h2');
    expect(title.text()).toBe('Луковая');
  });

  it('renders product sauce', () => {
    createComponent({ propsData: { product } });
    const sauce = wrapper.find('ul li:nth-child(2)');
    expect(sauce.text()).toBe('Соус: томатный');
  });

  it('renders product dough', () => {
    createComponent({ propsData: { product } });
    const sauce = wrapper.find('ul li:first-child');
    expect(sauce.text()).toBe('23 см, на тонком тесте');
  });

  it('renders product ingredients', () => {
    createComponent({ propsData: { product } });
    const ingredients = wrapper.find('ul li:last-child');
    expect(ingredients.text()).toBe('Начинка: Томаты, Блю чиз, Лук, Ананас');
  });
});
