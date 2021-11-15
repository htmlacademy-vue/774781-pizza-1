<template>
  <div
    class="pizza"
    :class="mainClass"
  >
    <div class="pizza__wrapper">
      <div
        v-for="(value, key) in ingredients"
        :key="value"
        class="pizza__filling"
        :class="ingredientsClass(value, key)"
      />
    </div>
  </div>
</template>

<script>
import {
  DOUGH_LIGHT_VALUE,
  DOUGH_LARGE_VALUE,
  SAUCE_TOMATO_VALUE,
  SAUCE_CREAMY_VALUE,
} from '@/common/const.js';

export default {
  name: 'BuilderPizzaView',

  props: {
    dough: {
      type: String,
      required: true,
    },

    sauce: {
      type: String,
      required: true,
    },

    ingredients: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    doughLight() {
      return this.dough === DOUGH_LIGHT_VALUE;
    },

    doughLarge() {
      return this.dough === DOUGH_LARGE_VALUE;
    },

    sauceTomato() {
      return this.sauce === SAUCE_TOMATO_VALUE;
    },

    sauceCreamy() {
      return this.sauce === SAUCE_CREAMY_VALUE;
    },

    mainClass() {
      return {
        'pizza--foundation--big-creamy': this.doughLarge && this.sauceCreamy,
        'pizza--foundation--big-tomato': this.doughLarge && this.sauceTomato,
        'pizza--foundation--small-creamy': this.doughLight && this.sauceCreamy,
        'pizza--foundation--small-tomato': this.doughLight && this.sauceTomato,
      }
    },
  },

  methods: {
    ingredientsClass(count, name) {
      return [
        `pizza__filling--${name}`,
        { 'pizza__filling--second': count === 2 },
        { 'pizza__filling--third': count === 3 },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--big-creamy {
    background-image: url("~@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--big-tomato {
    background-image: url("~@/assets/img/foundation/big-tomato.svg");
  }

  &--foundation--small-creamy {
    background-image: url("~@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--small-tomato {
    background-image: url("~@/assets/img/foundation/small-tomato.svg");
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--second {
    transform: rotate(45deg);
  }

  &--third {
    transform: rotate(-45deg);
  }

  &--ananas {
    background-image: url("~@/assets/img/filling-big/ananas.svg");
  }

  &--bacon {
    background-image: url("~@/assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese {
    background-image: url("~@/assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar {
    background-image: url("~@/assets/img/filling-big/cheddar.svg");
  }

  &--chile {
    background-image: url("~@/assets/img/filling-big/chile.svg");
  }

  &--ham {
    background-image: url("~@/assets/img/filling-big/ham.svg");
  }

  &--jalapeno {
    background-image: url("~@/assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella {
    background-image: url("~@/assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms {
    background-image: url("~@/assets/img/filling-big/mushrooms.svg");
  }

  &--olives {
    background-image: url("~@/assets/img/filling-big/olives.svg");
  }

  &--onion {
    background-image: url("~@/assets/img/filling-big/onion.svg");
  }

  &--parmesan {
    background-image: url("~@/assets/img/filling-big/parmesan.svg");
  }

  &--salami {
    background-image: url("~@/assets/img/filling-big/salami.svg");
  }

  &--salmon {
    background-image: url("~@/assets/img/filling-big/salmon.svg");
  }

  &--tomatoes {
    background-image: url("~@/assets/img/filling-big/tomatoes.svg");
  }
}
</style>
