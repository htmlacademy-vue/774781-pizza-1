<template>
  <transition
    name="fade"
    appear
    @after-leave="routeOnSuccessOrderCreation()"
  >
    <div class="popup">
      <a
        href="#"
        class="close"
        @click.prevent="close()"
      >
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <AppTitle :level="2">
          Спасибо за заказ
        </AppTitle>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a
          href="#"
          class="button"
          @click.prevent="close()"
        >Отлично, я жду!</a>
      </div>
    </div>
  </transition>
</template>

<script>
import AppTitle from '../../../common/components/AppTitle.vue';

export default {
  name: "CartSuccessPopup",
  components: {
    AppTitle
  },
  props: {
    isAuthenticated: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  methods: {
    close() {
      this.$emit('input');
    },
    routeOnSuccessOrderCreation() {
      this.$router.push(this.isAuthenticated ? "/orders" : "/");
    },
  },
};
</script>

<style lang="scss" src="../../../assets/scss/layout/popup.scss" scoped></style>
