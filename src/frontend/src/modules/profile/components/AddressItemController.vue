<template>
  <component
    :is="displayedComponent"
    :address="address"
    @edit-address="showForm = true"
    @close-address-form="showForm = false"
  />
</template>

<script>
import AddressItem from "./AddressItem.vue";
import AddressForm from "./AddressForm.vue";

export default {
  name: "AddressItemController",

  props: {
    address: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  data() {
    return {
      showForm: false,
    };
  },

  computed: {
    displayedComponent() {
      return this.showForm ? AddressForm : AddressItem;
    },
  },
};
</script>
