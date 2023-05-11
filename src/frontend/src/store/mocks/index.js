import Vuex from 'vuex';
import { builder, auth, cart, orders, profile } from "../modules";

export const generateMockStore = () => {
  return new Vuex.Store({
    modules: {
      builder,
      auth,
      cart,
      orders,
      profile,
    },
  })
}
