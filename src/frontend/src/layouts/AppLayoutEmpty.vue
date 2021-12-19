<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { layoutName } from "@/common/const.js";

export default {
  name: layoutName.EMPTY,
};
</script>
