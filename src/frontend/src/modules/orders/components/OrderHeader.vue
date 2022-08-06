<template>
  <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #{{ orderId }}</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ orderPrice }} ₽</span>
    </div>

    <div class="order__button">
      <AppButton border type="button" @click="deleteOrder(orderId)">
        Удалить
      </AppButton>
    </div>
    <div class="order__button">
      <AppButton type="button" @click="repeatOrder(orderId)">
        Повторить
      </AppButton>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { REPEAT_ORDER } from "@/store/mutation-types";

export default {
  name: "OrderHeader",
  props: {
    orderId: {
      type: String,
      required: true,
    },
    orderPrice: {
      type: Number,
      required: true,
    },
  },
  methods: {
    repeatOrder(id) {
      this[REPEAT_ORDER](id);
      this.$router.push("/cart");
    },
    ...mapMutations([REPEAT_ORDER]),
    ...mapActions("orders", ["deleteOrder"]),
  },
};
</script>
