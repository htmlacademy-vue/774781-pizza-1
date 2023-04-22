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
