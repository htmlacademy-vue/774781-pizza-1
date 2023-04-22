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

<style lang="scss" scoped>
.popup {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 420px;
  padding: 64px 95px;

  background-color: $white;
  box-shadow: $shadow-light;

  &::before,
  &::after {
    position: absolute;

    width: 48px;
    height: 48px;

    content: "";

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;

    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &::after {
    right: 15px;
    bottom: 15px;

    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }

  p {
    margin-top: 24px;
    margin-bottom: 24px;

    text-align: center;
  }
}

.popup__title {
  text-align: center;

  font-size: 1.3em;
}

.popup__button {
  a {
    padding: 16px 32px;
  }
}
</style>
