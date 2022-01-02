<template>
  <div>
    <AppLayoutHeader />
    <slot />
  </div>
</template>

<script>
import { layoutName } from "@/common/const.js";

export default {
  name: layoutName.DEFAULT,
};
</script>
