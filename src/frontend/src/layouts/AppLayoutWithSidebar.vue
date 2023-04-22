<template>
  <div>
    <AppLayoutHeader />

    <main class="layout">
      <AppSidebar />

      <div class="layout__content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import AppSidebar from "./AppSidebar.vue";
import AppLayoutHeader from "./AppLayoutHeader.vue";

export default {
  name: 'AppLayoutWithSidebar',
  components: {
    AppLayoutHeader,
    AppSidebar,
  },
};
</script>
