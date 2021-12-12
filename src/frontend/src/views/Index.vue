<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <AppTitle size="big"> Конструктор пиццы </AppTitle>

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
            <AppButton :disabled="isNotAvailable"> Готовьте </AppButton>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { AppTitle, AppInput, AppButton } from "@/common/components";
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
    AppTitle,
    AppInput,
    AppButton,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  props: {
    dough: {
      type: Array,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
    },

    sauces: {
      type: Array,
      required: true,
    },

    sizes: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      pizzaName: "",
      selectedIngredients: [],
      ingredientsPrice: 0,
      selectedDough: this.dough[0].value,
      selectedSauce: this.sauces[0].value,
      selectedSize: this.sizes[1].value,
      doughPrice: this.dough[0].price,
      saucePrice: this.sauces[0].price,
      sizeMultiplier: this.sizes[1].multiplier,
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
  },

  methods: {
    selectDough(dough) {
      this.selectedDough = dough;
    },

    updateDoughPrice(price) {
      this.doughPrice = price;
    },

    selectSauce(sauce) {
      this.selectedSauce = sauce;
    },

    updateSaucePrice(price) {
      this.saucePrice = price;
    },

    selectSize(size) {
      this.selectedSize = size;
    },

    updateSizeMultiplier(multiplier) {
      this.sizeMultiplier = multiplier;
    },

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

    updatePizzaName(name) {
      this.pizzaName = name;
    },
  },
};
</script>
