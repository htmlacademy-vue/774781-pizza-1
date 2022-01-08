<template>
  <p>Итого: {{ totalPrice }} ₽</p>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BuilderPriceCounter",

  computed: {
    totalPrice() {
      return (
        (this.doughPrice + this.saucePrice + this.ingredientsPrice) *
        this.sizeMultiplier
      );
    },

    ...mapState("builder", [
      "doughPrice",
      "saucePrice",
      "sizeMultiplier",
      "ingredientsPrice",
    ]),
  },
};
</script>
