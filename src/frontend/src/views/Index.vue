<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <AppTitle size="big">Конструктор пиццы</AppTitle>

        <div class="content__dough">
          <BuilderDoughSelector
            :dough="dough"
            :default-checked="selectedDough"
            @selectDough="selectDough($event)"
            @updateDoughPrice="updateDoughPrice($event)"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector
            :sizes="sizes"
            :default-checked="selectedSize"
            @selectSize="selectSize($event)"
            @updateSizeMultiplier="updateSizeMultiplier($event)"
          />
        </div>

        <div class="content__ingredients">
          <BuilderIngredientsSelector
            :ingredients="ingredients"
            :sauces="sauces"
            :default-sauce-checked="selectedSauce"
            @selectSauce="selectSauce($event)"
            @updateSaucePrice="updateSaucePrice($event)"
            @selectIngredients="selectIngredients($event)"
          />
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
            <BuilderPizzaView
              :dough="selectedDough"
              :sauce="selectedSauce"
              :ingredients="selectedIngredients"
              @drop="selectIngredients($event)"
            />
          </div>

          <div class="content__result">
            <BuilderPriceCounter :total-price="totalPrice" />
            <AppButton :disabled="isNotAvailable">Готовьте</AppButton>
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

    hasPizzaName() {
      return this.pizzaName.length > 0;
    },

    hasIngredients() {
      return (
        this.selectedIngredients.filter(({ count }) => count >= 1).length > 0
      );
    },

    isNotAvailable() {
      return !this.hasPizzaName || !this.hasIngredients;
    },

    ...mapState("builder", [
      "selectedDough",
      "selectedSauce",
      "selectedSize",
      "doughPrice",
      "saucePrice",
      "sizeMultiplier",
      "pizzaName",
    ]),

    ...mapGetters("builder", ["dough", "sauces", "sizes", "ingredients"]),
  },

  methods: {
    updateIngredientsPrice(ingredirents) {
      this.ingredientsPrice = ingredirents
        .filter(({ count }) => count > 0)
        .reduce(
          (accumulator, { count, price }) => accumulator + price * count,
          0
        );
    },

    selectIngredients(ingredirent) {
      const existingIngredientIndex = this.selectedIngredients.findIndex(
        ({ name }) => name === ingredirent.name
      );

      if (existingIngredientIndex !== -1) {
        this.selectedIngredients.splice(existingIngredientIndex, 1);
      }

      this.selectedIngredients.push(ingredirent);
      this.updateIngredientsPrice(this.selectedIngredients);
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
