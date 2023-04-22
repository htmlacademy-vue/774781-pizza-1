<template>
  <div class="app-layout-default">
    <AppLayoutHeader />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from './AppLayoutHeader.vue';

export default {
  name: 'AppLayoutDefault',
  components: {
    AppLayoutHeader
  }
};
</script>

<style lang="scss" scoped>
.app-layout-default {
  display: flex;
  flex-direction: column;

  height: 100vh;
}
</style>
