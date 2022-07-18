import { SET_AUTHENTICATION, SET_USER } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    user: null,
    isAuthenticated: false,
  },

  getters: {
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
      commit(SET_USER, null);
      commit(SET_AUTHENTICATION, false);
    },
    async getUser({ commit, dispatch }) {
      try {
        const userData = await this.$api.auth.whoAmI();
        commit(SET_USER, userData);
        commit(SET_AUTHENTICATION, true);
      } catch (error) {
        dispatch("logout", false);
      }
    },
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getUser");
    },
    async tryLoginIfTokenExist({ dispatch }) {
      if (!this.$jwt.getToken()) {
        return;
      }

      this.$api.auth.setAuthHeader();
      await dispatch("getUser");
    },
  },
};
