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

    [UPDATE_PRODUCT_PRICE](state, { id, quantity }) {
      if (quantity === 0) {
        const productIndex = state.products.findIndex((p) => p.id === id);

        state.products.splice(productIndex, 1);
        state.totalPrice = 0;
        return;
      } else {
        const product = state.products.find((p) => p.id === id);

        this._vm.$set(product, "price", product.basePrice * quantity);
        state.totalPrice = product.basePrice * quantity;
      }
    },

    [CHANGE_PRODUCT_QUANTITY](state, { id, quantity }) {
      const product = state.products.find((product) => product.id === id);

      this._vm.$set(product, "quantity", quantity);
    },
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
