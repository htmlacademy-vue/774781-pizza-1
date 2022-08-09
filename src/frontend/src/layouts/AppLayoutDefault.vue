<template>
  <div class="app-layout-default">
    <AppLayoutHeader />
    <slot />
  </div>
</template>

<script>
import { layoutName } from "@/common/const.js";

export default {
  name: layoutName.DEFAULT,
};
</script>

<style lang="scss" scoped>
.app-layout-default {
  display: flex;
  flex-direction: column;

  height: 100vh;
}
</style>
