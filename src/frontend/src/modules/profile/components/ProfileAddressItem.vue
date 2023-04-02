<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b>Адрес №{{ address.id }}</b>
      <div class="address-form__edit">
        <button
          type="button"
          class="icon"
          @click="$emit('edit')"
        >
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
  name: "ProfileAddressItem",
  props: {
    address: {
      type: Object,
      required: true,
      default: () => ({}),
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
};
</script>
