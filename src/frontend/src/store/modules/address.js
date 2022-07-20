import { SET_ADDRESSES } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    addresses: [],
  },

  mutations: {
    [SET_ADDRESSES](state, addresses) {
      state.addresses = addresses;
    },
  },

  actions: {
    async fetchAddresses({ commit }) {
      const addresses = await this.$api.address.get();
      commit(SET_ADDRESSES, addresses);
    },
  },
};
