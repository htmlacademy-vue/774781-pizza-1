import jsonMisc from "@/static/misc";
import {
  ADD_ENTITY,
  SET_ENTITY,
  ADD_MISC_ADDITIONAL_DATA,
} from "@/store/mutations-types";

const module = "cart";

export default {
  namespaced: true,

  state: {
    misc: [],
    products: [],
    checkoutStatus: null,
    totalPrice: 0,
  },

  mutations: {
    [ADD_MISC_ADDITIONAL_DATA](state) {
      state.misc = state.misc.map((misc) => ({
        ...misc,
        quantity: 0,
      }));
    },
  },

  actions: {
    fetchMisc({ commit }) {
      const misc = jsonMisc;

      commit(
        SET_ENTITY,
        { module, entity: "misc", value: misc },
        { root: true }
      );

      commit(ADD_MISC_ADDITIONAL_DATA, misc);
    },

    addProductToCart({ commit }, product) {
      commit(
        ADD_ENTITY,
        { module, entity: "products", value: product },
        { root: true }
      );
    },
  },
};
