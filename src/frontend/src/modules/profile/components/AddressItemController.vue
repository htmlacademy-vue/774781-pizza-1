<template>
  <component
    :is="displayedComponent"
    :address="address"
    :user-id="userId"
    @edit="showForm = true"
    @close="showForm = false"
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
    userId: {
      type: [Number, String],
      required: true,
    }
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
