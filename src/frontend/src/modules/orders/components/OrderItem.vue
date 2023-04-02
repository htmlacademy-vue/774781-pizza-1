<template>
  <section class="sheet order">
    <slot />
  </section>
</template>

<script>
export default {
  name: "OrderItem",
};
</script>

<style lang="scss" scoped>
.order {
  margin-bottom: 32px;
  padding-top: 0;
}
</style>
