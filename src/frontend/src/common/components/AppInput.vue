<template>
  <label
    class="input"
    :class="classModifier"
  >
    <span :class="{ 'visually-hidden': visuallyHidden }"><slot /></span>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    >
    <p
      v-for="error in errors"
      :key="error"
      :style="{ color: 'red' }"
    >
      {{ error }}
    </p>
  </label>
</template>

<script>
export default {
  name: "AppInput",
  props: {
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    visuallyHidden: {
      type: Boolean,
      default: false,
    },
    bigLabel: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    classModifier() {
      return {
        "input--big-label": this.bigLabel,
      };
    },
  },
};
</script>

<style lang="scss" src="../../assets/scss/blocks/input.scss" scoped></style>
