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
        <ProfileAddressForm
          v-if="startedEditAddress"
          delete-button
          :address="address"
          :errors="errors"
          @save="saveAddress()"
          @delete="deleteSelectedAddress(address.id)"
          @close="toggleNewAddressFormCreating(false)"
        />
        <ProfileAddressItem
          v-else
          :address="address"
          @edit="editAddress(address.id)"
        />
      </div>
    </template>

    <div
      v-if="isNewAddressFormCreationVisible"
      class="layout__address"
    >
      <ProfileAddressForm
        :address="profileAddress"
        :errors="errors"
        @save="saveAddress()"
        @close="toggleNewAddressForm(false)"
      />
    </div>

    <div class="layout__button">
      <AppButton
        border
        type="button"
        :disabled="!isNewAddressFormCreationAvailable"
        @click="toggleNewAddressForm(true)"
      >
        Добавить новый адрес
      </AppButton>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { validateForm } from "../services/formValidation";
import {
  RESET_PROFILE_ADDRESS,
  SET_PROFILE_ADDRESS,
  SHOW_CREATE_NEW_ADDRESS_FORM,
  START_EDIT_ADDRESS
} from "../store/mutation-types";

import ProfileUser from "../modules/profile/components/ProfileUser.vue";
import ProfileAddressForm from "../modules/profile/components/ProfileAddressForm.vue";
import ProfileAddressItem from "../modules/profile/components/ProfileAddressItem.vue";

export default {
  name: "ProfilePage",
  components: {
    ProfileAddressItem,
    ProfileUser,
    ProfileAddressForm,
  },
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    ...mapState("profile", [
      "addresses",
      "profileAddress",
      "isNewAddressFormCreationVisible",
      "startedEditAddress",
    ]),
    ...mapState("auth", ["user"]),
    ...mapGetters("profile", ["isNewAddressFormCreationAvailable"]),
  },
  methods: {
    toggleNewAddressForm(state) {
      this[SHOW_CREATE_NEW_ADDRESS_FORM](state);
    },
    closeEditAddressForm() {
      this[START_EDIT_ADDRESS](false);
      this[RESET_PROFILE_ADDRESS]();
    },
    async deleteSelectedAddress(id) {
      await this.deleteAddress(id);
      await this.fetchAddresses();
      this.closeEditAddressForm();
    },
    editAddress(id) {
      const address = this.addresses.find(address => address.id === id);
      this[SHOW_CREATE_NEW_ADDRESS_FORM](false);
      this[SET_PROFILE_ADDRESS](address);
      this[START_EDIT_ADDRESS](true);
    },
    async saveAddress() {
      this.errors = validateForm([
        {
          name: "name",
          value: this.profileAddress.name,
          rules: ["required"],
        },
        {
          name: "street",
          value: this.profileAddress.street,
          rules: ["required"],
        },
        {
          name: "building",
          value: this.profileAddress.building,
          rules: ["required"],
        },
      ]);
      if (this.errors.length > 0) {
        return;
      }

      const newAddress = {
        name: this.profileAddress.name,
        userId: this.user.id,
        street: this.profileAddress.street,
        building: this.profileAddress.building,
        flat: this.profileAddress.flat,
        comment: this.profileAddress.comment,
      };

      if (this.startedEditAddress) {
        await this.putAddress({
          id: this.profileAddress.id,
          address: newAddress,
        });
      } else {
        await this.postAddress(newAddress);
      }

      await this.fetchAddresses();
      this.closeEditAddressForm();
    },
    ...mapMutations("profile", [
      SHOW_CREATE_NEW_ADDRESS_FORM,
      START_EDIT_ADDRESS,
      SET_PROFILE_ADDRESS,
      RESET_PROFILE_ADDRESS,
    ]),
    ...mapActions("profile", [
      "postAddress",
      "putAddress",
      "fetchAddresses",
      "deleteAddress",
    ]),
  },
};
</script>
