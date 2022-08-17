<template>
  <AppDrop @drop="addIngredient($event)">
    <div
      class="pizza"
      :class="classModifier"
    >
      <transition-group
        tag="div"
        class="pizza__wrapper"
        enter-active-class="animate__animated animate__zoomIn animate__faster"
        leave-active-class="animate__animated animate__zoomOut animate__faster"
      >
        <div
          v-for="{ id, quantity, modifier } in pizzaViewIngredients"
          :key="id"
          class="pizza__filling"
          :class="getIngredientsClasses(quantity, modifier)"
        />
      </transition-group>
    </div>
  </AppDrop>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { CHANGE_INGREDIENT_QUANTITY } from "@/store/mutation-types";

export default {
  name: "BuilderPizzaView",

  computed: {
    classModifier() {
      return `pizza--foundation--${this.doughSize}-${this.sauseName}`;
    },

    ...mapGetters("builder", ["sauseName", "doughSize", "pizzaViewIngredients"]),
  },

  methods: {
    addIngredient({ id, quantity }) {
      this[CHANGE_INGREDIENT_QUANTITY]({
        id,
        quantity: quantity + 1,
      });
    },

    getIngredientsClasses(quantity, modifier) {
      return [
        `pizza__filling--${modifier}`,
        quantity && `pizza__filling--${quantity}`,
      ];
    },

    ...mapMutations("builder", [CHANGE_INGREDIENT_QUANTITY]),
  },
};
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
