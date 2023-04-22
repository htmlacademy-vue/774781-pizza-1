<template>
  <span :class="`filling filling--${modifier}`">{{ name }}</span>
</template>

<script>
export default {
  name: "BuilderIngredientsFilling",
  props: {
    name: {
      type: String,
      required: true,
    },
    modifier: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="../../../../assets/scss/blocks/filling.scss" scoped></style>
