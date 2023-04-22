<template>
  <AppDrop @drop="$emit('add-ingredient', $event)">
    <div
      class="pizza"
      :class="classModifier"
    >
      <transition-group
        tag="div"
        class="pizza__wrapper"
        enter-active-class="zoom-in"
        leave-active-class="zoom-out"
      >
        <div
          v-for="{ id, quantity, modifier } in ingredients"
          :key="id"
          class="pizza__filling"
          :class="getIngredientsClasses(quantity, modifier)"
        />
      </transition-group>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from '../../../common/components/AppDrop.vue';

export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop
  },
  props: {
    ingredients: {
      type: Array,
      required: true,
      default: () => []
    },
    sauce: {
      type: String,
      required: true,
    },
    dough: {
      type: String,
      required: true,
    },
  },
  computed: {
    classModifier() {
      return `pizza--foundation--${this.dough}-${this.sauce}`;
    },
  },
  methods: {
    getIngredientsClasses(quantity, modifier) {
      return [
        `pizza__filling--${modifier}`,
        quantity && `pizza__filling--${quantity}`,
      ];
    },
  },
};
</script>

<style lang="scss" src="../../../assets/scss/blocks/pizza.scss" scoped></style>
