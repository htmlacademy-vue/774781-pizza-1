<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">
      Выберите тесто
    </h2>

    <div class="sheet__content dough">
      <label
        class="dough__input"
        :class="`dough__input--${value}`"
        v-for="{ id, name, description, value } in dough"
        :key="id"
      >
        <input
          type="radio"
          name="dought"
          :value="value"
          class="visually-hidden"
          checked
        >
        <b>{{ name }}</b>
        <span>{{ description }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuilderDoughSelector',
  props: {
    dough: {
      type: Array,
      required: true,
    },
  },
}
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
