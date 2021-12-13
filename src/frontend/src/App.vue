<template>
  <div id="app">
    <AppLayout
      :dough="dough"
      :ingredients="ingredients"
      :sauces="sauces"
      :sizes="sizes"
    >
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import pizza from "@/static/pizza.json";
import doughValues from "@/common/enums/doughValues.js";
import ingredientModifiers from "@/common/enums/ingredientModifiers.js";
import saucesValues from "@/common/enums/saucesValues.js";
import sizesValues from "@/common/enums/sizesValues.js";

export default {
  name: "App",

  pizza,

  computed: {
    dough() {
      return this.$options.pizza.dough.map((dough) => ({
        ...dough,
        value: doughValues[dough.name],
      }));
    },

    ingredients() {
      return this.$options.pizza.ingredients.map((ingredient) => ({
        ...ingredient,
        modifier: ingredientModifiers[ingredient.name],
      }));
    },

    sauces() {
      return this.$options.pizza.sauces.map((sauce) => ({
        ...sauce,
        value: saucesValues[sauce.name],
      }));
    },

    sizes() {
      return this.$options.pizza.sizes.map((size) => ({
        ...size,
        value: sizesValues[size.multiplier],
      }));
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
