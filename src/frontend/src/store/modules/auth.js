import user from "@/static/user";

export default {
  namespaced: true,

  state: {
    user,
  },

  getters: {
    userId: (state) => {
      return state.user.id;
    },

    userPhone: (state) => {
      return state.user.phone;
    },
  },
};
