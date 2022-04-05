<template>
  <div id="app">
    <AppLayout v-if="!loading">
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import { SET_AUTHENTICATION } from "@/store/mutations-types";
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  name: "App",
  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };

    if (this.$jwt.getToken()) {
      this.$api.auth.setAuthHeader();
      this.getMe();
      this[SET_AUTHENTICATION](true);
    }

    this.init();
  },
  computed: {
    ...mapState(["loading"]),
  },
  methods: {
    ...mapMutations("auth", [SET_AUTHENTICATION]),
    ...mapActions(["init"]),
    ...mapActions("auth", ["getMe"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
