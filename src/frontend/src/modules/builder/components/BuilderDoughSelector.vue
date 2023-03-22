<template>
  <div class="sheet">
    <AppTitle
      :level="2"
      small
      class="sheet__title"
    >
      Выберите тесто
    </AppTitle>

    <div class="sheet__content dough">
      <label
        v-for="{ id, name, description, value } in types"
        :key="id"
        class="dough__input"
        :class="`dough__input--${value}`"
      >
        <input
          type="radio"
          name="dought"
          class="visually-hidden"
          :value="value"
          :checked="id === selected"
          @change="$emit('select', id)"
        >
        <b>{{ name }}</b>
        <span>{{ description }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import { AppTitle } from '../../../common/components';

export default {
  name: "BuilderDoughSelector",
  components: {
    AppTitle,
  },
  props: {
    types: {
      type: Array,
      required: true,
      default: () => [],
    },
    selected: {
      type: Number,
      required: true,
    }
  },
};
</script>

<style lang="scss" scoped>
.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
