<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
export default {
  name: "AppLayout",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || 'AppLayoutDefault';
      return () => import(`./${layout}.vue`);
    },
  },
};
</script>
