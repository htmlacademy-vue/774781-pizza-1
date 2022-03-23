import Vue from "vue";
import Vuex from "vuex";
import { builder, auth, cart, orders } from "./modules";

Vue.use(Vuex);

const actions = {
  async init({ dispatch }) {
    dispatch("builder/initBuilder");
    dispatch("cart/fetchMisc");
  },
};

export default new Vuex.Store({
  actions,
  modules: {
    builder,
    auth,
    cart,
    orders,
  },
});
