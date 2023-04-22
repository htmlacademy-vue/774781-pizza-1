<template>
  <ul class="order__list">
    <li
      v-for="pizza in pizzas"
      :key="pizza.name"
      class="order__item"
    >
      <ProductItem
        class="cart-list__product"
        :product="pizza"
      />
      <p class="order__price">
        {{ displayItemPrice(pizza.quantity, pizza.price) }}
      </p>
    </li>
  </ul>
</template>

<script>
import { displayItemPrice } from "../../../common/utils";
import ProductItem from "../../../common/components/ProductItem.vue";

export default {
  name: "OrderPizzas",
  components: {
    ProductItem,
  },
  props: {
    pizzas: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    displayItemPrice,
  },
};
</script>
