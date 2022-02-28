import jsonPizza from "@/static/pizza.json";
import doughValues from "@/common/enums/doughValues.js";
import ingredientModifiers from "@/common/enums/ingredientModifiers.js";
import saucesValues from "@/common/enums/saucesValues.js";
import sizesValues from "@/common/enums/sizesValues.js";
import {
  ADD_BUILDER_ADDITIONAL_DATA,
  UPDATE_INGREDIENT_PRICE,
  CHANGE_INGREDIENT_QUANTITY,
  ADD_INGREDIENT_QUANTITY,
  SELECT_PIZZA_ENTITY,
  SET_BUILDER,
  SET_PIZZA_ENTITY,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    builder: {
      dough: [],
      sauces: [],
      ingredients: [],
      sizes: [],
    },
    currentPizza: {
      name: "",
      doughId: null,
      sauceId: null,
      sizeId: null,
      ingredients: [],
      quantity: 1,
    },
    ingredientsPrice: 0,
  },

  mutations: {
    [SET_BUILDER](state, { entity, value }) {
      state.builder[entity] = value;
    },

    [SET_PIZZA_ENTITY](state, { entity, value }) {
      state.currentPizza[entity] = value;
    },

    [SELECT_PIZZA_ENTITY](state, { entity, id }) {
      state.currentPizza[entity] = id;
    },

    [ADD_BUILDER_ADDITIONAL_DATA](state) {
      state.builder.dough = state.builder.dough.map((dough) => ({
        ...dough,
        value: doughValues[dough.name],
      }));

      state.builder.ingredients = state.builder.ingredients.map(
        (ingredient) => ({
          ...ingredient,
          modifier: ingredientModifiers[ingredient.name],
          quantity: 0,
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

    [UPDATE_INGREDIENT_PRICE](state) {
      state.ingredientsPrice = state.builder.ingredients
        .filter(({ quantity }) => quantity > 0)
        .reduce(
          (accumulator, { quantity, price }) => accumulator + price * quantity,
          0
        );
    },

    [ADD_INGREDIENT_QUANTITY](state, { id }) {
      const ingredient = state.builder.ingredients.find(
        (ingredient) => ingredient.id === id
      );

      this._vm.$set(ingredient, "quantity", ingredient.quantity + 1);
    },

    [CHANGE_INGREDIENT_QUANTITY](state, { id, quantity }) {
      const ingredient = state.builder.ingredients.find(
        (ingredient) => ingredient.id === id
      );

      this._vm.$set(ingredient, "quantity", quantity);
    },
  },

  actions: {
    fetchDough({ commit }) {
      const { dough } = jsonPizza;
      commit(SET_BUILDER, { entity: "dough", value: dough });
    },

    fetchSauces({ commit }) {
      const { sauces } = jsonPizza;
      commit(SET_BUILDER, { entity: "sauces", value: sauces });
    },

    fetchIngredients({ commit }) {
      const { ingredients } = jsonPizza;
      commit(SET_BUILDER, { entity: "ingredients", value: ingredients });
    },

    fetchSizes({ commit }) {
      const { sizes } = jsonPizza;
      commit(SET_BUILDER, { entity: "sizes", value: sizes });
    },

    fetchBuilder({ dispatch }) {
      dispatch("fetchDough");
      dispatch("fetchSauces");
      dispatch("fetchIngredients");
      dispatch("fetchSizes");
    },

    initBuilder({ dispatch, commit, state }) {
      dispatch("fetchBuilder");
      commit(ADD_BUILDER_ADDITIONAL_DATA);
      commit(SET_PIZZA_ENTITY, {
        entity: "doughId",
        value: state.builder.dough[0].id,
      });

      commit(SET_PIZZA_ENTITY, {
        entity: "sauceId",
        value: state.builder.sauces[0].id,
      });

      commit(SET_PIZZA_ENTITY, {
        entity: "sizeId",
        value: state.builder.sizes[0].id,
      });
    },
  },

  getters: {
    builder: (state) => state.builder,
    currentPizza: (state) => state.currentPizza,

    dough: (_, { builder }) => builder.dough,
    doughId: (_, { currentPizza }) => currentPizza.doughId,
    selectedDough: (_, { dough, doughId }) =>
      dough.find((d) => d.id === doughId),
    doughName: (_, { selectedDough }) => selectedDough.value,
    doughPrice: (_, { selectedDough }) => selectedDough.price,

    sauces: (_, { builder }) => builder.sauces,
    sauceId: (_, { currentPizza }) => currentPizza.sauceId,
    selectedSauce: (_, { sauces, sauceId }) =>
      sauces.find((sauce) => sauce.id === sauceId),
    sauseName: (_, { selectedSauce }) => selectedSauce.value,
    sausePrice: (_, { selectedSauce }) => selectedSauce.price,

    sizes: (_, { builder }) => builder.sizes,
    sizeId: (_, { currentPizza }) => currentPizza.sizeId,
    selectedSize: (_, { sizes, sizeId }) =>
      sizes.find((size) => size.id === sizeId),
    sizeMultiplier: (_, { selectedSize }) => selectedSize.multiplier,

    pizzaName: (_, { currentPizza }) => currentPizza.name,
    hasPizzaName: (_, { pizzaName }) => pizzaName.length > 0,

    ingredients: (_, { builder }) => builder.ingredients,
    hasIngredients: (_, { ingredients }) =>
      ingredients.filter(({ quantity }) => quantity >= 1).length > 0,

    selectedIngredients: (state) =>
      state.builder.ingredients
        .filter((ingredient) => ingredient.quantity > 0)
        .map(({ id, quantity, name }) => ({
          id,
          quantity,
          name,
        })),

    builderPrice: (state, { doughPrice, sausePrice, sizeMultiplier }) =>
      (doughPrice + sausePrice + state.ingredientsPrice) * sizeMultiplier,
  },
};
