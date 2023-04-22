<template>
  <ul class="cart-list sheet">
    <li
      v-for="product in products"
      :key="product.id"
      class="cart-list__item"
    >
      <ProductItem
        class="cart-list__product"
        :product="product"
      />
      <ItemCounter
        class="cart-list__counter"
        orange
        :counter="product.quantity"
        @update:counter="$emit('update-quantity', { quantity: $event, id: product.id, unitPrice: product.unitPrice })"
      />

      <div class="cart-list__price">
        <b>{{ product.price }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          @click="$emit('edit', product.id)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import ItemCounter from "../../../common/components/ItemCounter.vue";
import ProductItem from "../../../common/components/ProductItem.vue";

export default {
  name: "CartProducts",
  components: {
    ProductItem,
    ItemCounter,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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
