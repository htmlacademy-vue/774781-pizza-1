import { ADD_ORDER_ITEM } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    orders: [],
  },

  mutations: {},

  actions: {
    addProductInOrder({ commit }, orderItem) {
      commit(ADD_ORDER_ITEM, orderItem);
    },
  },
};
