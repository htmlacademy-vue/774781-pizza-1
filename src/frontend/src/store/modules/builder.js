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
  ADD_INGREDIENT_COUNT,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    pizza: {},
    pizzaName: "",
    selectedDough: null,
    selectedSauce: null,
    selectedSize: null,
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

    [CHANGE_DOUGH](state, id) {
      state.selectedDough = state.pizza.dough.find(
        (dough) => dough.id === id
      ).id;
    },

    [UPDATE_DOUGH_PRICE](state, price) {
      state.doughPrice = price;
    },

    [CHANGE_SAUCE](state, id) {
      state.selectedSauce = state.pizza.sauces.find(
        (sauce) => sauce.id === id
      ).id;
    },

    [UPDATE_SAUCE_PRICE](state, price) {
      state.saucePrice = price;
    },

    [CHANGE_SIZE](state, id) {
      state.selectedSize = state.pizza.sizes.find((size) => size.id === id).id;
    },

    [UPDATE_SIZE_MULTIPLIER](state, multiplier) {
      state.sizeMultiplier = multiplier;
    },

    [UPDATE_PIZZA_NAME](state, name) {
      state.pizzaName = name;
    },

    [UPDATE_INGREDIENT_PRICE](state) {
      state.ingredientsPrice = state.pizza.ingredients
        .filter(({ count }) => count > 0)
        .reduce(
          (accumulator, { count, price }) => accumulator + price * count,
          0
        );
    },

    [ADD_INGREDIENT_COUNT](state, { id }) {
      const ingredient = state.pizza.ingredients.find(
        (ingredient) => ingredient.id === id
      );

      this._vm.$set(ingredient, "count", ingredient.count + 1);
    },

    [CHANGE_INGREDIENT_COUNT](state, { id, count }) {
      const ingredient = state.pizza.ingredients.find(
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
      commit(CHANGE_DOUGH, pizza.dough[0].id);
      commit(CHANGE_SAUCE, pizza.sauces[0].id);
      commit(CHANGE_SIZE, pizza.sizes[1].id);
      commit(UPDATE_DOUGH_PRICE, pizza.dough[0].price);
      commit(UPDATE_SAUCE_PRICE, pizza.sauces[0].price);
      commit(UPDATE_SIZE_MULTIPLIER, pizza.sizes[1].multiplier);
    },
  },

  getters: {
    dough: (state) => {
      return state.pizza.dough;
    },

    doughName: (state) => {
      return state.pizza.dough.find((sauce) => sauce.id === state.selectedDough)
        .value;
    },

    ingredients: (state) => {
      return state.pizza.ingredients;
    },

    sauces: (state) => {
      return state.pizza.sauces;
    },

    sauseName: (state) => {
      return state.pizza.sauces.find(
        (sauce) => sauce.id === state.selectedSauce
      ).value;
    },

    sizes: (state) => {
      return state.pizza.sizes;
    },

    hasPizzaName: (state) => {
      return state.pizzaName.length > 0;
    },

    hasIngredients: (state) => {
      return (
        state.pizza.ingredients.filter(({ count }) => count >= 1).length > 0
      );
    },

    selectedIngredients: (state) => {
      return state.pizza.ingredients
        .filter((ingredient) => ingredient.count > 0)
        .map(({ id, count }) => ({
          id,
          count,
        }));
    },

    currentPrice: (state) => {
      return (
        (state.doughPrice + state.saucePrice + state.ingredientsPrice) *
        state.sizeMultiplier
      );
    },
  },
};
