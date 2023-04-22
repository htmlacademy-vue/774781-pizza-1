<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="isNegative"
      @click="changeCount(-1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      ref="input"
      type="text"
      name="counter"
      class="counter__input"
      :value="counter"
      disabled
    >
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="classes"
      :disabled="isLimit"
      @click="changeCount(1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { counterLimit } from "../../common/const.js";

export default {
  name: "ItemCounter",
  props: {
    counter: {
      type: [Number, String],
      required: true,
      default: 0,
    },
    orange: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isNegative() {
      return this.counter <= counterLimit.MIN;
    },
    isLimit() {
      return this.counter >= counterLimit.MAX;
    },
    classes() {
      return { "counter__button--orange": this.orange };
    },
  },
  methods: {
    update(counter) {
      this.$emit("update:counter", counter);
    },
    changeCount(multiplier) {
      if (multiplier > 0) {
        if (this.isLimit) {
          return;
        }

        this.update(this.counter + 1);
      } else {
        if (this.isNegative) {
          return;
        }

        this.update(this.counter - 1);
      }
    },
  },
};
</script>

<style lang="scss" src="../../assets/scss/blocks/counter.scss" scoped></style>
