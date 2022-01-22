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
    availableAddOrderToCart() {
      return this.hasPizzaName && this.hasIngredients;
    },

    ...mapState("builder", ["pizzaName"]),
    ...mapGetters("builder", ["hasPizzaName", "hasIngredients"]),
    ...mapGetters("auth", ["id"]),
  },

  methods: {
    createOrder() {
      const order = {
        userId: this.id,
        phone: this.phone,
        address: {
          street: "string",
          building: "string",
          flat: "string",
          comment: "string",
        },
        pizzas: [],
        misc: [
          {
            miscId: 0,
            quantity: 0,
          },
        ],
      };

      this.addProductToCart(order);
    },

    ...mapMutations("builder", [UPDATE_PIZZA_NAME]),
    ...mapActions("cart", ["addProductToCart"]),
  },
};
</script>
