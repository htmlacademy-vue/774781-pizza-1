<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <AppTitle small>Авторизуйтесь на сайте</AppTitle>
    </div>
    <form @submit.prevent="signIn($event)">
      <div class="sign-form__input">
        <AppInput
          v-model="email"
          type="email"
          name="email"
          placeholder="example@mail.ru"
          :errors="emailErrors"
        >
          E-mail
        </AppInput>
      </div>

      <div class="sign-form__input">
        <AppInput
          v-model="password"
          type="password"
          name="pass"
          placeholder="***********"
          :errors="passwordErrors"
        >
          Пароль
        </AppInput>
      </div>
      <AppButton type="submit">Авторизоваться</AppButton>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { validateForm } from "@/services/formValidation";

export default {
  name: "LoginPage",

  data() {
    return {
      email: "user@example.com",
      password: "user@example.com",
      errors: [],
    };
  },

  computed: {
    emailErrors() {
      return this.errors[0]?.failedRules;
    },
    passwordErrors() {
      return this.errors[1]?.failedRules;
    },
  },

  methods: {
    async signIn() {
      this.errors = validateForm([
        {
          name: "email",
          value: this.email,
          rules: ["email", "required"],
        },
        {
          name: "pass",
          value: this.password,
          rules: ["required"],
        },
      ]);

      if (this.errors.length > 0) {
        return;
      }

      await this.login({
        email: this.email,
        password: this.password,
      });

      this.getOrders();
      this.$router.push("/");
    },
    ...mapActions("auth", ["login"]),
    ...mapActions(["getOrders"]),
  },
};
</script>
