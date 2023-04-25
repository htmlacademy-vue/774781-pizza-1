<template>
  <header class="header">
    <div class="header__logo">
      <MainLogo />
    </div>
    <div class="header__cart">
      <router-link to="/cart">
        {{ totalPrice }} ₽
      </router-link>
    </div>
    <div class="header__user">
      <router-link
        v-if="!isAuthenticated"
        to="/login"
        class="header__login"
      >
        <span>Войти</span>
      </router-link>
      <template v-else>
        <router-link to="/profile">
          <img
            :src="user.avatar"
            :alt="user.name"
            width="32"
            height="32"
          >
          <span>{{ user.name }}</span>
        </router-link>
        <a
          href="#"
          class="header__logout"
          @click.prevent="tryLogout()"
        >
          <span>Выйти</span>
        </a>
      </template>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import MainLogo from "../common/components/MainLogo.vue";

export default {
  name: "AppLayoutHeader",
  components: {
    MainLogo,
  },
  computed: {
    ...mapState("auth", ["user", "isAuthenticated"]),
    ...mapGetters("cart", ["totalPrice"]),
  },
  methods: {
    async tryLogout() {
      await this.logout();
      if (this.$route.name !== 'IndexPage') {
        this.$router.push("/");
      }
    },
    ...mapActions("auth", ["logout"]),
  },
};
</script>

<style lang="scss" src="../assets/scss/layout/header.scss"></style>
