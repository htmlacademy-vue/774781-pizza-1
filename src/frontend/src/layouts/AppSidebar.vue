<template>
  <div class="layout__sidebar sidebar">
    <Logo class="layout__logo" />

    <router-link
      active-class="layout__link--active"
      class="layout__link"
      to="/orders"
      >История заказов</router-link
    >
    <router-link
      active-class="layout__link--active"
      class="layout__link"
      to="/profile"
      >Мои данные</router-link
    >
  </div>
</template>

<script>
import { Logo } from "@/common/components";

export default {
  name: "AppSidebar",

  components: {
    Logo,
  },
};
</script>

<style lang="scss" scoped></style>
