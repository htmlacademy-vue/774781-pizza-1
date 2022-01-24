<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите размер</h2>

    <div class="sheet__content diameter">
      <label
        v-for="{ id, value, name, multiplier } in sizes"
        :key="id"
        :class="`diameter__input diameter__input--${value}`"
      >
        <input
          type="radio"
          name="diameter"
          :value="value"
          class="visually-hidden"
          :checked="id === selectedSize"
          @change="updateSize(id, multiplier)"
        />
        <span>{{ name }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { CHANGE_SIZE, SET_ENTITY } from "@/store/mutations-types";

export default {
  name: "BuilderSizeSelector",

  computed: {
    ...mapState("builder", ["selectedSize"]),
    ...mapGetters("builder", ["sizes"]),
  },

  methods: {
    updateSize(id, price) {
      this[CHANGE_SIZE](id);
      this[SET_ENTITY](
        { module: "builder", entity: "sizeMultiplier", value: price },
        { root: true }
      );
    },

    ...mapMutations([SET_ENTITY]),
    ...mapMutations("builder", [CHANGE_SIZE]),
  },
};
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
