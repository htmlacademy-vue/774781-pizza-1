<template>
  <div>
    <IngredientFilling
      :name="name"
      :modifier="modifier"
    />

    <ItemCounter
      class="ingredients__counter"
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script>
import { ItemCounter } from "@/common/components";
import IngredientFilling from './IngredientFilling.vue';

export default {
  name: "IngredientSelector",

  components: {
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
  },
};
</script>
