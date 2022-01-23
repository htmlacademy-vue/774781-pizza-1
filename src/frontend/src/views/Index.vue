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
            @input="UPDATE_PIZZA_NAME($event)"
            >Название пиццы</AppInput
          >

          <div class="content__constructor">
            <BuilderPizzaView />
          </div>

          <div class="content__result">
            <BuilderPriceCounter />
            <AppButton
              @click="createOrder()"
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
  UPDATE_PIZZA_NAME,
  ADD_PIZZA,
  UPDATE_TOTAL_PRICE,
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

  computed: {
    availableAddOrderToCart() {
      return this.hasPizzaName && this.hasIngredients;
    },

    ...mapState(["pizzas"]),
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
      "currentPrice",
    ]),
    ...mapGetters("auth", ["id"]),
  },

  methods: {
    createOrder() {
      this[ADD_PIZZA]({
        name: this.pizzaName,
        sauceId: this.selectedSauce,
        doughId: this.selectedDough,
        sizeId: this.selectedSize,
        quantity: 0,
        ingredients: this.selectedIngredients,
        price: this.currentPrice,
      });

      const order = {
        userId: this.id,
        phone: this.phone,
        address: {
          street: "street",
          building: "building",
          flat: "flat",
          comment: "comment",
        },
        pizzas: this.pizzas,
        misc: [
          {
            miscId: 0,
            quantity: 0,
          },
        ],
      };

      this.addProductToCart(order);
      this[UPDATE_TOTAL_PRICE](this.currentPrice);
    },

    ...mapMutations([ADD_PIZZA]),
    ...mapMutations("builder", [UPDATE_PIZZA_NAME]),
    ...mapMutations("cart", [UPDATE_TOTAL_PRICE]),

    ...mapActions("cart", ["addProductToCart"]),
  },
};
</script>
