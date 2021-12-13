<template>
  <div>
    <AppLayoutHeader />
    <Index
      :dough="dough"
      :ingredients="ingredients"
      :sauces="sauces"
      :sizes="sizes"
    />
  </div>
</template>

<script>
import Index from "@/views/Index.vue";
import { layoutName } from "@/common/const.js";

export default {
  name: layoutName.DEFAULT,

  components: {
    Index,
  },

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
