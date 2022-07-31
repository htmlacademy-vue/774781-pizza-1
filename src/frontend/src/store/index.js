import Vue from "vue";
import Vuex from "vuex";
import { builder, auth, cart, orders, address } from "./modules";
import VuexPlugins from "@/plugins/vuexPlugins";
import {
  EDIT_PIZZA,
  SET_LOADING,
  REPEAT_ORDER,
  NORMALIZE_ORDERS,
} from "@/store/mutations-types";

Vue.use(Vuex);

const state = {
  loading: false,
};

const mutations = {
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [EDIT_PIZZA](state, id) {
    const selectedPizza = state.cart.products.find((pizza) => pizza.id === id);
    const selectedPizzaIdx = state.cart.products.findIndex(
      (pizza) => pizza.id === id
    );

    state.cart.products.splice(selectedPizzaIdx, 1);
    state.builder.currentPizza = { ...selectedPizza, quantity: 1 };
  },
  [NORMALIZE_ORDERS](state) {
    state.orders.orders = state.orders.orders.map(
      ({ id, orderMisc, orderPizzas }) => {
        const pizzas = orderPizzas.map((pizza) => {
          const ingredients = Object.fromEntries(
            pizza.ingredients.map(({ ingredientId, quantity }) => [
              ingredientId,
              quantity,
            ])
          );

          const doughPrice = state.builder.builder.dough.find(
            (dough) => dough.id === pizza.doughId
          ).price;

          const saucePrice = state.builder.builder.sauces.find(
            (sauce) => sauce.id === pizza.sauceId
          ).price;

          const sizePrice = state.builder.builder.sizes.find(
            (size) => size.id === pizza.sizeId
          ).multiplier;

          const ingredientsPrice = state.builder.builder.ingredients
            .map((ingredient) => ({
              ...ingredient,
              quantity: ingredients[ingredient.id] || 0,
            }))
            .filter(({ quantity }) => quantity > 0)
            .reduce(
              (accumulator, { quantity, price }) =>
                accumulator + price * quantity,
              0
            );

          const price =
            (doughPrice + saucePrice + ingredientsPrice) * sizePrice;

          return {
            ...pizza,
            ingredients,
            price,
          };
        });

        const selectedMisc = orderMisc?.reduce(
          (obj, item) => ({ ...obj, [item.miscId]: item.quantity }),
          {}
        );

        const misc = state.cart.misc
          .map((miscItem) => ({
            ...miscItem,
            quantity: selectedMisc?.[miscItem.id] || 0,
          }))
          .filter((miscItem) => miscItem.quantity > 0);

        const miscPrice = misc.reduce(
          (prev, cur) => prev + cur.price * cur.quantity,
          0
        );

        const price =
          miscPrice +
          pizzas.reduce(
            (previousPrice, { price, quantity }) =>
              previousPrice + price * quantity,
            0
          );

        return { id: id.toString(), misc, pizzas, price };
      }
    );
  },
  [REPEAT_ORDER](state, orderId) {
    const order = state.orders.orders.find((order) => order.id === orderId);
    const pizzas = order.pizzas.map(
      ({
        doughId,
        id,
        name,
        quantity,
        sauceId,
        sizeId,
        ingredients,
        price,
      }) => ({
        doughId,
        id,
        name,
        quantity,
        sauceId,
        sizeId,
        ingredients,
        unitPrice: price,
        price,
      })
    );

    const misc = order.misc.reduce(
      (obj, item) => ({ ...obj, [item.id]: item.quantity }),
      {}
    );

    state.cart.products = pizzas;
    state.cart.currentMisc = misc;
  },
};

const actions = {
  async fetchInitialData({ dispatch }) {
    await dispatch("builder/initBuilder");
    await dispatch("cart/fetchMisc");
  },
  async getOrders({ commit, dispatch }) {
    await dispatch("orders/fetchOrders");
    commit(NORMALIZE_ORDERS);
  },
  async fetchUserData({ dispatch }) {
    await dispatch("getOrders");
    await dispatch("address/fetchAddresses");
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [VuexPlugins],
  modules: {
    builder,
    auth,
    cart,
    orders,
    address,
  },
});
