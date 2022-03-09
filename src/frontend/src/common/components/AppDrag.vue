<template>
  <div
    :draggable="setDraggable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { counterLimit } from "@/common/const";

export default {
  name: "AppDrag",

  props: {
    transferData: {
      type: Object,
      required: true,
    },
  },

  computed: {
    setDraggable() {
      return this.transferData.quantity < counterLimit.MAX;
    },
  },

  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = "move";
      dataTransfer.dropEffect = "move";
      dataTransfer.setData("payload", JSON.stringify(this.transferData));
    },
  },
};
</script>
