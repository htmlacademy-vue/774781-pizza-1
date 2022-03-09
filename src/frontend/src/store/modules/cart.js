import jsonMisc from "@/static/misc";
import {
  ADD_ENTITY,
  SET_ENTITY,
  ADD_MISC_ADDITIONAL_DATA,
  CHANGE_PRODUCT_QUANTITY,
  UPDATE_PRODUCT_PRICE,
} from "@/store/mutations-types";

const module = "cart";

export default {
  namespaced: true,

  state: {
    misc: [],
    products: [],
    checkoutStatus: null,
    totalPrice: 0,
  },

  mutations: {
    [ADD_MISC_ADDITIONAL_DATA](state) {
      state.misc = state.misc.map((misc) => ({
        ...misc,
        quantity: 0,
      }));
    },

    [UPDATE_PRODUCT_PRICE](state, { id, quantity, basePrice }) {
      const idx = state.products.findIndex((product) => product.id === id);

      if (quantity === 0) {
        state.products.splice(idx, 1);
        return;
      }

      const product = state.products.find((product) => product.id === id);

      state.products.splice(idx, 1, {
        ...product,
        price: basePrice * quantity,
      });
    },

    [CHANGE_PRODUCT_QUANTITY](state, { id, quantity }) {
      const product = state.products.find((product) => product.id === id);

      this._vm.$set(product, "quantity", quantity);
    },
  },

  getters: {
    hasProducts: (state) => state.products.length > 0,
  },

  actions: {
    fetchMisc({ commit }) {
      const misc = jsonMisc;

      commit(
        SET_ENTITY,
        { module, entity: "misc", value: misc },
        { root: true }
      );

      commit(ADD_MISC_ADDITIONAL_DATA, misc);
    },

    addProductToCart({ commit }, product) {
      commit(
        ADD_ENTITY,
        { module, entity: "products", value: product },
        { root: true }
      );
    },
  },
};
