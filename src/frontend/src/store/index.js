import Vue from "vue";
import Vuex from "vuex";
import { builder, auth, cart, orders } from "./modules";

Vue.use(Vuex);

const state = () => ({
  pizzas: [],
});

export default new Vuex.Store({
  state,
  modules: {
    builder,
    auth,
    cart,
    orders,
  },
});
