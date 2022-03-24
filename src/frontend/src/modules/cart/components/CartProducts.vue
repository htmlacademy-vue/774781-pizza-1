<template>
  <ul class="cart-list sheet">
    <li class="cart-list__item" v-for="product in products" :key="product.id">
      <ProductItem class="cart-list__product" :product="product" />
      <ItemCounter
        class="cart-list__counter"
        theme="orange"
        :counter="product.quantity"
        @update:counter="
          updateProductQuantity($event, product.id, product.basePrice)
        "
      />

      <div class="cart-list__price">
        <b>{{ product.price }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          @click="changeSelectedPizza(product.id)"
          type="button"
          class="cart-list__edit"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { ItemCounter, ProductItem } from "@/common/components";
import {
  CHANGE_PRODUCT_QUANTITY,
  UPDATE_PRODUCT_PRICE,
  EDIT_PIZZA,
} from "@/store/mutations-types";

export default {
  name: "CartProducts",

  components: {
    ProductItem,
    ItemCounter,
  },

  computed: {
    ...mapState("cart", ["products"]),
  },

  methods: {
    updateProductQuantity(quantity, id, basePrice) {
      this[CHANGE_PRODUCT_QUANTITY]({ quantity, id });
      this[UPDATE_PRODUCT_PRICE]({ quantity, id, basePrice });
    },
    changeSelectedPizza(id) {
      this[EDIT_PIZZA](id);
      this.$router.push("/");
    },
    ...mapMutations("cart", [CHANGE_PRODUCT_QUANTITY, UPDATE_PRODUCT_PRICE]),
    ...mapMutations([EDIT_PIZZA]),
  },
};
</script>

<style lang="scss">
.cart-list {
  @include clear-list;

  padding: 15px 0;
}

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}
</style>
