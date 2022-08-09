<template>
  <p>Итого: {{ builderPrice }} ₽</p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BuilderAmount",
  computed: {
    ...mapGetters("builder", ["builderPrice"]),
  },
};
</script>
