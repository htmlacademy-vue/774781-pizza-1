<template>
  <div>
    <div class="layout__title">
      <AppTitle big>
        История заказов
      </AppTitle>
    </div>

    <OrderItem
      v-for="order in orders"
      :key="order.id"
      :order="order"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { OrderItem } from "@/modules/orders/components";

export default {
  name: "OrdersPage",
  components: {
    OrderItem,
  },

  computed: {
    ...mapState("orders", ["orders"]),
  },
};
</script>
