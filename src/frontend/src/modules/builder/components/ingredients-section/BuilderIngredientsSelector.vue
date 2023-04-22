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
            @update:counter="$emit('change', { id, quantity: $event })"
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

<style lang="scss" scoped>
.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>
