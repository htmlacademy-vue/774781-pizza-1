import jsonMisc from "@/static/misc";
import {
  SET_MISC,
  ADD_MISC,
  UPDATE_TOTAL_PRICE,
  ADD_PRODUCT,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    misc: [],
    products: [],
    checkoutStatus: null,
    totalPrice: 0,
  },

  mutations: {
    [SET_MISC](state, misc) {
      state.misc = misc;
    },

    [ADD_PRODUCT](state, product) {
      state.products.push(product);
    },

    [ADD_MISC](state) {
      state.misc = state.misc.map((misc) => ({
        ...misc,
        count: 0,
      }));
    },

    [UPDATE_TOTAL_PRICE](state, price) {
      state.totalPrice = price;
    },
  },

  actions: {
    fetchMisc({ commit }) {
      const misc = jsonMisc;

      commit(SET_MISC, misc);
      commit(ADD_MISC, misc);
    },

    addProductToCart({ commit }, product) {
      commit(ADD_PRODUCT, product);
    },
  },
};
