<template>
  <p>Итого: {{ currentPrice }} ₽</p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",

  computed: {
    ...mapGetters("builder", ["currentPrice"]),
  },
};
</script>
