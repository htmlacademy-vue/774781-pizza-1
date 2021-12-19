<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <AppTitle size="big">Корзина</AppTitle>
        </div>

        <!-- <div class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div> -->

        <CartList />

        <div class="cart__additional">
          <CartAdditionalList />
        </div>

        <div class="cart__form">
          <CartForm />
        </div>
      </div>
    </main>
    <AppLayoutFooter />
  </form>
</template>

<script>
import {
  CartList,
  CartAdditionalList,
  CartForm,
} from "@/modules/cart/components";

export default {
  name: "Cart",

  components: {
    CartList,
    CartAdditionalList,
    CartForm,
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
