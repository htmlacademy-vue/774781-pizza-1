<template>
  <div
    v-if="types.length"
    class="sheet"
  >
    <AppTitle
      :level="2"
      small
      class="sheet__title"
    >
      Выберите тесто
    </AppTitle>

    <div class="sheet__content dough">
      <label
        v-for="{ id, name, description, value } in types"
        :key="id"
        class="dough__input"
        :class="`dough__input--${value}`"
      >
        <input
          type="radio"
          name="dought"
          class="visually-hidden"
          :value="value"
          :checked="id === selected"
          @change="$emit('select', id)"
        >
        <b>{{ name }}</b>
        <span>{{ description }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import AppTitle from '../../../common/components/AppTitle.vue';

export default {
  name: "BuilderDoughSelector",
  components: {
    AppTitle,
  },
  props: {
    types: {
      type: Array,
      required: true,
      default: () => [],
    },
    selected: {
      type: Number,
      required: true,
    }
  },
};
</script>

<style lang="scss" src="../../../assets/scss/blocks/dough.scss" scoped></style>
