<template>
  <div>
    <div class="layout__title">
      <AppTitle big>
        История заказов
      </AppTitle>
    </div>

    <OrderItem
      v-for="order in orders"
      :id="order.id"
      :key="order.id"
      :address-id="order.addressId"
      :misc="order.misc"
      :pizzas="order.pizzas"
      :price="order.price"
      @delete="deleteOrder($event)"
      @repeat="repeatOrder($event)"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { OrderItem } from "@/modules/orders/components";
import { REPEAT_ORDER } from "@/store/mutation-types";

export default {
  name: "OrdersPage",
  components: {
    OrderItem,
  },
  computed: {
    ...mapState("orders", ["orders"]),
  },
  methods: {
    repeatOrder(id) {
      this[REPEAT_ORDER](id);
      this.$router.push("/cart");
    },
    ...mapMutations([REPEAT_ORDER]),
    ...mapActions("orders", ["deleteOrder"]),
  },
};
</script>
