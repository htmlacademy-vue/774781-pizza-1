<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="{ id, name, modifier, quantity } in ingredients"
        :key="id"
        class="ingredients__item"
      >
        <AppDrag :transfer-data="{ id, quantity }">
          <IngredientFilling :name="name" :modifier="modifier" />

          <ItemCounter
            class="ingredients__counter"
            :counter="quantity"
            @update:counter="changeQuantity(id, $event)"
          />
        </AppDrag>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import {
  CHANGE_INGREDIENT_QUANTITY,
  SET_PIZZA_ENTITY,
} from "@/store/mutations-types";

import { ItemCounter } from "@/common/components";
import IngredientFilling from "./IngredientFilling.vue";

export default {
  name: "IngredientsList",

  components: {
    IngredientFilling,
    ItemCounter,
  },

  computed: {
    ...mapGetters("builder", ["ingredients", "selectedIngredients"]),
  },

  methods: {
    changeQuantity(id, quantity) {
      this[CHANGE_INGREDIENT_QUANTITY]({ id, quantity });
      this[SET_PIZZA_ENTITY]({
        entity: "ingredients",
        value: this.selectedIngredients,
      });
    },

    ...mapMutations("builder", [CHANGE_INGREDIENT_QUANTITY, SET_PIZZA_ENTITY]),
  },
};
</script>

<style lang="scss">
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
