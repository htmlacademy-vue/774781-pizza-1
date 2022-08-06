<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b>Адрес №{{ address.id }}</b>
      <div class="address-form__edit">
        <button type="button" class="icon" @click="editAddress()">
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>
    <p>{{ fullAddress }}</p>
    <small>{{ address.comment }}</small>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { START_EDIT_ADDRESS } from "@/store/mutation-types";

export default {
  name: "AddressItem",
  props: {
    address: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    flat() {
      return this.address.flat.length > 0 ? `, кв. ${this.address.flat}` : "";
    },
    fullAddress() {
      return `${this.address.street}, д. ${this.address.building}${this.flat}`;
    },
  },
  methods: {
    editAddress() {
      this.$emit("edit-address", this.address.id);
      this[START_EDIT_ADDRESS](true);
    },
    ...mapMutations("address", [START_EDIT_ADDRESS]),
  },
};
</script>
