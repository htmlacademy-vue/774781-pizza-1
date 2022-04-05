<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <AppTitle size="small">Авторизуйтесь на сайте</AppTitle>
    </div>
    <form @submit.prevent="signIn()">
      <div class="sign-form__input">
        <AppInput
          v-model="email"
          type="email"
          name="email"
          placeholder="example@mail.ru"
          >E-mail</AppInput
        >
      </div>

      <div class="sign-form__input">
        <AppInput
          v-model="password"
          type="password"
          name="pass"
          placeholder="***********"
          >Пароль</AppInput
        >
      </div>
      <AppButton type="submit">Авторизоваться</AppButton>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginPage",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async signIn() {
      await this.login({
        email: this.email,
        password: this.password,
      });

      this.$router.push("/");
    },
    ...mapActions("auth", ["login"]),
  },
};
</script>
