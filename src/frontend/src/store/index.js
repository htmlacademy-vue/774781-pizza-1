import Vue from "vue";
import Vuex from "vuex";
import { builder, auth, cart, orders } from "./modules";
import VuexPlugins from "@/plugins/vuexPlugins";
import { EDIT_PIZZA, SET_LOADING, REPEAT_ORDER } from "@/store/mutations-types";

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
  [REPEAT_ORDER](state, id) {
    const order = state.orders.orders.find((order) => order.id === id);
    const pizzas = {
      ...order.pizzas,
      basePrice: 0,
      price: 0,
    };

    state.cart.products = pizzas;
    state.cart.misc = order.misc;
  },
};

const actions = {
  async fetchInitialData({ dispatch }) {
    await dispatch("builder/initBuilder");
    await dispatch("cart/fetchMisc");
  },
  async fetchUserData({ dispatch }) {
    await dispatch("auth/tryLoginIfTokenExist");

    if (!state.auth.isAuthenticated) {
      return;
    }

    await dispatch("orders/fetchOrders");
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
