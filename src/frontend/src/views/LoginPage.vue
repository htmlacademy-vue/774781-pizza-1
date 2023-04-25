<template>
  <div class="main">
    <div class="sign-form">
      <router-link
        to="/"
        class="close close--white"
      >
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </router-link>
      <div class="sign-form__title">
        <AppTitle small>
          Авторизуйтесь на сайте
        </AppTitle>
      </div>
      <form @submit.prevent="signIn($event)">
        <div
          class="sign-form__input"
        >
          <AppInput
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            :errors="formValidation.errors.get('email')"
          >
            E-mail
          </AppInput>
          <AppInput
            v-model="password"
            type="password"
            name="password"
            placeholder="***********"
            :errors="formValidation.errors.get('password')"
          >
            Пароль
          </AppInput>
        </div>
        <AppButton type="submit">
          Авторизоваться
        </AppButton>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import formValidation from '../common/mixins/form-validation.js';
import AppTitle from "../common/components/AppTitle.vue";
import AppButton from "../common/components/AppButton.vue";
import AppInput from "../common/components/AppInput.vue";

export default {
  name: "LoginPage",
  components: {
    AppInput,
    AppButton,
    AppTitle,
  },
  mixins: [formValidation],
  data() {
    return {
      email: 'user@example.com',
      password: 'user@example.com',
    };
  },
  methods: {
    async signIn() {
      this.formValidation.errors = this.validateForm([
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

      if (this.formValidation.errors.size > 0) {
        return;
      }

      await this.login({
        email: this.email,
        password: this.password,
      });

      await this.fetchUserData();
      this.$router.push("/");
    },
    ...mapActions("auth", ["login"]),
    ...mapActions(["fetchUserData"]),
  },
};
</script>
