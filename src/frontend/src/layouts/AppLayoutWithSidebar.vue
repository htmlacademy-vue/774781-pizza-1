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
import { layoutName } from "@/common/const.js";
import AppSidebar from "@/layouts/AppSidebar.vue";
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";

export default {
  name: layoutName.WITH_SIDEBAR,
  components: {
    AppLayoutHeader,
    AppSidebar,
  },
};
</script>
