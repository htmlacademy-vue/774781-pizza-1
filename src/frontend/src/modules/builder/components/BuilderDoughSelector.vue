<template>
  <div class="sheet">
    <AppTitle :level="2" size="small" class="sheet__title">
      Выберите тесто
    </AppTitle>

    <div class="sheet__content dough">
      <label
        v-for="{ id, name, description, value, price } in dough"
        :key="id"
        class="dough__input"
        :class="`dough__input--${value}`"
      >
        <input
          type="radio"
          name="dought"
          class="visually-hidden"
          :value="value"
          :checked="value === selectedDough"
          @change="updateDough(value, price)"
        />
        <b>{{ name }}</b>
        <span>{{ description }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { SELECT_DOUGH, UPDATE_DOUGH_PRICE } from "@/store/mutations-types";

export default {
  name: "BuilderDoughSelector",

  computed: {
    ...mapState("builder", ["selectedDough"]),
    ...mapGetters("builder", ["dough"]),
  },

  methods: {
    updateDough(value, price) {
      this.$emit("selectDough", value);
      this.$emit("updateDoughPrice", price);
    },

    ...mapMutations("builder", {
      selectDough: SELECT_DOUGH,
      updateDoughPrice: UPDATE_DOUGH_PRICE,
    }),
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
