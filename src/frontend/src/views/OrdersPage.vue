<template>
  <main class="layout">
    <AppSidebar />

    <div class="layout__content">
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
  </main>
</template>

<script>
import { mapState } from "vuex";
import AppSidebar from "@/layouts/AppSidebar.vue";
import { OrderItem } from "@/modules/orders/components";

export default {
  name: "OrdersPage",
  components: {
    AppSidebar,
    OrderItem,
  },
  computed: {
    ...mapState("orders", ["orders"]),
  },
};
</script>
