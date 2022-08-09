<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="{ id, name, modifier } in builder.ingredients"
        :key="id"
        class="ingredients__item"
      >
        <AppDrag
          :transfer-data="{ id, quantity: currentPizza.ingredients[id] || 0 }"
        >
          <BuilderIngredientFilling
            :name="name"
            :modifier="modifier"
          />

          <ItemCounter
            class="ingredients__counter"
            :counter="currentPizza.ingredients[id] || 0"
            @update:counter="changeQuantity(id, $event)"
          />
        </AppDrag>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { CHANGE_INGREDIENT_QUANTITY } from "@/store/mutation-types";
import { ItemCounter } from "@/common/components";
import BuilderIngredientFilling from "./BuilderIngredientFilling.vue";

export default {
  name: "BuilderIngredients",

  components: {
    BuilderIngredientFilling,
    ItemCounter,
  },

  computed: {
    ...mapState("builder", ["builder", "currentPizza"]),
  },

  methods: {
    changeQuantity(id, quantity) {
      this[CHANGE_INGREDIENT_QUANTITY]({ id, quantity });
    },

    ...mapMutations("builder", [CHANGE_INGREDIENT_QUANTITY]),
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
