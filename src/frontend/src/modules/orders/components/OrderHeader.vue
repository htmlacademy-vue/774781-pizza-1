<template>
  <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #{{ orderId }}</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ calcOrderPrice() }} ₽</span>
    </div>

    <div class="order__button">
      <AppButton border type="button">Удалить</AppButton>
    </div>
    <div class="order__button">
      <AppButton type="button">Повторить</AppButton>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderHeader",
  props: {
    orderId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    calcOrderPrice() {
      return 100;
    },
  },
};
</script>
