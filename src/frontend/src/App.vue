<template>
  <div id="app">
    <AppLayout v-if="!loading">
      <transition name="slide">
        <router-view />
      </transition>
    </AppLayout>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { SET_LOADING } from "@/store/mutation-types";

export default {
  name: "App",

  computed: {
    ...mapState(["loading"]),
    ...mapState("auth", ["isAuthenticated"]),
  },

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

  methods: {
    ...mapMutations([SET_LOADING]),
    ...mapActions(["fetchInitialData", "fetchUserData"]),
    ...mapActions("auth", ["tryLoginIfTokenExist"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";

.slide-enter-active {
  animation: slide-in 0.6s;
}

.slide-leave-active {
  animation: slide-in 0.6s reverse;
}

@keyframes slide-in {
  from {
    transform: translate3d(100%, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
