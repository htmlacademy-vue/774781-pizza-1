<template>
  <label class="input">
    <span :class="{ 'visually-hidden': isTitleHidden }">{{ title }}</span>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
    >
  </label>
</template>

<script>
export default {
  name: 'BaseInput',

  props: {
    type: {
      type: String,
      default: 'text',
    },

    title: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    placeholder: {
      type: String,
      default: null,
    },

    isTitleHidden: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}
</style>
