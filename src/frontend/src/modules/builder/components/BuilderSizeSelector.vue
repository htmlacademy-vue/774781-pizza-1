<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите размер</h2>

    <div class="sheet__content diameter">
      <label
        v-for="{ id, value, name } in sizes"
        :key="id"
        :class="`diameter__input diameter__input--${value}`"
      >
        <input
          type="radio"
          name="diameter"
          :value="value"
          class="visually-hidden"
          :checked="id === sizeId"
          @change="selectSize(id)"
        />
        <span>{{ name }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { SET_PIZZA_ENTITY } from "@/store/mutations-types";

export default {
  name: "BuilderSizeSelector",

  computed: {
    ...mapGetters("builder", ["sizes", "sizeId"]),
  },

  methods: {
    selectSize(id) {
      this[SET_PIZZA_ENTITY]({
        entity: "sizeId",
        value: id,
      });
    },

    ...mapMutations("builder", [SET_PIZZA_ENTITY]),
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
