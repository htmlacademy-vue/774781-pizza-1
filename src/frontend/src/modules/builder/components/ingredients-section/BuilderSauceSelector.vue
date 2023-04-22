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

<style lang="scss" scoped>
.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
</style>
