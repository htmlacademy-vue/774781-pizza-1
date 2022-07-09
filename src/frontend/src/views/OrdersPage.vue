<template>
  <main class="layout">
    <AppSidebar />

    <div class="layout__content">
      <div class="layout__title">
        <AppTitle big>История заказов</AppTitle>
      </div>

      <section v-for="{ id, pizzas } in orders" :key="id" class="sheet order">
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #11199929</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: {{ calcTotalPrice() }} ₽</span>
          </div>

          <div class="order__button">
            <button type="button" class="button button--border">Удалить</button>
          </div>
          <div class="order__button">
            <button type="button" class="button">Повторить</button>
          </div>
        </div>

        <ul class="order__list">
          <li v-for="pizza in pizzas" :key="pizza.name" class="order__item">
            <ProductItem class="cart-list__product" :product="pizza" />

            <p class="order__price">782 ₽</p>
          </li>
        </ul>

        <ul class="order__additional">
          <li v-for="{ id, name, image, price } in misc" :key="id">
            <img
              :src="normalizeImagePath(image)"
              width="20"
              height="30"
              :alt="name"
            />
            <p>
              <span>{{ name }}</span>
              <b>{{ price }} ₽</b>
            </p>
          </li>
        </ul>

        <p class="order__address">
          Адрес доставки: Тест (или если адрес новый - писать целиком)
        </p>
      </section>
    </div>
  </main>
</template>

<script>
import uniqueId from "lodash/uniqueId";
import { mapState, mapGetters } from "vuex";
import { normalizeImagePath } from "@/common/utils";
import { ProductItem } from "@/common/components";
import AppSidebar from "@/layouts/AppSidebar.vue";

export default {
  name: "OrdersPage",
  components: {
    AppSidebar,
    ProductItem,
  },
  computed: {
    pizzas() {
      return this.order.pizzas;
    },
    uniqueId,
    ...mapState("cart", ["misc"]),
    ...mapState("orders", ["orders"]),
    ...mapGetters("cart", ["totalPrice"]),
  },
  methods: {
    calcTotalPrice() {
      return 100;
    },
    normalizeImagePath,
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

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}
</style>
