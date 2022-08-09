<template>
  <section class="footer">
    <div class="footer__more">
      <AppButton
        tag="a"
        border
        arrow
        @click="toIndexPage()"
      >
        Хочу еще одну
      </AppButton>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br>чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ totalPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <AppButton
        type="submit"
        :disabled="unavailableCreateOrder"
      >
        Оформить заказ
      </AppButton>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartFooter",

  computed: {
    unavailableCreateOrder() {
      return !this.hasCartPhone;
    },
    ...mapGetters(["hasCartPhone"]),
    ...mapGetters("cart", ["totalPrice"]),
  },

  methods: {
    toIndexPage() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}
</style>
