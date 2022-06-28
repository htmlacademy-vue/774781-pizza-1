<template>
  <section class="footer">
    <div class="footer__more">
      <AppButton tag="a" border arrow @click="toIndexPage()">
        Хочу еще одну</AppButton
      >
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ totalPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <AppButton type="button" @click="checkout()">Оформить заказ</AppButton>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { SAVE_ORDER } from "@/store/mutations-types";

export default {
  name: "AppLayoutFooter",

  computed: {
    ...mapGetters("cart", ["totalPrice", "products", "selectedMisc"]),
    ...mapGetters("auth", ["userId", "userPhone"]),
  },

  methods: {
    toIndexPage() {
      this.$router.push("/");
    },
    checkout() {
      const order = {
        userId: this.userId,
        phone: this.userPhone,
        address: {
          street: "string",
          building: "string",
          flat: "string",
          comment: "string",
        },
        pizzas: this.products,
        misc: this.selectedMisc,
      };

      this[SAVE_ORDER](order);
      this.$router.push("/success");
    },
    ...mapMutations("orders", [SAVE_ORDER]),
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
