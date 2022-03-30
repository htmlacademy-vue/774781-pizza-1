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
            placeholder="Введите название пиццы"
            is-title-hidden
            @input="setPizzaName($event)"
            :value="pizzaName"
            >Название пиццы</AppInput
          >

          <div class="content__constructor">
            <BuilderPizzaView />
          </div>

          <div class="content__result">
            <BuilderPriceCounter />
            <AppButton
              @click="addPizzaToCart()"
              :disabled="!availableAddOrderToCart"
              >Готовьте</AppButton
            >
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import {
  SET_PIZZA_BASE_PRICE,
  SET_PIZZA_PRICE,
  SET_PIZZA_NAME,
  ADD_PRODUCT,
  RESET_CURRENT_PIZZA,
} from "@/store/mutations-types";

import {
  BuilderSizeSelector,
  BuilderIngredientsSelector,
  BuilderDoughSelector,
  BuilderPizzaView,
  BuilderPriceCounter,
} from "@/modules/builder/components";

export default {
  name: "IndexPage",

  components: {
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  computed: {
    availableAddOrderToCart() {
      return this.hasPizzaName && this.hasIngredients;
    },

    ...mapState("cart", ["products"]),
    ...mapState("builder", ["currentPizza"]),
    ...mapGetters("builder", [
      "hasPizzaName",
      "hasIngredients",
      "builderPrice",
      "pizzaName",
    ]),
  },

  methods: {
    addPizzaToCart() {
      this[SET_PIZZA_PRICE](this.builderPrice);
      this[SET_PIZZA_BASE_PRICE](this.builderPrice);
      this[ADD_PRODUCT]({ ...this.currentPizza });
      this[RESET_CURRENT_PIZZA]();
      this.setCurrentPizzaDefaultValues();
    },

    setPizzaName(name) {
      this[SET_PIZZA_NAME](name);
    },

    ...mapMutations("builder", [
      SET_PIZZA_NAME,
      SET_PIZZA_BASE_PRICE,
      SET_PIZZA_PRICE,
      RESET_CURRENT_PIZZA,
    ]),
    ...mapMutations("cart", [ADD_PRODUCT]),
    ...mapActions("cart", ["addProductToCart"]),
    ...mapActions("builder", ["setCurrentPizzaDefaultValues"]),
  },
};
</script>
