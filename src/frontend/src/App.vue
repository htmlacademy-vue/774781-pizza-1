<template>
  <div id="app">
    <AppLayout v-if="!loading">
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import { SET_AUTHENTICATION, SET_LOADING } from "@/store/mutations-types";
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  name: "App",
  async created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };

    if (this.$jwt.getToken()) {
      this.$api.auth.setAuthHeader();
      this.getMe();
      this[SET_AUTHENTICATION](true);
      this.fetchOrders();
    }

    this[SET_LOADING](true);
    await this.fetchInitialData();
    this[SET_LOADING](false);
  },
  computed: {
    ...mapState(["loading"]),
  },
  methods: {
    ...mapMutations([SET_LOADING]),
    ...mapMutations("auth", [SET_AUTHENTICATION]),
    ...mapActions(["fetchInitialData"]),
    ...mapActions("auth", ["getMe"]),
    ...mapActions("orders", ["fetchOrders"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
