<template>
  <component
    :is="tag"
    :type="type"
    class="button"
    :disabled="disabled"
    :class="classes"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: "AppButton",
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: "button",
    },
    type: {
      type: String,
      default: null,
    },
    border: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    white: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        "button--border": this.border,
        "button--arrow": this.arrow,
        "button--transparent": this.transparent,
        "button--white": this.white,
      };
    },
  },
};
</script>

<style lang="scss" src="../../assets/scss/blocks/button.scss"></style>
