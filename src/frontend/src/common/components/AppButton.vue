<template>
  <component
    :is="tag"
    :type="buttonType"
    class="button"
    :class="classes"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    tag: {
      type: String,
      default: "button",
    },
    type: {
      type: String,
      default: null,
    },
    bordered: {
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
  },
  computed: {
    buttonType() {
      if (this.tag !== 'button') {
        return;
      }

      if (this.type === null) {
        return 'submit';
      }

      return this.type;
    },
    classes() {
      return {
        "button--border": this.bordered,
        "button--arrow": this.arrow,
        "button--transparent": this.transparent,
      };
    },
  },
};
</script>

<style lang="scss" src="../../assets/scss/blocks/button.scss"></style>
