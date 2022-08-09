export const auth = ({ next, store, nextMiddleware }) => {
  if (!store.state.auth.isAuthenticated) {
    if (store.$jwt.getToken()) {
      store.$api.auth.setAuthHeader();
      store.dispatch("auth/getUser");
    } else {
      next("/");
    }
  }

  return nextMiddleware();
};
