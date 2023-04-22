<template>
  <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #{{ id }}</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ price }} ₽</span>
    </div>

    <div class="order__button">
      <AppButton
        border
        type="button"
        @click="$emit('delete', id)"
      >
        Удалить
      </AppButton>
    </div>
    <div class="order__button">
      <AppButton
        type="button"
        @click="$emit('repeat', id)"
      >
        Повторить
      </AppButton>
    </div>
  </div>
</template>

<script>
import AppButton from '../../../common/components/AppButton.vue';

export default {
  name: "OrderHeader",
  components: {
    AppButton
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
};
</script>
