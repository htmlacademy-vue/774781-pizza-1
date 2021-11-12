<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">
      Выберите размер
    </h2>

    <div class="sheet__content diameter">
      <label class="diameter__input diameter__input--small">
        <input
          type="radio"
          name="diameter"
          value="small"
          class="visually-hidden"
        >
        <span>23 см</span>
      </label>
      <label class="diameter__input diameter__input--normal">
        <input
          type="radio"
          name="diameter"
          value="normal"
          class="visually-hidden"
          checked
        >
        <span>32 см</span>
      </label>
      <label class="diameter__input diameter__input--big">
        <input
          type="radio"
          name="diameter"
          value="big"
          class="visually-hidden"
        >
        <span>45 см</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuilderSizeSelector'
}
</script>

<style lang="scss" scoped>
.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include p_center_v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: $green-100;
      background-image: url("~@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
