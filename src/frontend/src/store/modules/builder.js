import jsonPizza from "@/static/pizza.json";
import doughValues from "@/common/enums/doughValues.js";
import ingredientModifiers from "@/common/enums/ingredientModifiers.js";
import saucesValues from "@/common/enums/saucesValues.js";
import sizesValues from "@/common/enums/sizesValues.js";

import {
  SET_PIZZA,
  ADD_DATA_HELPERS,
  CHANGE_DOUGH,
  UPDATE_DOUGH_PRICE,
  CHANGE_SAUCE,
  UPDATE_SAUCE_PRICE,
  CHANGE_SIZE,
  UPDATE_SIZE_MULTIPLIER,
  UPDATE_PIZZA_NAME,
  UPDATE_INGREDIENT_PRICE,
  CHANGE_INGREDIENT_COUNT,
  SET_INGREDIENTS,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    pizza: {},
    pizzaName: "",
    selectedDough: "",
    selectedSauce: "",
    selectedSize: "",
    selectedIngredients: [],
    doughPrice: 0,
    saucePrice: 0,
    sizeMultiplier: 0,
    ingredientsPrice: 0,
  },

  mutations: {
    [ADD_DATA_HELPERS](state) {
      state.pizza.dough = state.pizza.dough.map((dough) => ({
        ...dough,
        value: doughValues[dough.name],
      }));

      state.pizza.ingredients = state.pizza.ingredients.map((ingredient) => ({
        ...ingredient,
        modifier: ingredientModifiers[ingredient.name],
        count: 0,
      }));

      state.pizza.sauces = state.pizza.sauces.map((sauce) => ({
        ...sauce,
        value: saucesValues[sauce.name],
      }));

      state.pizza.sizes = state.pizza.sizes.map((size) => ({
        ...size,
        value: sizesValues[size.multiplier],
      }));
    },

    [SET_PIZZA](state, pizza) {
      state.pizza = pizza;
    },

    [SET_INGREDIENTS](state) {
      state.selectedIngredients = state.pizza.ingredients.map(
        ({ id, modifier, count, price }) => ({
          id,
          modifier,
          count,
          price,
        })
      );
    },

    [CHANGE_DOUGH](state, dough) {
      state.selectedDough = dough;
    },

    [UPDATE_DOUGH_PRICE](state, price) {
      state.doughPrice = price;
    },

    [CHANGE_SAUCE](state, sauce) {
      state.selectedSauce = sauce;
    },

    [UPDATE_SAUCE_PRICE](state, price) {
      state.saucePrice = price;
    },

    [CHANGE_SIZE](state, size) {
      state.selectedSize = size;
    },

    [UPDATE_SIZE_MULTIPLIER](state, multiplier) {
      state.sizeMultiplier = multiplier;
    },

    [UPDATE_PIZZA_NAME](state, name) {
      state.pizzaName = name;
    },

    [UPDATE_INGREDIENT_PRICE](state) {
      state.ingredientsPrice = state.selectedIngredients
        .filter(({ count }) => count > 0)
        .reduce(
          (accumulator, { count, price }) => accumulator + price * count,
          0
        );
    },

    [CHANGE_INGREDIENT_COUNT](state, { id, count }) {
      const ingredient = state.selectedIngredients.find(
        (ingredient) => ingredient.id === id
      );

      this._vm.$set(ingredient, "count", count);
    },
  },

  actions: {
    fetchPizza({ commit }) {
      const pizza = jsonPizza;

      commit(SET_PIZZA, pizza);
      commit(ADD_DATA_HELPERS);
      commit(CHANGE_DOUGH, pizza.dough[0].value);
      commit(CHANGE_SAUCE, pizza.sauces[0].value);
      commit(CHANGE_SIZE, pizza.sizes[1].value);
      commit(UPDATE_DOUGH_PRICE, pizza.dough[0].price);
      commit(UPDATE_SAUCE_PRICE, pizza.sauces[0].price);
      commit(UPDATE_SIZE_MULTIPLIER, pizza.sizes[1].multiplier);
      commit(SET_INGREDIENTS, pizza.ingredients);
    },
  },

  getters: {
    dough: (state) => {
      return state.pizza.dough;
    },

    ingredients: (state) => {
      return state.pizza.ingredients;
    },

    sauces: (state) => {
      return state.pizza.sauces;
    },

    sizes(state) {
      return state.pizza.sizes;
    },

    hasPizzaName(state) {
      return state.pizzaName.length > 0;
    },

    hasIngredients(state) {
      return (
        state.selectedIngredients.filter(({ count }) => count >= 1).length > 0
      );
    },
  },
};
