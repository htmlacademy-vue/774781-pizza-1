<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["init"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
