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
        <li>{{ product.size.name }}, {{ doughTitle(product.dough.id) }}</li>
        <li>Соус: {{ product.sauce.name.toLowerCase() }}</li>
        <li>Начинка: {{ getIngredientNames(product.ingredients) }}</li>
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
    ...mapGetters("builder", ["getIngredientNames"]),
  },

  methods: {
    doughTitle(doughId) {
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
