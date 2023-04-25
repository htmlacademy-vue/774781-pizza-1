<template>
  <label
    class="input"
    :class="{ 'input--big-label': largeTitle }"
  >
    <span :class="{ 'visually-hidden': visuallyHidden }">
      <slot />
    </span>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    >
    <template v-if="errors.length">
      <span
        v-for="error in errors"
        :key="error"
        :style="{ color: 'red' }"
      >
        {{ error }}
      </span>
    </template>
  </label>
</template>

<script>
export default {
  name: "AppInput",
  props: {
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
      default: "name",
    },
    placeholder: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    visuallyHidden: {
      type: Boolean,
      default: false,
    },
    largeTitle: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" src="../../assets/scss/blocks/input.scss" scoped></style>
