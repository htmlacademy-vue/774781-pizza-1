<script>
export default {
  name: 'BaseTitle',
  render: function(createElement){
    return createElement(
      'h' + this.level,
      {
        staticClass: 'title',
        class: {
          'title--big': true,
          'title--small': this.size === 'small',
        },
      },
      this.$slots.default,
    );
  },
  props: {
    level: {
      type: Number,
      default: 1
    },
    size: {
      type: String,
      default: null,
    }
  },
};
</script>
