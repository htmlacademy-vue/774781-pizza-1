<template>
  <main class="layout">
    <AppSidebar />

    <div class="layout__content">
      <div class="layout__title">
        <AppTitle big>Мои данные</AppTitle>
      </div>

      <UserProfile />

      <template v-if="addresses.length">
        <div
          v-for="address in addresses"
          :key="address.id"
          class="layout__address"
        >
          <AddressItemController :address="address" />
        </div>
      </template>

      <div v-if="showCreateNewAddressForm" class="layout__address">
        <AddressForm
          :show-delete-button="false"
          :address="profileAddress"
          @close-address-form="SHOW_CREATE_NEW_ADDRESS_FORM(false)"
        />
      </div>

      <div class="layout__button">
        <AppButton
          border
          type="button"
          :disabled="
            showCreateNewAddressForm || !availableShowCreateNewAddressForm
          "
          @click="SHOW_CREATE_NEW_ADDRESS_FORM(true)"
        >
          Добавить новый адрес
        </AppButton>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { SHOW_CREATE_NEW_ADDRESS_FORM } from "@/store/mutation-types";
import AppSidebar from "@/layouts/AppSidebar.vue";
import {
  UserProfile,
  AddressItemController,
  AddressForm,
} from "@/modules/profile/components";

export default {
  name: "ProfilePage",

  components: {
    AppSidebar,
    UserProfile,
    AddressItemController,
    AddressForm,
  },

  computed: {
    ...mapState("address", [
      "addresses",
      "profileAddress",
      "showCreateNewAddressForm",
    ]),
    ...mapGetters("address", ["availableShowCreateNewAddressForm"]),
  },

  methods: {
    ...mapMutations("address", [SHOW_CREATE_NEW_ADDRESS_FORM]),
  },
};
</script>
