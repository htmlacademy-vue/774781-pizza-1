import Vue from "vue";
import Vuex from "vuex";
import { builder, auth, cart, orders } from "./modules";
import { EDIT_PIZZA } from "@/store/mutations-types";

Vue.use(Vuex);

const mutations = {
  [EDIT_PIZZA](state, id) {
    const selectedPizza = state.cart.products.find((pizza) => pizza.id === id);
    const selectedPizzaIdx = state.cart.products.findIndex(
      (pizza) => pizza.id === id
    );

    state.cart.products.splice(selectedPizzaIdx, 1);
    state.builder.currentPizza = selectedPizza;
  },
};

const actions = {
  async init({ dispatch }) {
    dispatch("builder/initBuilder");
    dispatch("cart/fetchMisc");
  },
};

export default new Vuex.Store({
  mutations,
  actions,
  modules: {
    builder,
    auth,
    cart,
    orders,
  },
});
