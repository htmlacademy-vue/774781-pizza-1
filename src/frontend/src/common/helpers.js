import resources from "@/common/enums/resources";
import {
  AuthApiService,
  BuilderApiService,
  CartApiService,
} from "@/services/api.service";
import { SET_AUTHENTICATION } from "@/store/mutations-types";

export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.BUILDER]: new BuilderApiService(),
    [resources.CART]: new CartApiService(),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("auth/getMe");
  store.commit(SET_AUTHENTICATION, true);
};
