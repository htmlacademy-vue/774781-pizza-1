import jsonMisc from "@/static/misc";
import { SET_MISC, ADD_MISC_COUNT } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    misc: [],
    items: [],
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
  },
};
