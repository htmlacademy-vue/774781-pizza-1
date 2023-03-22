<template>
  <p>Итого: {{ price }} ₽</p>
</template>

<script>
export default {
  name: "BuilderAmount",
  props: {
    price: {
      type: Number,
      required: true,
    }
  }
};
</script>
