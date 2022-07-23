import {
  SET_ADDRESSES,
  SET_CURRENT_ADDRESS_ENTITY,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    addresses: [],
    currentAddress: {
      name: "",
      street: "",
      building: "",
      flat: "",
    },
  },

  getters: {
    hasAddress: (state) => state.addresses.length > 0,
  },

  mutations: {
    [SET_ADDRESSES](state, addresses) {
      state.addresses = addresses;
    },
    [SET_CURRENT_ADDRESS_ENTITY](state, { entity, value }) {
      state.currentAddress[entity] = value;
    },
  },

  actions: {
    async fetchAddresses({ commit }) {
      const addresses = await this.$api.address.get();
      commit(SET_ADDRESSES, addresses);
    },
  },
};
