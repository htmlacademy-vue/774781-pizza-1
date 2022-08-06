import {
  SET_ADDRESSES,
  SET_CART_ADDRESS_ENTITY,
  SET_PROFILE_ADDRESS_ENTITY,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    addresses: [],
    cartAddress: {
      name: "",
      street: "",
      building: "",
      flat: "",
    },
    profileAddress: {
      id: "",
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
  },

  mutations: {
    [SET_ADDRESSES](state, addresses) {
      state.addresses = addresses;
    },
    [SET_CART_ADDRESS_ENTITY](state, { entity, value }) {
      state.cartAddress[entity] = value;
    },
    [SET_PROFILE_ADDRESS_ENTITY](state, { entity, value }) {
      state.profileAddress[entity] = value;
    },
  },

  actions: {
    async fetchAddresses({ commit }) {
      const addresses = await this.$api.address.get();
      commit(SET_ADDRESSES, addresses);
    },
    async postAddress(_, address) {
      await this.$api.address.post(address);
    },
    async deleteAddress(_, id) {
      await this.$api.address.deleteAddress(id);
    },
  },
};
