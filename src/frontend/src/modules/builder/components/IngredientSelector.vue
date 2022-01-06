<template>
  <AppDrag :transfer-data="{ name, price, count }">
    <IngredientFilling :name="name" :modifier="modifier" />

    <ItemCounter
      class="ingredients__counter"
      @changeCount="$emit('changeIngredientCount', $event)"
    />
  </AppDrag>
</template>

<script>
import { AppDrag, ItemCounter } from "@/common/components";
import IngredientFilling from "./IngredientFilling.vue";

export default {
  name: "IngredientSelector",

  components: {
    AppDrag,
    ItemCounter,
    IngredientFilling,
  },

  props: {
    name: {
      type: String,
      required: true,
    },

    modifier: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    count: {
      type: Number,
      required: true,
    },
  },
};
</script>
