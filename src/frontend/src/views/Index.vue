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
            @input="UPDATE_PIZZA_NAME($event)"
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
import { UPDATE_PIZZA_NAME } from "@/store/mutations-types";
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

  computed: {
    totalPrice() {
      return (
        (this.doughPrice + this.saucePrice + this.ingredientsPrice) *
        this.sizeMultiplier
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
      "ingredientsPrice",
    ]),

    ...mapGetters("builder", ["hasPizzaName", "hasIngredients"]),
  },

  methods: {
    testEvent(data) {
      console.log(data);
    },

    ...mapMutations("builder", [UPDATE_PIZZA_NAME]),
  },
};
</script>
