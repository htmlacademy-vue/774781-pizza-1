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
import { normalizeImagePath } from "@/common/utils";
import { ItemCounter } from "@/common/components";

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

<style lang="scss" scoped>
.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}
</style>
