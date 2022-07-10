<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <AppTitle big>Корзина</AppTitle>
        </div>

        <CartEmpty v-if="!hasProducts" />

        <template v-else>
          <CartProducts />

          <div class="cart__additional">
            <CartMisc />
          </div>

          <div class="cart__form">
            <OrderPickupForm />
          </div>
        </template>
      </div>
    </main>
    <CartFooter v-if="hasProducts" />
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import {
  CartProducts,
  CartMisc,
  OrderPickupForm,
  CartFooter,
  CartEmpty,
} from "@/modules/cart/components";

export default {
  name: "CartPage",
  components: {
    CartProducts,
    CartMisc,
    OrderPickupForm,
    CartFooter,
    CartEmpty,
  },
  computed: {
    ...mapGetters("cart", ["hasProducts"]),
  },
};
</script>

<style lang="scss">
.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__empty {
  padding: 20px 30px;
}
</style>
