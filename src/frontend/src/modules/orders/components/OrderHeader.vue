<template>
  <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #{{ orderId }}</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ orderPrice }} ₽</span>
    </div>

    <div class="order__button">
      <AppButton
        border
        type="button"
        @click="deleteOrder(orderId)"
      >
        Удалить
      </AppButton>
    </div>
    <div class="order__button">
      <AppButton
        type="button"
        @click="repeatOrder(orderId)"
      >
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

<style lang="scss" scoped>
.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}
</style>
