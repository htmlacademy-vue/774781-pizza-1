<script>
export default {
  name: "AppTitle",
  props: {
    level: {
      type: Number,
      default: 1,
    },
    small: {
      type: Boolean,
      default: false,
    },
    big: {
      type: Boolean,
      default: false,
    },
  },
  render: function (createElement) {
    return createElement(
      "h" + this.level,
      {
        staticClass: "title",
        class: {
          "title--big": this.big,
          "title--small": this.small,
        },
      },
      this.$slots.default
    );
  },
};
</script>

<style lang="scss" scoped>
.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }

  &--small {
    @include b-s18-h21;
  }
}
</style>
