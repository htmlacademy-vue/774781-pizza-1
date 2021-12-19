<template>
  <div>
    <AppLayoutHeader />
    <slot />
  </div>
</template>

<script>
import { layoutName } from "@/common/const.js";

export default {
  name: layoutName.DEFAULT,

  props: {
    dough: {
      type: Array,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
    },

    sauces: {
      type: Array,
      required: true,
    },

    sizes: {
      type: Array,
      required: true,
    },
  },
};
</script>
