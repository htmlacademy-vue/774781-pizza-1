<template>
  <p class="order__address">
    Адрес доставки: {{ fullAddress }}
  </p>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OrderAddress",
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    address() {
      return this.addresses.find((address) => address.id === this.id);
    },
    flat() {
      return this.address.flat.length > 0 ? `, кв. ${this.address.flat}` : "";
    },
    fullAddress() {
      return `${this.address.street}, д. ${this.address.building}${this.flat}`;
    },
    ...mapState("address", ["addresses"]),
  },
};
</script>

<style lang="scss" scoped>
.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}
</style>
