import Vue from "vue";
import JWTService from "@/services/jwt";
import APIService from "@/services/api";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JWTService,
        $api: () => APIService,
      },
    });
  },
};

Vue.use(plugins);
