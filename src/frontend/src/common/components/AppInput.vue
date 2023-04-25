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
      :required="required"
      @input="$emit('input', $event.target.value)"
    >
    <span
      v-if="errors.length"
      class="input__errors"
    >
      <span
        v-for="error in errors"
        :key="error"
        :style="{ color: 'red' }"
      >
        {{ error }}
      </span>
    </span>
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
    required: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style lang="scss" src="../../assets/scss/blocks/input.scss" scoped></style>
