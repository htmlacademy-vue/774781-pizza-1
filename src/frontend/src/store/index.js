import Vue from "vue";
import Vuex from "vuex";
import { builder, auth, cart, orders } from "./modules";
import VuexPlugins from "@/plugins/vuexPlugins";
import { EDIT_PIZZA, SET_LOADING } from "@/store/mutations-types";

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
};

const actions = {
  async fetchInitialData({ dispatch }) {
    await dispatch("builder/initBuilder");
    await dispatch("cart/fetchMisc");
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
