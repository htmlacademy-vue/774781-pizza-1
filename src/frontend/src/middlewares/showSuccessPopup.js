export const showSuccessPopup = ({ next, store, nextMiddleware }) => {
  if (!store.state.showSuccessPopup) {
    next("/");
  }

  return nextMiddleware();
};
