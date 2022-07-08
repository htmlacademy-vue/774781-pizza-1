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
    async postOrder(_, orderItem) {
      const postedOrder = await this.$api.order.post(orderItem);
      console.log(postedOrder);
    },
  },
};
