import Vue from "vue";
import Vuex from "vuex";
import { builder, auth, cart, orders } from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    builder,
    auth,
    cart,
    orders,
  },
});
