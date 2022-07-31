<template>
  <div id="app">
    <AppLayout v-if="!loading">
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { SET_LOADING } from "@/store/mutations-types";

export default {
  name: "App",
  async created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };

    this[SET_LOADING](true);
    await this.fetchInitialData();

    if (this.$jwt.getToken()) {
      await this.tryLoginIfTokenExist();
      await this.fetchUserData();
    }

    this[SET_LOADING](false);
  },
  computed: {
    ...mapState(["loading"]),
    ...mapState("auth", ["isAuthenticated"]),
  },
  methods: {
    ...mapMutations([SET_LOADING]),
    ...mapActions(["fetchInitialData", "fetchUserData"]),
    ...mapActions("auth", ["tryLoginIfTokenExist"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
