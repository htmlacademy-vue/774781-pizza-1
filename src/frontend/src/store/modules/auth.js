import { SET_AUTHENTICATION, SET_USER } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    user: null,
    isAuthenticated: false,
  },

  getters: {
    isGuest: (state) => {
      return state.user === null;
    },
    userId: (state) => {
      return state.user ? state.user.id : null;
    },
    userPhone: (state) => {
      return state.user ? state.user.phone : null;
    },
  },

  mutations: {
    [SET_AUTHENTICATION](state, value) {
      state.isAuthenticated = value;
    },
    [SET_USER](state, userData) {
      state.user = userData;
    },
  },

  actions: {
    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }

      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(SET_AUTHENTICATION, false);
      commit(SET_USER, null);
    },
    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(SET_AUTHENTICATION, true);
        commit(SET_USER, data);
      } catch {
        dispatch("logout", false);
      }
    },
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },
  },
};
