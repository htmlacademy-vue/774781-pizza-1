import Vue from 'vue';
import {
  ADD_PRODUCT_IN_CART,
  CHANGE_PRODUCT_QUANTITY,
  UPDATE_PRODUCT_PRICE,
  CHANGE_MISC_QUANTITY,
  NORMALIZE_MISC,
  SET_MISC,
  SET_ADDRESS,
  RESET_CART,
  SHOW_SUCCESS_POPUP,
} from "@/store/mutation-types";

import { deliveryType } from "@/common/const";

const setupCartState = () => ({
  products: [],
  currentMisc: {},
  address: deliveryType.SELF_DELIVERY,
});

export default {
  namespaced: true,

  state: {
    misc: [],
    showSuccessPopup: false,
    ...setupCartState(),
  },

  mutations: {
    [SHOW_SUCCESS_POPUP](state, isShow) {
      state.showSuccessPopup = isShow;
    },
    [RESET_CART](state) {
      Object.assign(state, setupCartState());
    },
    [ADD_PRODUCT_IN_CART](state, product) {
      state.products.push(product);
    },
    [SET_MISC](state, misc) {
      state.misc = misc;
    },
    [SET_ADDRESS](state, address) {
      state.address = address;
    },
    [NORMALIZE_MISC](state) {
      state.misc = state.misc.map((misc) => ({
        ...misc,
        quantity: 0,
      }));
    },
    [UPDATE_PRODUCT_PRICE](state, { id, quantity, unitPrice }) {
      const idx = state.products.findIndex((product) => product.id === id);

      if (quantity === 0) {
        state.products.splice(idx, 1);
        return;
      }

      const product = state.products.find((product) => product.id === id);

      state.products.splice(idx, 1, {
        ...product,
        price: unitPrice * quantity,
      });
    },
    [CHANGE_PRODUCT_QUANTITY](state, { id, quantity }) {
      const product = state.products.find((product) => product.id === id);
      Vue.set(product, "quantity", quantity);
    },
    [CHANGE_MISC_QUANTITY](state, { id, quantity }) {
      quantity === 0
        ? Vue.delete(state.currentMisc, id)
        : Vue.set(state.currentMisc, id, quantity)
    },
  },

  getters: {
    hasProducts: ({ products }) => products.length > 0,
    productsPrice: ({ products }) =>
      products
        .filter(({ price }) => price > 0)
        .reduce((accumulator, { price }) => accumulator + price, 0),

    miscPrice: ({ misc, currentMisc }) =>
      misc
        .map((misc) => ({
          ...misc,
          quantity: currentMisc[misc.id] || 0,
        }))
        .filter(({ quantity }) => quantity > 0)
        .reduce(
          (accumulator, { quantity, price }) => accumulator + price * quantity,
          0
        ),

    totalPrice: (_, { productsPrice, miscPrice }) => productsPrice + miscPrice,
    selfDelivery: (state) => state.address === deliveryType.SELF_DELIVERY,
  },

  actions: {
    async fetchMisc({ commit }) {
      const misc = await this.$api.cart.misc();

      commit(SET_MISC, misc);
      commit(NORMALIZE_MISC);
    },
  },
};
