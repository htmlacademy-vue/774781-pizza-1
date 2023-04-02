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
    >
      <OrderHeader
        :id="order.id"
        :price="order.price"
        @delete="deleteOrder($event)"
        @repeat="repeatOrder($event)"
      />
      <OrderPizzas :pizzas="order.pizzas" />
      <OrderMisc
        v-if="order.misc"
        :misc="order.misc"
      />
      <OrderAddress
        v-if="order.addressId"
        :address="fullAddress"
      />
    </OrderItem>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { REPEAT_ORDER } from "@/store/mutation-types";
import OrderHeader from "@/modules/orders/components/OrderHeader.vue";
import OrderPizzas from "@/modules/orders/components/OrderPizzas.vue";
import OrderMisc from "@/modules/orders/components/OrderMisc.vue";
import OrderAddress from "@/modules/orders/components/OrderAddress.vue";
import OrderItem from "@/modules/orders/components/OrderItem.vue";

export default {
  name: "OrdersPage",
  components: {
    OrderItem,
    OrderHeader,
    OrderPizzas,
    OrderMisc,
    OrderAddress,
  },
  computed: {
    address() {
      return this.addresses.find((address) => address.id === this.id);
    },
    flat() {
      return this.address.flat.length > 0 ? `, кв. ${this.address.flat}` : "";
    },
    fullAddress() {
      return `${this.address.street}, д. ${this.address.building}${this.flat}`;
    },
    ...mapState("orders", ["orders"]),
    ...mapState("address", ["addresses"]),
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
