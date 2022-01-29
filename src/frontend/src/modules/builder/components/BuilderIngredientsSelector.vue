<template>
  <div class="sheet">
    <AppTitle :level="2" size="small" class="sheet__title">
      Выберите ингредиенты
    </AppTitle>

    <div class="sheet__content ingredients">
      <div class="ingredients__sauce">
        <p>Основной соус:</p>

        <RadioButton
          v-for="{ id, name, value, price } in sauces"
          :key="id"
          class="ingredients__input"
          name="sauces"
          :title="name"
          :value="value"
          :checked="id === selectedSauce"
          @change="updateSauce(id, price)"
        />
      </div>

      <div class="ingredients__filling">
        <p>Начинка:</p>

        <ul class="ingredients__list">
          <li
            v-for="{ id, name, modifier, quantity } in ingredients"
            :key="id"
            class="ingredients__item"
          >
            <AppDrag :transfer-data="{ id }">
              <IngredientFilling :name="name" :modifier="modifier" />

              <ItemCounter
                class="ingredients__counter"
                :value="quantity"
                @changeCount="addIngredient($event, id)"
              />
            </AppDrag>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import {
  SELECT_PIZZA_ENTITY,
  CHANGE_INGREDIENT_QUANTITY,
  UPDATE_INGREDIENT_PRICE,
  SET_ENTITY,
} from "@/store/mutations-types";

import { RadioButton, ItemCounter } from "@/common/components";
import IngredientFilling from "./IngredientFilling.vue";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    RadioButton,
    ItemCounter,
    IngredientFilling,
  },

  computed: {
    ...mapState("builder", ["selectedSauce"]),
    ...mapGetters("builder", ["sauces", "ingredients"]),
  },

  methods: {
    updateSauce(id, price) {
      this[SELECT_PIZZA_ENTITY]({
        entitySelected: "selectedSauce",
        entityFrom: "sauces",
        id,
      });

      this[SET_ENTITY](
        { module: "builder", entity: "saucePrice", value: price },
        { root: true }
      );
    },

    addIngredient(quantity, id) {
      this[CHANGE_INGREDIENT_QUANTITY]({ id, quantity });
      this[UPDATE_INGREDIENT_PRICE]();
    },

    ...mapMutations([SET_ENTITY]),
    ...mapMutations("builder", [
      SELECT_PIZZA_ENTITY,
      CHANGE_INGREDIENT_QUANTITY,
      UPDATE_INGREDIENT_PRICE,
    ]),
  },
};
</script>

<style lang="scss">
.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

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
