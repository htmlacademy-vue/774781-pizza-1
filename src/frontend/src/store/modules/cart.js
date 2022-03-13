import jsonMisc from "@/static/misc";
import {
  ADD_CART_ENTITY,
  CHANGE_PRODUCT_QUANTITY,
  UPDATE_PRODUCT_PRICE,
  CHANGE_MISC_QUANTITY,
  ADD_MISC_ADDITIONAL_DATA,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    misc: [],
    products: [],
  },

  mutations: {
    [ADD_CART_ENTITY](state, { entity, value }) {
      state[entity] = value;
    },

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

    [CHANGE_MISC_QUANTITY](state, { id, quantity }) {
      const misc = state.misc.find((misc) => misc.id === id);

      this._vm.$set(misc, "quantity", quantity);
    },
  },

  getters: {
    products: (state) => state.products,
    hasProducts: (_, { products }) => products.length > 0,
    productsPrice: (_, { products }) =>
      products
        .filter(({ price }) => price > 0)
        .reduce((accumulator, { price }) => accumulator + price, 0),

    misc: (state) => state.misc,
    miscPrice: (_, { misc }) =>
      misc
        .filter(({ quantity }) => quantity > 0)
        .reduce(
          (accumulator, { quantity, price }) => accumulator + price * quantity,
          0
        ),

    totalPrice: (_, { productsPrice, miscPrice }) => productsPrice + miscPrice,
  },

  actions: {
    fetchMisc({ commit }) {
      const misc = jsonMisc;

      commit(ADD_CART_ENTITY, { entity: "misc", value: misc });
      commit(ADD_MISC_ADDITIONAL_DATA, misc);
    },
  },
};
