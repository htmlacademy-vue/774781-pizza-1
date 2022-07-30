<template>
  <main class="layout">
    <AppSidebar />

    <div class="layout__content">
      <div class="layout__title">
        <AppTitle big>Мои данные</AppTitle>
      </div>

      <UserProfile />

      <div
        v-for="address in addresses"
        :key="address.id"
        class="layout__address"
      >
        <AddressItem :address="address" />
      </div>

      <div v-if="showAddressForm" class="layout__address">
        <AddressForm @hide-address-form="showAddressForm = false" />
      </div>

      <div class="layout__button">
        <AppButton
          border
          type="button"
          :disabled="showAddressForm"
          @click="showAddressForm = !showAddressForm"
        >
          Добавить новый адрес
        </AppButton>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import AppSidebar from "@/layouts/AppSidebar.vue";
import {
  UserProfile,
  AddressItem,
  AddressForm,
} from "@/modules/profile/components";

export default {
  name: "ProfilePage",

  data() {
    return {
      showAddressForm: false,
    };
  },

  components: {
    AppSidebar,
    UserProfile,
    AddressItem,
    AddressForm,
  },

  computed: {
    ...mapState("address", ["addresses"]),
  },
};
</script>
