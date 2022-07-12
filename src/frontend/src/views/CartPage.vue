<template>
  <form method="post" @submit.prevent="createOrder()" class="layout-form">
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
  methods: {
    async createOrder() {
      const pizzas = this.products.map(
        ({ doughId, name, sauceId, sizeId, quantity, ingredients }) => {
          const ingredientsModel = Object.entries(ingredients).map(
            (ingredient) => ({
              ingredientId: ingredient[0],
              quantity: ingredient[1],
            })
          );

          return {
            name,
            sauceId,
            doughId,
            sizeId,
            quantity,
            ingredients: ingredientsModel,
          };
        }
      );

      const miscModel = Object.entries(this.currentMisc).map((miscItem) => ({
        miscId: miscItem[0],
        quantity: miscItem[1],
      }));

      const order = {
        userId: this.userId,
        phone: this.isGuest ? this.phone : this.userPhone,
        address: {
          street: "string",
          building: "string",
          flat: "string",
          comment: "string",
        },
        pizzas,
        misc: miscModel,
      };

      await this.postOrder(order);
      await this.fetchOrders();
      this.$router.push("/success");
      this[RESET_CART]();
    },
  }
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
