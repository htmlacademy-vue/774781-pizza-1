import uniqueId from "lodash/uniqueId";
import { doughValues, doughSizes } from "@/common/enums/dough.js";
import ingredientModifiers from "@/common/enums/ingredientModifiers.js";
import saucesValues from "@/common/enums/saucesValues.js";
import sizesValues from "@/common/enums/sizesValues.js";

import {
  NORMALIZE_BUILDER,
  CHANGE_INGREDIENT_QUANTITY,
  SET_BUILDER_INITIAL_DATA,
  SET_SAUCE,
  SET_DOUGH,
  SET_SIZE,
  SET_INGREDIENTS,
  SET_PIZZA_NAME,
  RESET_CURRENT_PIZZA,
} from "@/store/mutations-types";

const setupCurrentPizzaState = () => ({
  id: uniqueId("currentPizza_"),
  name: "",
  doughId: null,
  sauceId: null,
  sizeId: null,
  unitPrice: 0,
  price: 0,
  ingredients: {},
  quantity: 1,
});

export default {
  namespaced: true,

  state: {
    builder: {
      dough: [],
      sauces: [],
      ingredients: [],
      sizes: [],
    },
    currentPizza: setupCurrentPizzaState(),
  },

  mutations: {
    [SET_BUILDER_INITIAL_DATA](state, { entity, value }) {
      state.builder[entity] = value;
    },
    [SET_INGREDIENTS](state, ingredients) {
      state.currentPizza.ingredients = ingredients;
    },
    [SET_DOUGH](state, id) {
      state.currentPizza.doughId = id;
    },
    [SET_SAUCE](state, id) {
      state.currentPizza.sauceId = id;
    },
    [SET_SIZE](state, id) {
      state.currentPizza.sizeId = id;
    },
    [SET_PIZZA_NAME](state, name) {
      state.currentPizza.name = name;
    },
    [NORMALIZE_BUILDER](state) {
      state.builder.dough = state.builder.dough.map((dough) => ({
        ...dough,
        value: doughValues[dough.name],
        size: doughSizes[dough.name],
      }));

      state.builder.ingredients = state.builder.ingredients.map(
        (ingredient) => ({
          ...ingredient,
          modifier: ingredientModifiers[ingredient.name],
        })
      );

      state.builder.sauces = state.builder.sauces.map((sauce) => ({
        ...sauce,
        value: saucesValues[sauce.name],
      }));

      state.builder.sizes = state.builder.sizes.map((size) => ({
        ...size,
        value: sizesValues[size.multiplier],
      }));
    },
    [CHANGE_INGREDIENT_QUANTITY](state, { id, quantity }) {
      const ingredientsArray = Object.entries(
        state.currentPizza.ingredients
      ).map((entrie) => ({
        id: Number(entrie[0]),
        quantity: entrie[1],
      }));

      const idx = ingredientsArray.findIndex(
        (ingredient) => ingredient.id === id
      );

      if (idx === -1) {
        ingredientsArray.push({ id, quantity });
      } else {
        ingredientsArray.splice(idx, 1, {
          id,
          quantity,
        });
      }

      state.currentPizza.ingredients = Object.fromEntries(
        ingredientsArray.map((item) => [item.id, item.quantity])
      );
    },
    [RESET_CURRENT_PIZZA](state) {
      Object.assign(state.currentPizza, setupCurrentPizzaState());
    },
  },

  actions: {
    async fetchDough({ commit }) {
      const dough = await this.$api.builder.dough();
      commit(SET_BUILDER_INITIAL_DATA, { entity: "dough", value: dough });
    },
    async fetchSauces({ commit }) {
      const sauces = await this.$api.builder.sauces();
      commit(SET_BUILDER_INITIAL_DATA, { entity: "sauces", value: sauces });
    },
    async fetchIngredients({ commit }) {
      const ingredients = await this.$api.builder.ingredients();
      commit(SET_BUILDER_INITIAL_DATA, {
        entity: "ingredients",
        value: ingredients,
      });
    },
    async fetchSizes({ commit }) {
      const sizes = await this.$api.builder.sizes();
      commit(SET_BUILDER_INITIAL_DATA, { entity: "sizes", value: sizes });
    },
    fetchBuilder({ dispatch }) {
      return Promise.all([
        dispatch("fetchDough"),
        dispatch("fetchSauces"),
        dispatch("fetchIngredients"),
        dispatch("fetchSizes"),
      ]);
    },
    setCurrentPizzaDefaultValues({ state, commit, getters }) {
      commit(SET_DOUGH, state.builder.dough[0].id);
      commit(SET_SAUCE, state.builder.sauces[0].id);
      commit(SET_SIZE, state.builder.sizes[0].id);
      commit(SET_INGREDIENTS, getters.selectedIngredients);
    },
    resetCurrentPizza({ commit, dispatch }) {
      commit(RESET_CURRENT_PIZZA);
      dispatch("setCurrentPizzaDefaultValues");
    },
    async initBuilder({ commit, dispatch }) {
      await dispatch("fetchBuilder");

      commit(NORMALIZE_BUILDER);
      dispatch("setCurrentPizzaDefaultValues");
    },
  },

  getters: {
    selectedDough: ({ builder, currentPizza }) =>
      builder.dough.find((d) => d.id === currentPizza.doughId),

    doughSize: (_, { selectedDough }) => selectedDough.size,
    doughPrice: (_, { selectedDough }) => selectedDough.price,
    selectedSauce: ({ builder, currentPizza }) =>
      builder.sauces.find((sauce) => sauce.id === currentPizza.sauceId),

    sausesNameEnum: ({ builder }) =>
      builder.sauces.reduce(
        (obj, item) => ({ ...obj, [item.id]: item.name }),
        {}
      ),

    sauseName: (_, { selectedSauce }) => selectedSauce.value,
    sausePrice: (_, { selectedSauce }) => selectedSauce.price,
    sizesNameEnum: ({ builder }) =>
      builder.sizes.reduce(
        (obj, item) => ({ ...obj, [item.id]: item.name }),
        {}
      ),

    selectedSize: ({ builder, currentPizza }) =>
      builder.sizes.find((size) => size.id === currentPizza.sizeId),

    sizeMultiplier: (_, { selectedSize }) => selectedSize.multiplier,
    pizzaName: ({ currentPizza }) => currentPizza.name,
    hasPizzaName: (_, { pizzaName }) => pizzaName.length > 0,
    ingredients: ({ builder }) => builder.ingredients,
    selectedIngredients: ({ currentPizza }) => currentPizza.ingredients,
    hasIngredients: (_, { selectedIngredients }) =>
      Object.values(selectedIngredients).filter((quantity) => quantity > 0)
        .length > 0,

    ingredientsNameEnum: (_, { ingredients }) =>
      ingredients.reduce((obj, item) => ({ ...obj, [item.id]: item.name }), {}),

    ingredientsPrice: (_, { ingredients, selectedIngredients }) =>
      ingredients
        .map((ingredient) => ({
          ...ingredient,
          quantity: selectedIngredients[ingredient.id] || 0,
        }))
        .filter(({ quantity }) => quantity > 0)
        .reduce(
          (accumulator, { quantity, price }) => accumulator + price * quantity,
          0
        ),

    builderPrice: (
      _,
      { doughPrice, sausePrice, sizeMultiplier, ingredientsPrice }
    ) => (doughPrice + sausePrice + ingredientsPrice) * sizeMultiplier,
  },
};
