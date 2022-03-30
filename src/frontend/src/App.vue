<template>
  <div id="app">
    <AppLayout v-if="!loading">
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  created() {
    this.init();
  },
  computed: {
    ...mapState(["loading"]),
  },
  methods: {
    ...mapActions(["init"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
