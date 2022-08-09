<template>
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
        v-for="field in fields"
        :key="field.name"
        class="sign-form__input"
      >
        <AppInput
          v-model="field.value"
          :type="field.type"
          :name="field.name"
          :placeholder="field.placeholder"
          :errors="getFieldErrors(field.name, errors)"
        >
          {{ field.text }}
        </AppInput>
      </div>
      <AppButton type="submit">
        Авторизоваться
      </AppButton>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { validateForm, getFieldErrors } from "@/services/form-validation";

export default {
  name: "LoginPage",

  data() {
    return {
      errors: [],
      fields: [
        {
          name: "email",
          type: "email",
          placeholder: "example@mail.ru",
          value: "user@example.com",
          text: "E-mail",
        },
        {
          type: "password",
          name: "pass",
          placeholder: "***********",
          value: "user@example.com",
          text: "Пароль",
        },
      ],
    };
  },

  computed: {
    email() {
      return this.fields.find((field) => field.name === "email").value;
    },
    password() {
      return this.fields.find((field) => field.name === "pass").value;
    },
  },

  methods: {
    getFieldErrors,
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

      this.fetchUserData();
      this.$router.push("/");
    },
    ...mapActions("auth", ["login"]),
    ...mapActions(["fetchUserData"]),
  },
};
</script>
