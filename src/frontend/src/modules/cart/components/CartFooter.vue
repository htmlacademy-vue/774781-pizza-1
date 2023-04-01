<template>
  <section class="footer">
    <div class="footer__more">
      <AppButton
        tag="a"
        border
        arrow
        @click="$emit('go-to-index-page')"
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
        :disabled="!isAvailableCreateOrder"
      >
        Оформить заказ
      </AppButton>
    </div>
  </section>
</template>

<script>
export default {
  name: "CartFooter",
  props: {
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    isAvailableCreateOrder: {
      type: Boolean,
      required: true,
      default: false,
    }
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
