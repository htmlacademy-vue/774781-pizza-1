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
import { mapState } from "vuex";
import { displayItemPrice } from "@/common/utils";
import { ProductItem } from "@/common/components";

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

  computed: {
    ...mapState("orders", ["orders"]),
    ...mapState("cart", ["misc"]),
  },

  methods: {
    displayItemPrice,
  },
};
</script>

<style lang="scss" scoped>
.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}
</style>
