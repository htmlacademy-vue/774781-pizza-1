<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <RadioButton
      v-for="{ id, name, value } in sauces"
      :key="id"
      :title="name"
      :value="value"
      :checked="id === selected"
      class="ingredients__input"
      name="sauces"
      @change="$emit('select', id)"
    />
  </div>
</template>

<script>
import RadioButton from '../../../../common/components/RadioButton.vue';

export default {
  name: "BuilderSauceSelector",
  components: {
    RadioButton,
  },
  props: {
    sauces: {
      type: Array,
      required: true,
      default: () => [],
    },
    selected: {
      type: Number,
      required: true,
    }
  },
};
</script>
