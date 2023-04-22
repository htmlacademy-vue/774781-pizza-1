<template>
  <ul class="additional-list">
    <li
      v-for="{ id, name, image, price } in misc"
      :key="id"
      class="additional-list__item sheet"
    >
      <p class="additional-list__description">
        <img
          :src="normalizeImagePath(image)"
          width="39"
          height="60"
          :alt="name"
        >
        <span>{{ name }}</span>
      </p>

      <div class="additional-list__wrapper">
        <ItemCounter
          :counter="current[id]"
          class="additional-list__counter"
          orange
          @update:counter="$emit('update-quantity', { id, quantity: $event })"
        />

        <div class="additional-list__price">
          <b>× {{ price }} ₽</b>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { normalizeImagePath } from "../../../common/utils";
import ItemCounter from "../../../common/components/ItemCounter.vue";

export default {
  name: "CartMisc",
  components: {
    ItemCounter,
  },
  props: {
    misc: {
      type: Array,
      required: true,
      default: () => [],
    },
    current: {
      type: Object,
      required: true,
      default: () => ({}),
    }
  },
  methods: {
    normalizeImagePath,
  },
};
</script>

<style lang="scss" src="../../../assets/scss/blocks/additional-list.scss" scoped></style>
