import {
  ADD_PRODUCT_IN_CART,
  CHANGE_PRODUCT_QUANTITY,
  UPDATE_PRODUCT_PRICE,
  CHANGE_MISC_QUANTITY,
  NORMALIZE_MISC,
  SET_MISC,
  SET_PHONE,
  SET_ADDRESS,
  RESET_CART,
} from "@/store/mutations-types";

const setupCartState = () => ({
  misc: [],
  products: [],
  currentMisc: {},
  cartPhone: "",
  address: "1",
});

export default {
  namespaced: true,

  state: setupCartState(),

  mutations: {
    [RESET_CART](state) {
      Object.assign(state, setupCartState());
    },
    [ADD_PRODUCT_IN_CART](state, product) {
      state.products.push(product);
    },
    [SET_MISC](state, misc) {
      state.misc = misc;
    },
    [SET_PHONE](state, phone) {
      state.cartPhone = phone;
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
    hasPhone: (state) => state.cartPhone.length > 0,
    selfDelivery: (state) => state.address === "1",
  },

  actions: {
    async fetchMisc({ commit }) {
      const misc = await this.$api.cart.misc();

      commit(SET_MISC, misc);
      commit(NORMALIZE_MISC);
    },
  },
};
