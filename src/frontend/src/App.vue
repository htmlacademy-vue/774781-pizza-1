<template>
  <div id="app">
    <AppLayout
      :dough="dough"
      :ingredients="ingredients"
      :sauces="sauces"
    />
  </div>
</template>

<script>
import pizza from "@/static/pizza.json";
import doughValues from "@/common/enums/doughValues";
import ingredientModifiers from "@/common/enums/ingredientModifiers";
import saucesValues from "@/common/enums/saucesValues";
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",

  components: {
    AppLayout,
  },

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
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
