import {
  SET_ADDRESSES,
  SET_CART_ADDRESS_ENTITY,
  SET_PROFILE_ADDRESS_ENTITY,
  START_EDIT_ADDRESS,
  SET_PROFILE_ADDRESS,
  RESET_PROFILE_ADDRESS,
  SHOW_CREATE_NEW_ADDRESS_FORM,
} from "@/store/mutation-types";

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
      id: null,
      name: "",
      street: "",
      building: "",
      flat: "",
    },
    profileAddress: setupProfileAddressState(),
    startedEditAddress: false,
    isNewAddressFormCreationVisible: false,
  },

  getters: {
    isNewAddressFormCreationAvailable: (state) =>
      !state.startedEditAddress && !state.isNewAddressFormCreationVisible,
  },

  mutations: {
    [SET_ADDRESSES](state, addresses) {
      state.addresses = addresses;
    },
    [SET_PROFILE_ADDRESS](state, address) {
      state.profileAddress = { ...address };
    },
    [SET_CART_ADDRESS_ENTITY](state, { entity, value }) {
      state.cartAddress[entity] = value;
    },
    [SET_PROFILE_ADDRESS_ENTITY](state, { entity, value }) {
      state.profileAddress[entity] = value;
    },
    [START_EDIT_ADDRESS](state, value) {
      state.startedEditAddress = value;
    },
    [SHOW_CREATE_NEW_ADDRESS_FORM](state, value) {
      state.isNewAddressFormCreationVisible = value;
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
    async postAddress(_, address) {
      await this.$api.address.post(address);
    },
    async deleteAddress(_, id) {
      await this.$api.address.deleteAddress(id);
    },
    async putAddress(_, { id, address }) {
      await this.$api.address.put(id, address);
    },
  },
};
