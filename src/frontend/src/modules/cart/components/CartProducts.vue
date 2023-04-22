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

<style lang="scss" src="../../../assets/scss/blocks/cart-list.scss" scoped></style>
