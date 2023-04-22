<template>
  <div class="product">
    <img
      src="../../assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="product.name"
    >
    <div class="product__text">
      <h2>{{ product.name }}</h2>
      <ul>
        <li>
          {{ displaySizeName(product.sizeId) }},
          {{ displayDoughTitle(product.doughId) }}
        </li>
        <li>Соус: {{ displaySauceName(product.sauceId) }}</li>
        <li>Начинка: {{ ingredientNames }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { sizeNames } from '../enums/sizesValues';
import { sauceNames } from '../enums/saucesValues';
import { ingredientNames } from '../enums/ingredientModifiers';

export default {
  name: "ProductItem",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ingredientNames() {
      return Object.keys(this.product.ingredients)
        .map((id) => ingredientNames[id])
        .join(", ");
    },
  },
  methods: {
    displayDoughTitle(id) {
      return id === 1 ? "на тонком тесте" : "на толстом тесте";
    },
    displaySizeName(id) {
      return sizeNames[id];
    },
    displaySauceName(id) {
      return sauceNames[id].toLowerCase();
    }
  },
};
</script>

<style lang="scss" src="../../assets/scss/blocks/product.scss" scoped></style>
