<template>
  <div id="app">
    <AppLayout v-if="!loading">
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import { SET_LOADING } from "@/store/mutations-types";
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  name: "App",
  async created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };

    this[SET_LOADING](true);
    await this.fetchInitialData();
    await this.fetchUserData();
    this[SET_LOADING](false);
  },
  computed: {
    ...mapState(["loading"]),
  },
  methods: {
    ...mapMutations([SET_LOADING]),
    ...mapActions(["fetchInitialData"]),
    ...mapActions(["fetchUserData"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
