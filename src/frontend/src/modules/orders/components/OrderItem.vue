<template>
  <section class="sheet order">
    <OrderHeader
      :id="id"
      :price="price"
      @delete="$emit('delete', $event)"
      @repeat="$emit('repeat', $event)"
    />
    <OrderPizzas :pizzas="pizzas" />
    <OrderMisc
      v-if="misc"
      :misc="misc"
    />
    <OrderAddress
      v-if="addressId"
      :id="addressId"
    />
  </section>
</template>

<script>
import OrderHeader from "./OrderHeader.vue";
import OrderMisc from "./OrderMisc.vue";
import OrderPizzas from "./OrderPizzas.vue";
import OrderAddress from "./OrderAddress.vue";

export default {
  name: "OrderItem",
  components: {
    OrderHeader,
    OrderPizzas,
    OrderMisc,
    OrderAddress,
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    pizzas: {
      type: Array,
      required: true,
      default: () => [],
    },
    misc: {
      type: Array,
      required: true,
      default: () => [],
    },
    addressId: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.order {
  margin-bottom: 32px;
  padding-top: 0;
}
</style>
