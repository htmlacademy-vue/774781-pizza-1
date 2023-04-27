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
        <li>{{ sizeNames[product.sizeId] }}, {{ doughNames[product.doughId] }}</li>
        <li>Соус: {{ sauceNames[product.sauceId].toLowerCase() }}</li>
        <li>Начинка: {{ ingredientNames }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { onDough } from '../enums/dough';
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
    sizeNames() {
      return sizeNames;
    },
    sauceNames() {
      return sauceNames;
    },
    doughNames() {
      return onDough;
    }
  },
};
</script>

<style lang="scss" src="../../assets/scss/blocks/product.scss" scoped></style>
