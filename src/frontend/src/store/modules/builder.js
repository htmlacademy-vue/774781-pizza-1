import Vue from 'vue';
import uniqueId from "lodash/uniqueId";
import { doughValues, doughSizes } from "@/common/enums/dough.js";
import ingredientModifiers from "@/common/enums/ingredientModifiers.js";
import saucesValues from "@/common/enums/saucesValues.js";
import sizesValues from "@/common/enums/sizesValues.js";
import quantity from "@/common/enums/quantity.js";

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
} from "@/store/mutation-types";

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
      quantity === 0
        ?  Vue.delete(state.currentPizza.ingredients, id)
        : Vue.set(state.currentPizza.ingredients, id, quantity)

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
    setCurrentPizzaDefaultValues({ state, commit }) {
      commit(SET_DOUGH, state.builder.dough[0].id);
      commit(SET_SAUCE, state.builder.sauces[0].id);
      commit(SET_SIZE, state.builder.sizes[0].id);
      commit(SET_INGREDIENTS, state.currentPizza.ingredients);
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

    saucesNameEnum: ({ builder }) =>
      builder.sauces.reduce(
        (obj, item) => ({ ...obj, [item.id]: item.name }),
        {}
      ),

    sauceName: (_, { selectedSauce }) => selectedSauce.value,
    sausePrice: (_, { selectedSauce }) => selectedSauce.price,
    sizesNameEnum: ({ builder }) =>
      builder.sizes.reduce(
        (obj, item) => ({ ...obj, [item.id]: item.name }),
        {}
      ),

    selectedSize: ({ builder, currentPizza }) =>
      builder.sizes.find((size) => size.id === currentPizza.sizeId),

    sizeMultiplier: (_, { selectedSize }) => selectedSize.multiplier,
    hasPizzaName: ({ currentPizza }) => currentPizza.name.length > 0,
    hasIngredients: ({ currentPizza }) =>
      Object.values(currentPizza.ingredients).filter((quantity) => quantity > 0)
        .length > 0,

    ingredientsRuNameEnum: ({ builder }) =>
      builder.ingredients.reduce(
        (obj, item) => ({ ...obj, [item.id]: item.name }),
        {}
      ),

    ingredientsNameEnum: ({ builder }) =>
      builder.ingredients.reduce(
        (obj, item) => ({ ...obj, [item.id]: item.modifier }),
        {}
      ),

    ingredientsPrice: ({ builder, currentPizza }) =>
      builder.ingredients
        .map((ingredient) => ({
          ...ingredient,
          quantity: currentPizza.ingredients[ingredient.id] || 0,
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

    pizzaViewIngredients: ({ currentPizza }, { ingredientsNameEnum }) =>
      Object.entries(currentPizza.ingredients).flatMap((ingredient) => {
        const ingredients = [];

        for (let i = 1; i <= ingredient[1]; i++) {
          ingredients.push({
            id: uniqueId("pizzaViewIngredients_"),
            modifier: ingredientsNameEnum[ingredient[0]],
            quantity: quantity[i]
          })
        }

        return ingredients;
      })
  },
};
