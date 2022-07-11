<template>
  <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #{{ orderId }}</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ calcOrderPrice() }} ₽</span>
    </div>

    <div class="order__button">
      <AppButton border type="button" @click="deleteOrder(orderId)">
        Удалить
      </AppButton>
    </div>
    <div class="order__button">
      <AppButton type="button" @click="repeatOrder()">Повторить</AppButton>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "OrderHeader",
  props: {
    orderId: {
      type: String,
      required: true,
    },
  },
  methods: {
    calcOrderPrice() {
      return 100;
    },
    ...mapActions("orders", ["deleteOrder", "repeatOrder"]),
  },
};
</script>
