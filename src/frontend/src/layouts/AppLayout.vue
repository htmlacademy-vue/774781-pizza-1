<template>
  <div>
    <AppHeader />
    <Index />
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
  }
}
</script>
