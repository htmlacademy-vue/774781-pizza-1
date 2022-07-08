<template>
  <section class="footer">
    <div class="footer__more">
      <AppButton tag="a" border arrow @click="toIndexPage()">
        Хочу еще одну
      </AppButton>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ totalPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <AppButton
        type="button"
        :disabled="unavailableCreateOrder"
        @click="createOrder()"
      >
        Оформить заказ
      </AppButton>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "AppLayoutFooter",

  computed: {
    ...mapState("cart", ["phone", "products", "currentMisc"]),
    ...mapGetters("cart", ["totalPrice", "hasPhone"]),
    ...mapGetters("auth", ["isGuest", "userPhone", "userId"]),
    unavailableCreateOrder() {
      return !this.hasPhone;
    },
  },

  methods: {
    toIndexPage() {
      this.$router.push("/");
    },
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
        mics: miscModel,
      };

      this.postOrder(order);
      this.$router.push("/success");
    },
    ...mapActions("orders", ["postOrder"]),
  },
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}
</style>
