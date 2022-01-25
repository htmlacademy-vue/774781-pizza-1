import jsonMisc from "@/static/misc";
import {
  SET_ENTITY,
  ADD_MISC_ADDITIONAL_DATA,
  ADD_ENTITY,
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
        count: 0,
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
