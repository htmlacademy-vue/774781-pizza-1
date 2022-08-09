<template>
  <section class="sheet order">
    <OrderHeader
      :order-id="order.id"
      :order-price="order.price"
    />
    <OrderPizzas :pizzas="order.pizzas" />
    <OrderMisc
      v-if="order.misc"
      :misc="order.misc"
    />
    <OrderAddress
      v-if="order.addressId"
      :id="order.addressId"
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
    order: {
      type: Object,
      required: true,
      default: () => ({}),
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
