<template>
  <div id="app">
    <AppLayout v-if="!loading">
      <transition
        type="animation"
        enter-active-class="slide-in-left"
        appear
      >
        <router-view />
      </transition>
    </AppLayout>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { SET_LOADING } from "./store/mutation-types";
import AppLayout from './layouts/AppLayout.vue'

export default {
  name: "App",
  components: {
    AppLayout,
  },
  computed: {
    ...mapState(["loading"]),
    ...mapState("auth", ["isAuthenticated"]),
  },
  async created() {
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

<style lang="scss" src="./assets/scss/app.scss"></style>
