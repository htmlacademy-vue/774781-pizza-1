import { nanoid } from "nanoid";
import jsonPizza from "@/static/pizza.json";
import { doughValues, doughSizes } from "@/common/enums/dough.js";
import ingredientModifiers from "@/common/enums/ingredientModifiers.js";
import saucesValues from "@/common/enums/saucesValues.js";
import sizesValues from "@/common/enums/sizesValues.js";
import {
  ADD_BUILDER_ADDITIONAL_DATA,
  CHANGE_INGREDIENT_QUANTITY,
  ADD_INGREDIENT_QUANTITY,
  SELECT_PIZZA_ENTITY,
  SET_BUILDER,
  SET_PIZZA_ENTITY,
  ADD_INGREDIENTS_IN_PIZZA,
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
      id: nanoid(),
      name: "",
      dough: {},
      sauce: {},
      size: {},
      basePrice: 0,
      price: 0,
      ingredients: [],
      quantity: 1,
    },
  },

  mutations: {
    [SET_BUILDER](state, { entity, value }) {
      state.builder[entity] = value;
    },

    [SET_PIZZA_ENTITY](state, { entity, value }) {
      state.currentPizza[entity] = value;
    },

    [SELECT_PIZZA_ENTITY](state, { entityFrom, entityTo = entityFrom, id }) {
      const element = state.builder[entityFrom].find(
        (element) => element.id === id
      );

      state.currentPizza[entityTo] = element;
    },

    [ADD_BUILDER_ADDITIONAL_DATA](state) {
      state.builder.dough = state.builder.dough.map((dough) => ({
        ...dough,
        value: doughValues[dough.name],
        size: doughSizes[dough.name],
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

    [ADD_INGREDIENT_QUANTITY](state, { id }) {
      const ingredient = state.builder.ingredients.find(
        (ingredient) => ingredient.id === id
      );

      this._vm.$set(ingredient, "quantity", ingredient.quantity + 1);
    },

    [ADD_INGREDIENTS_IN_PIZZA](state, { id, quantity }) {
      const idx = state.currentPizza.ingredients.findIndex(
        (ingredient) => ingredient.id === id
      );

      if (idx === -1) {
        state.currentPizza.ingredients.push({ id, quantity });
      } else {
        state.currentPizza.ingredients.splice(idx, 1, { id, quantity });
      }
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
        entity: "dough",
        value: state.builder.dough[0],
      });

      commit(SET_PIZZA_ENTITY, {
        entity: "sauce",
        value: state.builder.sauces[0],
      });

      commit(SET_PIZZA_ENTITY, {
        entity: "size",
        value: state.builder.sizes[0],
      });
    },
  },

  getters: {
    builder: (state) => state.builder,
    currentPizza: (state) => state.currentPizza,

    dough: (_, { builder }) => builder.dough,
    doughId: (_, { currentPizza }) => currentPizza.dough.id,
    selectedDough: (_, { dough, doughId }) =>
      dough.find((d) => d.id === doughId),

    doughName: (_, { selectedDough }) => selectedDough.value,
    doughSize: (_, { selectedDough }) => selectedDough.size,
    doughPrice: (_, { selectedDough }) => selectedDough.price,

    sauces: (_, { builder }) => builder.sauces,
    sauceId: (_, { currentPizza }) => currentPizza.sauce.id,
    selectedSauce: (_, { sauces, sauceId }) =>
      sauces.find((sauce) => sauce.id === sauceId),

    sauseName: (_, { selectedSauce }) => selectedSauce.value,
    sausePrice: (_, { selectedSauce }) => selectedSauce.price,

    sizes: (_, { builder }) => builder.sizes,
    sizeId: (_, { currentPizza }) => currentPizza.size.id,
    selectedSize: (_, { sizes, sizeId }) =>
      sizes.find((size) => size.id === sizeId),

    sizeMultiplier: (_, { selectedSize }) => selectedSize.multiplier,

    pizzaName: (_, { currentPizza }) => currentPizza.name,
    hasPizzaName: (_, { pizzaName }) => pizzaName.length > 0,

    ingredients: (_, { builder }) => builder.ingredients,
    hasIngredients: (_, { ingredients }) =>
      ingredients.filter(({ quantity }) => quantity >= 1).length > 0,

    ingredientsPrice: (_, { ingredients }) =>
      ingredients
        .filter(({ quantity }) => quantity > 0)
        .reduce(
          (accumulator, { quantity, price }) => accumulator + price * quantity,
          0
        ),

    getIngredientNames: (state) => (ingredients) => {
      let result = [];

      state.builder.ingredients.forEach((builderIngredient) => {
        ingredients.forEach((ingredient) => {
          if (ingredient.id === builderIngredient.id) {
            result.push(builderIngredient.name);
          }
        });
      });

      return result.join(", ");
    },

    selectedIngredients: (_, { ingredients }) =>
      ingredients
        .filter((ingredient) => ingredient.quantity > 0)
        .map(({ id, quantity }) => ({
          id,
          quantity,
        })),

    builderPrice: (
      _,
      { doughPrice, sausePrice, sizeMultiplier, ingredientsPrice }
    ) => (doughPrice + sausePrice + ingredientsPrice) * sizeMultiplier,
  },
};
