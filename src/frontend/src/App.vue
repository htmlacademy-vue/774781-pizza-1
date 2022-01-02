<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("builder/fetchPizza");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
