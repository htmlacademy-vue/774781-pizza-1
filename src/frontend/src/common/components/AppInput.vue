<template>
  <label class="input" :class="classModifier">
    <span :class="{ 'visually-hidden': isTitleHidden }"><slot /></span>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
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

    isTitleHidden: {
      type: Boolean,
      default: false,
    },

    bigLabel: {
      type: Boolean,
      default: false,
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
