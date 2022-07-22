<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <AppTitle small>Авторизуйтесь на сайте</AppTitle>
    </div>
    <form @submit.prevent="signIn()" novalidate>
      <div class="sign-form__input">
        <AppInput
          v-model="email"
          type="email"
          name="email"
          placeholder="example@mail.ru"
          :error-text="validations.email.error"
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
          :error-text="validations.password.error"
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
import { validator } from "@/common/mixins";

export default {
  name: "LoginPage",

  mixins: [validator],

  data() {
    return {
      email: "user@example.com",
      password: "user@example.com",
      validations: {
        email: {
          error: "",
          rules: ["required", "email"],
        },
        password: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },

  watch: {
    email() {
      this.$clearValidationErrors();
    },
    password() {
      this.$clearValidationErrors();
    },
  },

  methods: {
    async signIn() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
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
