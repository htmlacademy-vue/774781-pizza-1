<template>
  <div class="layout__sidebar sidebar">
    <MainLogo class="layout__logo" />

    <router-link
      active-class="layout__link--active"
      class="layout__link"
      to="/orders"
    >
      История заказов
    </router-link>
    <router-link
      active-class="layout__link--active"
      class="layout__link"
      to="/profile"
    >
      Мои данные
    </router-link>
  </div>
</template>

<script>
import MainLogo from '../common/components/MainLogo.vue';

export default {
  name: "AppSidebar",
  components: {
    MainLogo,
  },
};
</script>
