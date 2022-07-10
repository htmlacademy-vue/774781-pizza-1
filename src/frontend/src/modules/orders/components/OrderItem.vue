<template>
  <section class="sheet order">
    <OrderHeader :orderId="order.id" />
    <OrderPizzas :pizzas="order.pizzas" />
    <OrderMisc :misc="orderMisc" />
    <OrderAddress />
  </section>
</template>

<script>
import { mapState } from "vuex";
import { displayItemPrice } from "@/common/utils";
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
      default: () => {},
    },
  },
  computed: {
    orderMisc() {
      const selectedMisc = this.order.misc.reduce(
        (obj, item) => ({ ...obj, [item.miscId]: item.quantity }),
        {}
      );

      return this.misc.map((miscItem) => ({
        ...miscItem,
        quantity: selectedMisc[miscItem.id],
      }));
    },
    ...mapState("orders", ["orders"]),
    ...mapState("cart", ["misc"]),
  },
  methods: {
    displayItemPrice,
    calcOrderPrice() {
      return 100;
    },
  },
};
</script>

<style lang="scss">
.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

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

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}
.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}
</style>
