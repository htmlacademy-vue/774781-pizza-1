import Vue from "vue";
import Vuex from "vuex";
import { builder, auth, cart, orders } from "./modules";
import { ADD_ENTITY, SET_ENTITY } from "@/store/mutations-types";

Vue.use(Vuex);

const state = () => ({
  pizzas: [],
});

const mutations = {
  [ADD_ENTITY](state, { module, entity, value }) {
    module ? state[module][entity].push(value) : state[entity].push(value);
  },

  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },
};

const actions = {
  async init({ dispatch }) {
    dispatch("builder/fetchPizza");
    dispatch("cart/fetchMisc");
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    builder,
    auth,
    cart,
    orders,
  },
});
