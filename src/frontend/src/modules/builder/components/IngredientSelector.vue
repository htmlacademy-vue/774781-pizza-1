<template>
  <AppDrag :transfer-data="{}">
    <IngredientFilling
      :name="name"
      :modifier="modifier"
    />

    <ItemCounter
      class="ingredients__counter"
      @change="$emit('change', $event)"
    />
  </AppDrag>
</template>

<script>
import { AppDrag, ItemCounter } from "@/common/components";
import IngredientFilling from './IngredientFilling.vue';

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
  },
};
</script>
