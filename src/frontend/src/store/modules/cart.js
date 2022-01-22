import jsonMisc from "@/static/misc";
import { SET_MISC, ADD_MISC_COUNT } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    misc: [],
    items: [],
    checkoutStatus: null,
  },

  mutations: {
    [SET_MISC](state, misc) {
      state.misc = misc;
    },

    [ADD_MISC_COUNT](state) {
      state.misc = state.misc.map((misc) => ({
        ...misc,
        count: 0,
      }));
    },
  },

  actions: {
    fetchMisc({ commit }) {
      const misc = jsonMisc;

      commit(SET_MISC, misc);
      commit(ADD_MISC_COUNT, misc);
    },

    addProductToCart({ state, commit }, product) {
      // commit("setCheckoutStatus", null);
      // if (product.inventory > 0) {
      //   const cartItem = state.items.find((item) => item.id === product.id);
      //   if (!cartItem) {
      //     commit("pushProductToCart", { id: product.id });
      //   } else {
      //     commit("incrementItemQuantity", cartItem);
      //   }
      //   // remove 1 item from stock
      //   commit(
      //     "products/decrementProductInventory",
      //     { id: product.id },
      //     { root: true }
      //   );
      // }

      console.log(state);
      console.log(commit);
      console.log(product);
    },
  },
};
