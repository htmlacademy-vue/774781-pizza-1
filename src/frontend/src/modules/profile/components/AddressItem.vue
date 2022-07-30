<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b>{{ address.name }}</b>
      <div class="address-form__edit">
        <button type="button" class="icon">
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>
    <p>{{ fullAddress }}</p>
    <small>{{ address.comment }}</small>
  </div>
</template>

<script>
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
    fullAddress() {
      return `${this.address.street}, д. ${this.address.building}, кв. ${this.address.flat}`;
    },
  },
};
</script>
