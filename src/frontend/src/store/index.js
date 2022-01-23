import Vue from "vue";
import Vuex from "vuex";
import { builder, auth, cart, orders } from "./modules";

import { ADD_PIZZA } from "@/store/mutations-types";

Vue.use(Vuex);

const state = () => ({
  pizzas: [],
});

const mutations = {
  [ADD_PIZZA](state, pizza) {
    state.pizzas.push(pizza);
  },
};

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    builder,
    auth,
    cart,
    orders,
  },
});
