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
import { uniqueId } from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { SET_ENTITY, ADD_ENTITY } from "@/store/mutations-types";

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
    availableAddOrderToCart() {
      return this.hasPizzaName && this.hasIngredients;
    },

    ...mapState("cart", ["products"]),
    ...mapState("builder", [
      "pizzaName",
      "selectedSauce",
      "selectedDough",
      "selectedSize",
    ]),

    ...mapGetters("builder", [
      "hasPizzaName",
      "hasIngredients",
      "selectedIngredients",
      "builderPrice",
    ]),
    ...mapGetters("auth", ["id", "phone"]),
  },

  methods: {
    addPizzaToCart() {
      const pizza = {
        id: uniqueId(),
        name: this.pizzaName,
        sauceId: this.selectedSauce,
        doughId: this.selectedDough,
        sizeId: this.selectedSize,
        quantity: 1,
        ingredients: this.selectedIngredients,
        price: this.builderPrice,
        basePrice: this.builderPrice,
      };

      this.addProductToCart(pizza);

      this[SET_ENTITY](
        { module: "cart", entity: "totalPrice", value: this.builderPrice },
        { root: true }
      );
    },

    setPizzaName(name) {
      this[SET_ENTITY](
        { module: "builder", entity: "pizzaName", value: name },
        { root: true }
      );
    },

    ...mapMutations([SET_ENTITY, ADD_ENTITY]),
    ...mapActions("cart", ["addProductToCart"]),
  },
};
</script>
