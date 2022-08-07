<template>
  <p class="order__address">Адрес доставки: {{ fullAddress }}</p>
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
      console.log(this.address);
      return `${this.address.street}, д. ${this.address.building}${this.flat}`;
    },
    ...mapState("address", ["addresses"]),
  },
};
</script>
