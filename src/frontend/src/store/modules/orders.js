import { ADD_ENTITY } from "@/store/mutations-types";

const module = "orders";

export default {
  namespaced: true,
  state: {
    orders: [],
  },

  actions: {
    addProductInOrder({ commit }, orderItem) {
      commit(
        ADD_ENTITY,
        { module, entity: "orders", value: orderItem },
        { root: true }
      );
    },
  },
};
