import jsonPizza from "@/static/pizza.json";
import doughValues from "@/common/enums/doughValues.js";
import ingredientModifiers from "@/common/enums/ingredientModifiers.js";
import saucesValues from "@/common/enums/saucesValues.js";
import sizesValues from "@/common/enums/sizesValues.js";

import {
  ADD_PIZZA_ADDITIONAL_DATA,
  UPDATE_INGREDIENT_PRICE,
  CHANGE_INGREDIENT_QUANTITY,
  ADD_INGREDIENT_QUANTITY,
  SET_ENTITY,
  SELECT_PIZZA_ENTITY,
} from "@/store/mutations-types";

const module = "builder";

export default {
  namespaced: true,

  state: {
    pizza: {},
    pizzaName: "",
    selectedDough: {
      id: null,
      price: 0,
    },
    selectedSauce: {
      id: null,
      price: 0,
    },
    selectedSize: {
      id: null,
      multiplier: 1,
    },
    ingredientsPrice: 0,
  },

  mutations: {
    [SELECT_PIZZA_ENTITY](state, { entityFrom, entitySelected, id }) {
      const element = state.pizza[entityFrom].find(
        (element) => element.id === id
      );

      state[entitySelected] = element;
    },

    [ADD_PIZZA_ADDITIONAL_DATA](state) {
      state.pizza.dough = state.pizza.dough.map((dough) => ({
        ...dough,
        value: doughValues[dough.name],
      }));

      state.pizza.ingredients = state.pizza.ingredients.map((ingredient) => ({
        ...ingredient,
        modifier: ingredientModifiers[ingredient.name],
        quantity: 0,
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

    [UPDATE_INGREDIENT_PRICE](state) {
      state.ingredientsPrice = state.pizza.ingredients
        .filter(({ quantity }) => quantity > 0)
        .reduce(
          (accumulator, { quantity, price }) => accumulator + price * quantity,
          0
        );
    },

    [ADD_INGREDIENT_QUANTITY](state, { id }) {
      const ingredient = state.pizza.ingredients.find(
        (ingredient) => ingredient.id === id
      );

      this._vm.$set(ingredient, "quantity", ingredient.quantity + 1);
    },

    [CHANGE_INGREDIENT_QUANTITY](state, { id, quantity }) {
      const ingredient = state.pizza.ingredients.find(
        (ingredient) => ingredient.id === id
      );

      this._vm.$set(ingredient, "quantity", quantity);
    },
  },

  actions: {
    fetchPizza({ commit }) {
      const pizza = jsonPizza;

      commit(
        SET_ENTITY,
        { module, entity: "pizza", value: pizza },
        { root: true }
      );

      commit(ADD_PIZZA_ADDITIONAL_DATA);

      commit(
        SET_ENTITY,
        {
          module,
          entity: "selectedDough",
          value: {
            id: pizza.dough[0].id,
            price: pizza.dough[0].price,
          },
        },
        { root: true }
      );

      commit(
        SET_ENTITY,
        {
          module,
          entity: "selectedSauce",
          value: {
            id: pizza.sauces[0].id,
            price: pizza.sauces[0].price,
          },
        },
        { root: true }
      );

      commit(SELECT_PIZZA_ENTITY, {
        entitySelected: "selectedSize",
        entityFrom: "sizes",
        id: pizza.sizes[1].id,
      });

      commit(
        SET_ENTITY,
        {
          module,
          entity: "sizeMultiplier",
          value: pizza.sizes[1].multiplier,
        },
        { root: true }
      );
    },
  },

  getters: {
    dough: (state) => {
      return state.pizza.dough;
    },

    doughName: (state) => {
      return state.pizza.dough.find(
        (dough) => dough.id === state.selectedDough.id
      ).value;
    },

    ingredients: (state) => {
      return state.pizza.ingredients;
    },

    sauces: (state) => {
      return state.pizza.sauces;
    },

    sauseName: (state) => {
      return state.pizza.sauces.find(
        (sauce) => sauce.id === state.selectedSauce.id
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
        state.pizza.ingredients.filter(({ quantity }) => quantity >= 1).length >
        0
      );
    },

    selectedIngredients: (state) => {
      return state.pizza.ingredients
        .filter((ingredient) => ingredient.quantity > 0)
        .map(({ id, quantity, name }) => ({
          id,
          quantity,
          name,
        }));
    },

    builderPrice: (state) => {
      return (
        (state.selectedDough.price +
          state.selectedSauce.price +
          state.ingredientsPrice) *
        state.selectedSize.multiplier
      );
    },
  },
};
