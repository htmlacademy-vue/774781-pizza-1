import user from "@/static/user";

export default {
  namespaced: true,

  state: {
    user,
  },

  getters: {
    isGuest: (state) => {
      return state.user === null;
    },

    userId: (state) => {
      return state.user.id;
    },

    userPhone: (state) => {
      return state.user.phone;
    },
  },
};
