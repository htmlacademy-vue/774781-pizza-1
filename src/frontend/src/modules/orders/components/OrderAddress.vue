<template>
  <p class="order__address">
    Адрес доставки: {{ address }}
  </p>
</template>

<script>
export default {
  name: "OrderAddress",
  props: {
    address: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}
</style>
