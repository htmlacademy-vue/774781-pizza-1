<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="{ id, name, modifier } in ingredients"
        :key="id"
        class="ingredients__item"
      >
        <AppDrag
          :transfer-data="{ id, quantity: currentIngredients[id] }"
        >
          <BuilderIngredientFilling
            :name="name"
            :modifier="modifier"
          />

          <ItemCounter
            class="ingredients__counter"
            :counter="currentIngredients[id]"
            @update="$emit('change', { id, quantity: $event })"
          />
        </AppDrag>
      </li>
    </ul>
  </div>
</template>

<script>
import AppDrag from "../../../../common/components/AppDrag.vue";
import ItemCounter from "../../../../common/components/ItemCounter.vue";
import BuilderIngredientFilling from "./BuilderIngredientsFilling.vue";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    AppDrag,
    ItemCounter,
    BuilderIngredientFilling,
  },
  props: {
    ingredients: {
      type: Array,
      required: true,
      default: () => [],
    },
    currentIngredients: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
};
</script>
