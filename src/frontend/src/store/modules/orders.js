import { SET_ORDERS, DELETE_ORDER } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    orders: [],
  },

  mutations: {
    [SET_ORDERS](state, orders) {
      state.orders = orders;
    },
    [DELETE_ORDER](state, id) {
      const idx = state.orders.findIndex((order) => order.id === id);
      state.orders.splice(idx, 1);
    },
  },

  actions: {
    postOrder(_, orderItem) {
      this.$api.orders.post(orderItem);
    },
    async deleteOrder({ commit }, id) {
      await this.$api.orders.deleteOrder(id);
      commit(DELETE_ORDER, id);
    },
    async fetchOrders({ commit }) {
      const orders = await this.$api.orders.get();
      commit(SET_ORDERS, orders);
    },
    repeatOrder() {
      this.$router.push("/cart");
    },
  },
};
