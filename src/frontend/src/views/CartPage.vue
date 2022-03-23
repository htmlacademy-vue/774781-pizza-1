<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <AppTitle size="big">Корзина</AppTitle>
        </div>

        <div v-if="!hasProducts" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-else>
          <CartList />

          <div class="cart__additional">
            <CartAdditionalList />
          </div>

          <div class="cart__form">
            <CartForm />
          </div>
        </template>
      </div>
    </main>
    <AppLayoutFooter v-if="hasProducts" />
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import {
  CartList,
  CartAdditionalList,
  CartForm,
} from "@/modules/cart/components";

export default {
  name: "CartPage",

  components: {
    CartList,
    CartAdditionalList,
    CartForm,
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
