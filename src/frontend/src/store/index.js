import Vue from "vue";
import Vuex from "vuex";
import { builder, auth, cart, orders } from "./modules";
import { ADD_PIZZA, SET_ENTITY } from "@/store/mutations-types";

Vue.use(Vuex);

const state = () => ({
  pizzas: [],
});

const mutations = {
  [ADD_PIZZA](state, pizza) {
    state.pizzas.push(pizza);
  },

  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
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
