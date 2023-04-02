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
import ProfileAddressItem from "./ProfileAddressItem.vue";
import ProfileAddressForm from "./ProfileAddressForm.vue";

export default {
  name: "ProfileAddressController",
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
      return this.showForm ? ProfileAddressForm : ProfileAddressItem;
    },
  },
};
</script>
