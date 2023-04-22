<template>
  <div
    v-if="sizes.length"
    class="sheet"
  >
    <h2 class="title title--small sheet__title">
      Выберите размер
    </h2>

    <div class="sheet__content diameter">
      <label
        v-for="{ id, value, name } in sizes"
        :key="id"
        :class="`diameter__input diameter__input--${value}`"
      >
        <input
          type="radio"
          name="diameter"
          :value="value"
          class="visually-hidden"
          :checked="id === selected"
          @change="$emit('select', id)"
        >
        <span>{{ name }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderSizeSelector",
  props: {
    sizes: {
      type: Array,
      required: true,
      default: () => [],
    },
    selected: {
      type: Number,
      required: true,
    }
  }
};
</script>

<style lang="scss" src="../../../assets/scss/blocks/diameter.scss" scoped></style>
