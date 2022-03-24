import jsonMisc from "@/static/misc";
import {
  ADD_PRODUCT,
  CHANGE_PRODUCT_QUANTITY,
  UPDATE_PRODUCT_PRICE,
  CHANGE_MISC_QUANTITY,
  ADD_MISC_ADDITIONAL_DATA,
  SET_MISC,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    misc: [],
    products: [],
    currentMisc: {},
  },

  mutations: {
    [ADD_PRODUCT](state, product) {
      state.products.push(product);
    },

    [SET_MISC](state, misc) {
      state.misc = misc;
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
      const miscArray = Object.entries(state.currentMisc).map((entrie) => ({
        id: Number(entrie[0]),
        quantity: entrie[1],
      }));

      const idx = miscArray.findIndex((ingredient) => ingredient.id === id);

      if (idx === -1) {
        miscArray.push({ id, quantity });
      } else {
        miscArray.splice(idx, 1, {
          id,
          quantity,
        });
      }

      state.currentMisc = Object.fromEntries(
        miscArray.map((item) => [item.id, item.quantity])
      );
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
    selectedMisc: (state) => state.currentMisc,
    miscPrice: (_, { misc, selectedMisc }) =>
      misc
        .map((misc) => ({
          ...misc,
          quantity: selectedMisc[misc.id] || 0,
        }))
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

      commit(SET_MISC, misc);
      commit(ADD_MISC_ADDITIONAL_DATA);
    },
  },
};
