<template>
  <ul class="order__additional">
    <li
      v-for="{ id, name, image, price, quantity } in misc"
      :key="id"
    >
      <img
        :src="normalizeImagePath(image)"
        width="20"
        height="30"
        :alt="name"
      >
      <p>
        <span>{{ name }}</span>
        <b>{{ displayItemPrice(quantity, price) }}</b>
      </p>
    </li>
  </ul>
</template>

<script>
import { normalizeImagePath, displayItemPrice } from "@/common/utils";

export default {
  name: "OrderMisc",
  props: {
    misc: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  methods: {
    normalizeImagePath,
    displayItemPrice,
  },
};
</script>

<style lang="scss" scoped>
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
</style>
