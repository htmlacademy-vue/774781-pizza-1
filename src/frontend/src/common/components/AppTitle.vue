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

<style lang="scss" scr="../../assets/scss/blocks/title.scss" scoped></style>
