import jsonMisc from "@/static/misc";
import { SET_ENTITY, ADD_MISC, ADD_PRODUCT } from "@/store/mutations-types";

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
    [ADD_PRODUCT](state, product) {
      state.products.push(product);
    },

    [ADD_MISC](state) {
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
      commit(ADD_MISC, misc);
    },

    addProductToCart({ commit }, product) {
      commit(ADD_PRODUCT, product);
    },
  },
};
