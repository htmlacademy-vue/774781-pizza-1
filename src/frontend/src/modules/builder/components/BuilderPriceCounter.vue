<template>
  <p>Итого: {{ builderPrice }} ₽</p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",

  computed: {
    ...mapGetters("builder", ["builderPrice"]),
  },
};
</script>
