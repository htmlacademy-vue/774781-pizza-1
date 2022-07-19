import Vue from "vue";
import Vuex from "vuex";
import { builder, auth, cart, orders } from "./modules";
import VuexPlugins from "@/plugins/vuexPlugins";
import {
  EDIT_PIZZA,
  SET_LOADING,
  REPEAT_ORDER,
  ADD_ORDERS_ADDITIONAL_DATA,
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
  [ADD_ORDERS_ADDITIONAL_DATA](state) {
    state.orders.orders = state.orders.orders.map((order) => {
      const pizzas = order.pizzas.map((pizza) => {
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
            quantity: pizza.ingredients[ingredient.id] || 0,
          }))
          .filter(({ quantity }) => quantity > 0)
          .reduce(
            (accumulator, { quantity, price }) =>
              accumulator + price * quantity,
            0
          );

        const price = (doughPrice + saucePrice + ingredientsPrice) * sizePrice;

        return {
          ...pizza,
          price,
        };
      });

      const selectedMisc = order.misc.reduce(
        (obj, item) => ({ ...obj, [item.miscId]: item.quantity }),
        {}
      );

      const misc = state.cart.misc
        .map((miscItem) => ({
          ...miscItem,
          quantity: selectedMisc[miscItem.id] || 0,
        }))
        .filter((miscItem) => miscItem.quantity > 0);

      const miscPrice =
        order.misc.length === 0
          ? 0
          : misc.reduce((prev, cur) => prev + cur.price * cur.quantity, 0);

      const price =
        miscPrice +
        pizzas.reduce(
          (previousPrice, { price, quantity }) =>
            previousPrice + price * quantity,
          0
        );

      return { ...order, misc, pizzas, price };
    });
  },
  [REPEAT_ORDER](state, orderId) {
    const order = state.orders.orders.find((order) => order.id === orderId);
    const pizzas = order.pizzas.map(
      ({ doughId, id, name, quantity, sauceId, sizeId, ingredients }) => ({
        doughId,
        id,
        name,
        quantity,
        sauceId,
        sizeId,
        ingredients,
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
    commit(ADD_ORDERS_ADDITIONAL_DATA);
  },
  async fetchUserData({ dispatch }) {
    await dispatch("auth/tryLoginIfTokenExist");

    if (!state.auth.isAuthenticated) {
      return;
    }

    await dispatch("getOrders");
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
  },
});
