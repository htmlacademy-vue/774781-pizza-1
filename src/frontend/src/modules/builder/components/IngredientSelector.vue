<template>
  <!-- пока не понял как в :transfer-data передать ингредиент -->
  <AppDrag :transfer-data="{ name: 'tomatoes', count: 1, price: 35 }">
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
