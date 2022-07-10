<template>
  <ul class="order__additional">
    <li v-for="{ id, name, image, price, count } in misc" :key="id">
      <img
        :src="normalizeImagePath(image)"
        width="20"
        height="30"
        :alt="name"
      />
      <p>
        <span>{{ name }}</span>
        <b>{{ displayItemPrice(count, price) }}</b>
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
      default: () => {},
    },
  },
  methods: {
    normalizeImagePath,
    displayItemPrice,
  },
};
</script>
