<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #11199929</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ calcOrderPrice() }} ₽</span>
      </div>

      <div class="order__button">
        <AppButton border type="button">Удалить</AppButton>
      </div>
      <div class="order__button">
        <AppButton type="button">Повторить</AppButton>
      </div>
    </div>

    <ul class="order__list">
      <li v-for="pizza in order.pizzas" :key="pizza.name" class="order__item">
        <ProductItem class="cart-list__product" :product="pizza" />

        <p class="order__price">{{ displayItemPrice(pizza.quantity, 100) }}</p>
      </li>
    </ul>

    <OrderMisc :misc="orderMisc" />

    <p class="order__address">
      Адрес доставки: Тест (или если адрес новый - писать целиком)
    </p>
  </section>
</template>

<script>
import uniqueId from "lodash/uniqueId";
import { mapState } from "vuex";
import { displayItemPrice } from "@/common/utils";
import { ProductItem } from "@/common/components";
import OrderMisc from "./OrderMisc.vue";

export default {
  name: "OrderItem",
  components: {
    ProductItem,
    OrderMisc,
  },
  props: {
    order: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    uniqueId,
    orderMisc() {
      const selectedMisc = this.order.misc.reduce(
        (obj, item) => ({ ...obj, [item.miscId]: item.quantity }),
        {}
      );

      return this.misc.map((miscItem) => ({
        ...miscItem,
        count: selectedMisc[miscItem.id],
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
</style>
