<template>
  <div class="sheet">
    <AppTitle
      :level="2"
      small
      class="sheet__title"
    >
      Выберите ингредиенты
    </AppTitle>

    <div class="sheet__content">
      <slot name="sauce-selector" />
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderIngredientsSection",
};
</script>
