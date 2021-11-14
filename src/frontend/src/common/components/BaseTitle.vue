<script>
export default {
  name: 'BaseTitle',
  render: function(createElement){
    return createElement(
      'h' + this.level,
      {
        staticClass: 'title',
        class: {
          'title--big': this.size === 'big',
          'title--small': this.size === 'small',
        },
      },
      this.$slots.default,
    );
  },
  props: {
    level: {
      type: Number,
      default: 1,
    },
    size: {
      type: String,
      default: null,
      validator: function(value) {
        return ['small', 'big'].indexOf(value) !== -1
      },
    },
  },
};
</script>
