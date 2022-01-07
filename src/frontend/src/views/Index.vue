<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <AppTitle size="big">Конструктор пиццы</AppTitle>

        <div class="content__dough">
          <BuilderDoughSelector />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector />
        </div>

        <div class="content__ingredients">
          <BuilderIngredientsSelector />
        </div>

        <div class="content__pizza">
          <AppInput
            name="pizza_name"
            title="Название пиццы"
            placeholder="Введите название пиццы"
            is-title-hidden
            @input="updatePizzaName($event)"
          />

          <div class="content__constructor">
            <BuilderPizzaView @drop="testEvent($event)" />
          </div>

          <div class="content__result">
            <BuilderPriceCounter :total-price="totalPrice" />
            <AppButton :disabled="!availableAddOrderToCart">Готовьте</AppButton>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

import {
  SELECT_DOUGH,
  UPDATE_DOUGH_PRICE,
  SELECT_SAUCE,
  UPDATE_SAUCE_PRICE,
  SELECT_SIZE,
  UPDATE_SIZE_MULTIPLIER,
  UPDATE_PIZZA_NAME,
} from "@/store/mutations-types";

import {
  BuilderSizeSelector,
  BuilderIngredientsSelector,
  BuilderDoughSelector,
  BuilderPizzaView,
  BuilderPriceCounter,
} from "@/modules/builder/components";

export default {
  name: "Index",

  components: {
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  data() {
    return {
      selectedIngredients: [],
      ingredientsPrice: 0,
    };
  },

  computed: {
    totalPrice() {
      return (
        (this.doughPrice + this.saucePrice + this.ingredientsPrice) *
        this.sizeMultiplier
      );
    },

    hasIngredients() {
      return (
        this.selectedIngredients.filter(({ count }) => count >= 1).length > 0
      );
    },

    availableAddOrderToCart() {
      return this.hasPizzaName && this.hasIngredients;
    },

    ...mapState("builder", [
      "doughPrice",
      "saucePrice",
      "sizeMultiplier",
      "pizzaName",
    ]),

    ...mapGetters("builder", ["hasPizzaName"]),
  },

  methods: {
    testEvent(data) {
      console.log(data);
    },

    ...mapMutations("builder", {
      selectDough: SELECT_DOUGH,
      updateDoughPrice: UPDATE_DOUGH_PRICE,
      selectSauce: SELECT_SAUCE,
      updateSaucePrice: UPDATE_SAUCE_PRICE,
      selectSize: SELECT_SIZE,
      updateSizeMultiplier: UPDATE_SIZE_MULTIPLIER,
      updatePizzaName: UPDATE_PIZZA_NAME,
    }),
  },
};
</script>
