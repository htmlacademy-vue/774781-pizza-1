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
  SET_ENTITY,
  ADD_ENTITY,
  SET_PIZZA_ENTITY,
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

    ...mapState("cart", ["products"]),
    ...mapState("builder", ["currentPizza"]),
    ...mapGetters("builder", [
      "hasPizzaName",
      "hasIngredients",
      "builderPrice",
      "pizzaName",
      "selectedIngredients",
    ]),
    ...mapGetters("auth", ["id", "phone"]),
  },

  methods: {
    addPizzaToCart() {
      this[SET_PIZZA_ENTITY]({
        entity: "basePrice",
        value: this.builderPrice,
      });

      this[SET_PIZZA_ENTITY]({
        entity: "price",
        value: this.builderPrice,
      });

      this[SET_PIZZA_ENTITY]({
        entity: "ingredients",
        value: this.selectedIngredients,
      });

      this.addProductToCart(this.currentPizza);

      this[SET_ENTITY](
        { module: "cart", entity: "totalPrice", value: this.builderPrice },
        { root: true }
      );
    },

    setPizzaName(name) {
      this[SET_PIZZA_ENTITY]({ entity: "name", value: name });
    },

    ...mapMutations([SET_ENTITY, ADD_ENTITY]),
    ...mapMutations("builder", [SET_PIZZA_ENTITY]),
    ...mapActions("cart", ["addProductToCart"]),
  },
};
</script>
