<template>
  <div>
    <div class="layout__title">
      <AppTitle big>
        Мои данные
      </AppTitle>
    </div>

    <ProfileUser
      v-if="user"
      :name="user.name"
      :avatar="user.avatar"
      :phone="user.phone"
    />

    <template v-if="addresses.length">
      <div
        v-for="address in addresses"
        :key="address.id"
        class="layout__address"
      >
        <ProfileAddressController
          :address="address"
          :user-id="user.id"
        />
      </div>
    </template>

    <div
      v-if="isNewAddressFormCreationVisible"
      class="layout__address"
    >
      <ProfileAddressForm
        :is-delete-visible="false"
        :address="profileAddress"
        :user-id="user.id"
        @close="closeAddressForm()"
      />
    </div>

    <div class="layout__button">
      <AppButton
        border
        type="button"
        :disabled="!isNewAddressFormCreationAvailable"
        @click="toggleNewAddressFormCreation()"
      >
        Добавить новый адрес
      </AppButton>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { SHOW_CREATE_NEW_ADDRESS_FORM } from "@/store/mutation-types";
import ProfileUser from "@/modules/profile/components/ProfileUser.vue";
import ProfileAddressController from "@/modules/profile/components/ProfileAddressController.vue";
import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm.vue";

export default {
  name: "ProfilePage",
  components: {
    ProfileUser,
    ProfileAddressController,
    ProfileAddressForm,
  },
  computed: {
    ...mapState("address", [
      "addresses",
      "profileAddress",
      "isNewAddressFormCreationVisible",
    ]),
    ...mapState("auth", ["user"]),
    ...mapGetters("address", ["isNewAddressFormCreationAvailable"]),
  },
  methods: {
    closeAddressForm() {
      this[SHOW_CREATE_NEW_ADDRESS_FORM](false);
    },
    toggleNewAddressFormCreation() {
      this[SHOW_CREATE_NEW_ADDRESS_FORM](true);
    },
    ...mapMutations("address", [SHOW_CREATE_NEW_ADDRESS_FORM]),
  },
};
</script>
