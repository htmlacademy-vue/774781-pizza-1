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
export default {
  name: "OrderHeader",
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
