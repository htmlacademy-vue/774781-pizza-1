import jsonPizza from "@/static/pizza.json";
import doughValues from "@/common/enums/doughValues.js";
import ingredientModifiers from "@/common/enums/ingredientModifiers.js";
import saucesValues from "@/common/enums/saucesValues.js";
import sizesValues from "@/common/enums/sizesValues.js";

import {
  SET_PIZZA,
  ADD_DATA_HELPERS,
  SELECT_DOUGH,
  UPDATE_DOUGH_PRICE,
  SELECT_SAUCE,
  UPDATE_SAUCE_PRICE,
  SELECT_SIZE,
  UPDATE_SIZE_MULTIPLIER,
  UPDATE_PIZZA_NAME,
  UPDATE_INGREDIENT_PRICE,
  ADD_INGREDIENT,
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

    [SELECT_DOUGH](state, dough) {
      state.selectedDough = dough;
    },

    [UPDATE_DOUGH_PRICE](state, price) {
      state.pizza.dough.price = price;
    },

    [SELECT_SAUCE](state, sauce) {
      state.selectedSauce = sauce;
    },

    [UPDATE_SAUCE_PRICE](state, price) {
      state.saucePrice = price;
    },

    [SELECT_SIZE](state, size) {
      state.selectedSize = size;
    },

    [UPDATE_SIZE_MULTIPLIER](state, multiplier) {
      state.sizeMultiplier = multiplier;
    },

    [UPDATE_PIZZA_NAME](state, name) {
      state.pizzaName = name;
    },

    [UPDATE_INGREDIENT_PRICE](state, ingredients) {
      state.ingredientsPrice = ingredients
        .filter(({ count }) => count > 0)
        .reduce(
          (accumulator, { count, price }) => accumulator + price * count,
          0
        );
    },

    [ADD_INGREDIENT](state, ingredient) {
      const existingIngredientIndex = state.selectedIngredients.findIndex(
        ({ name }) => name === ingredient.name
      );

      if (existingIngredientIndex !== -1) {
        state.selectedIngredients.splice(existingIngredientIndex, 1);
      }

      state.selectedIngredients.push(ingredient);
    },
  },

  actions: {
    fetchPizza({ commit }) {
      const pizza = jsonPizza;

      commit(SET_PIZZA, pizza);
      commit(ADD_DATA_HELPERS);
      commit(SELECT_DOUGH, pizza.dough[0].value);
      commit(SELECT_SAUCE, pizza.sauces[0].value);
      commit(SELECT_SIZE, pizza.sizes[1].value);
      commit(UPDATE_DOUGH_PRICE, pizza.dough[0].price);
      commit(UPDATE_SAUCE_PRICE, pizza.sauces[0].price);
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
  },
};
