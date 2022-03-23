<template>
  <div class="product">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="product.name"
    />
    <div class="product__text">
      <h2>{{ product.name }}</h2>
      <ul>
        <li>
          {{ sizesNameEnum[product.sizeId] }},
          {{ displayDoughTitle(product.doughId) }}
        </li>
        <li>Соус: {{ sausesNameEnum[product.sauceId].toLowerCase() }}</li>
        <li>Начинка: {{ displayIngredients(product.ingredients) }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProductItem",

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters("builder", [
      "getIngredientNames",
      "sizesNameEnum",
      "sausesNameEnum",
      "ingredientsNameEnum",
    ]),
  },

  methods: {
    displayIngredients(ingredients) {
      return ingredients
        .map((ingredient) => this.ingredientsNameEnum[ingredient.id])
        .join(", ");
    },
    displayDoughTitle(doughId) {
      return doughId === 1 ? "на тонком тесте" : "на толстом тесте";
    },
  },
};
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
