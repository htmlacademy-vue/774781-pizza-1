<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import { layoutName } from "@/common/const.js";

export default {
  name: "AppLayout",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || layoutName.DEFAULT;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
