<script>
export default {
  name: "AppTitle",

  props: {
    level: {
      type: Number,
      default: 1,
    },

    size: {
      type: String,
      default: null,
      validator: function (value) {
        return ["small", "big"].indexOf(value) !== -1;
      },
    },
  },

  render: function (createElement) {
    return createElement(
      "h" + this.level,
      {
        staticClass: "title",
        class: {
          "title--big": this.size === "big",
          "title--small": this.size === "small",
        },
      },
      this.$slots.default
    );
  },
};
</script>

<style lang="scss">
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
