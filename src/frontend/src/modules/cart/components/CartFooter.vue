<template>
  <section class="footer">
    <div class="footer__more">
      <AppButton
        tag="a"
        border
        arrow
        @click="$emit('add-another-pizza')"
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

<style lang="scss" src="../../../assets/scss/blocks/footer.scss" scoped></style>
