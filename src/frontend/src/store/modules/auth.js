import user from "@/static/user";

export default {
  namespaced: true,

  state: {
    user,
  },

  getters: {
    id: (state) => {
      return state.user.id;
    },

    phone: (state) => {
      return state.user.phone;
    },
  },
};
