import { SAVE_ORDER } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    orders: [],
  },

  mutations: {
    [SAVE_ORDER](state, order) {
      state.orders.push(order);
    },
  },

  actions: {
    addProductInOrder({ commit }, orderItem) {
      commit(SAVE_ORDER, orderItem);
    },
  },
};
