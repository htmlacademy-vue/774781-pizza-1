<template>
  <div>
    <AppHeader />
    <Index
      :dough="dough"
      :ingredients="ingredients"
      :sauces="sauces"
      :sizes="sizes"
    />
  </div>
</template>

<script>
import AppHeader from '@/layouts/AppHeader.vue';
import Index from '@/views/Index.vue';

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    Index,
  },
  props: {
    dough: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
  },
}
</script>
