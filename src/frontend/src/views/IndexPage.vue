<template>
  <main class="content">
    <form @submit.prevent="addPizzaToCart()">
      <div class="content__wrapper">
        <AppTitle big>
          Конструктор пиццы
        </AppTitle>

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
            visually-hidden
            :value="currentPizza.name"
            @input="setPizzaName($event)"
          >
            Название пиццы
          </AppInput>

          <div class="content__constructor">
            <BuilderPizzaView />
          </div>

          <div class="content__result">
            <BuilderAmount />
            <AppButton
              :disabled="unavailableAddOrderToCart"
              type="submit"
            >
              Готовьте
            </AppButton>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { SET_PIZZA_NAME, ADD_PRODUCT_IN_CART } from "@/store/mutation-types";

import {
  BuilderSizeSelector,
  BuilderIngredientsSelector,
  BuilderDoughSelector,
  BuilderPizzaView,
  BuilderAmount,
} from "@/modules/builder/components";

export default {
  name: "IndexPage",

  components: {
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderPizzaView,
    BuilderAmount,
  },

  computed: {
    unavailableAddOrderToCart() {
      return !this.hasPizzaName || !this.hasIngredients;
    },

    ...mapState("cart", ["products"]),
    ...mapState("builder", ["currentPizza"]),
    ...mapGetters("builder", [
      "hasPizzaName",
      "hasIngredients",
      "builderPrice",
    ]),
  },

  methods: {
    addPizzaToCart() {
      this[ADD_PRODUCT_IN_CART]({
        ...this.currentPizza,
        price: this.builderPrice,
        unitPrice: this.builderPrice,
      });
      this.resetCurrentPizza();
    },

    setPizzaName(name) {
      this[SET_PIZZA_NAME](name);
    },

    ...mapMutations("builder", [SET_PIZZA_NAME]),
    ...mapMutations("cart", [ADD_PRODUCT_IN_CART]),
    ...mapActions("cart", ["addProductToCart"]),
    ...mapActions("builder", ["resetCurrentPizza"]),
  },
};
</script>
