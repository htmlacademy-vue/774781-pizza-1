import {
  SET_ADDRESSES,
  SET_CART_ADDRESS_ENTITY,
  SET_PROFILE_ADDRESS_ENTITY,
  RESET_PROFILE_ADDRESS,
} from "@/store/mutations-types";

const setupProfileAddressState = () => ({
  id: "",
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
});

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
    profileAddress: setupProfileAddressState(),
  },

  getters: {
    hasAddress: (state) => state.addresses.length > 0,
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
    [RESET_PROFILE_ADDRESS](state) {
      Object.assign(state.profileAddress, setupProfileAddressState());
    },
  },

  actions: {
    async fetchAddresses({ commit }) {
      const addresses = await this.$api.address.get();
      commit(SET_ADDRESSES, addresses);
    },
    async postAddress({ commit }, address) {
      await this.$api.address.post(address);
      commit(RESET_PROFILE_ADDRESS);
    },
  },
};
