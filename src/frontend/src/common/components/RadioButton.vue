<template>
  <label class="radio">
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      @change="$emit('change', value)"
    >
    <span>{{ title }}</span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" src="../../assets/scss/blocks/radio.scss" scoped></style>
