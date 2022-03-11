<template>
  <AppDrop @drop="addIngredient($event)">
    <div class="pizza" :class="classModifier">
      <div class="pizza__wrapper">
        <div
          v-for="{ id, modifier, quantity } in ingredients"
          :key="modifier"
          class="pizza__filling"
          :class="updateIngredientsClass(quantity, modifier)"
        />
      </div>
    </div>
  </AppDrop>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  ADD_INGREDIENT_QUANTITY,
  ADD_INGREDIENTS_IN_PIZZA,
} from "@/store/mutations-types";

export default {
  name: "BuilderPizzaView",

  computed: {
    classModifier() {
      return `pizza--foundation--${this.doughSize}-${this.sauseName}`;
    },

    ...mapGetters("builder", ["ingredients", "sauseName", "doughSize"]),
  },

  methods: {
    addIngredient(id) {
      this[ADD_INGREDIENT_QUANTITY](id);
      // здесь ошибка
      this[ADD_INGREDIENTS_IN_PIZZA]({ id, quantity: 3 });
    },

    updateIngredientsClass(quantity, modifier) {
      return [
        { [`pizza__filling--${modifier}`]: quantity > 0 },
        { "pizza__filling--second": quantity === 2 },
        { "pizza__filling--third": quantity === 3 },
      ];
    },

    ...mapMutations("builder", [
      ADD_INGREDIENT_QUANTITY,
      ADD_INGREDIENTS_IN_PIZZA,
    ]),
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
