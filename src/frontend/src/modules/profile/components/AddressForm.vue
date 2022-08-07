<template>
  <form
    class="address-form address-form--opened sheet"
    @submit.prevent="saveAddress()"
  >
    <div class="address-form__header">
      <b>Адрес №{{ address.id }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <AppInput
          v-model="name"
          type="text"
          name="addr-name"
          placeholder="Введите название адреса"
          required
          :errors="nameErrors"
        >
          Название адреса*
        </AppInput>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <AppInput
          v-model="street"
          type="text"
          name="addr-street"
          placeholder="Введите название улицы"
          required
          :errors="streetErrors"
        >
          Улица*
        </AppInput>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppInput
          v-model="building"
          type="text"
          name="addr-house"
          placeholder="Введите номер дома"
          required
          :errors="buildingErrors"
        >
          Дом*
        </AppInput>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppInput
          v-model="flat"
          type="text"
          name="addr-apartment"
          placeholder="Введите № квартиры"
        >
          Квартира
        </AppInput>
      </div>
      <div class="address-form__input">
        <AppInput
          v-model="comment"
          type="text"
          name="addr-comment"
          placeholder="Введите комментарий"
        >
          Комментарий
        </AppInput>
      </div>
    </div>

    <div class="address-form__buttons">
      <AppButton
        v-if="showDeleteButton"
        transparent
        type="button"
        @click="deleteSelectedAddress()"
      >
        Удалить
      </AppButton>
      <AppButton type="submit">Сохранить</AppButton>
    </div>
  </form>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import {
  SET_PROFILE_ADDRESS_ENTITY,
  START_EDIT_ADDRESS,
} from "@/store/mutation-types";
import { validateForm } from "@/services/form-validation";

export default {
  name: "AddressForm",
  data() {
    return {
      errors: [],
    };
  },
  props: {
    address: {
      type: Object,
      required: true,
      default: () => {},
    },
    showDeleteButton: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    name: {
      get() {
        return this.address.name;
      },
      set(value) {
        this[SET_PROFILE_ADDRESS_ENTITY]({ entity: "name", value });
      },
    },
    street: {
      get() {
        return this.address.street;
      },
      set(value) {
        this[SET_PROFILE_ADDRESS_ENTITY]({ entity: "street", value });
      },
    },
    building: {
      get() {
        return this.address.building;
      },
      set(value) {
        this[SET_PROFILE_ADDRESS_ENTITY]({ entity: "building", value });
      },
    },
    flat: {
      get() {
        return this.address.flat;
      },
      set(value) {
        this[SET_PROFILE_ADDRESS_ENTITY]({ entity: "flat", value });
      },
    },
    comment: {
      get() {
        return this.address.comment;
      },
      set(value) {
        this[SET_PROFILE_ADDRESS_ENTITY]({ entity: "comment", value });
      },
    },
    nameErrors() {
      return this.errors.find((error) => error.name === "name")?.failedRules;
    },
    streetErrors() {
      return this.errors.find((error) => error.name === "street")?.failedRules;
    },
    buildingErrors() {
      return this.errors.find((error) => error.name === "building")
        ?.failedRules;
    },
    ...mapState("auth", ["user"]),
    ...mapState("address", ["startedEditAddress"]),
  },
  methods: {
    closeForm() {
      this[START_EDIT_ADDRESS](false);
      this.$emit("close-address-form");
    },
    async saveAddress() {
      this.errors = validateForm([
        {
          name: "name",
          value: this.address.name,
          rules: ["required"],
        },
        {
          name: "street",
          value: this.address.street,
          rules: ["required"],
        },
        {
          name: "building",
          value: this.address.building,
          rules: ["required"],
        },
      ]);

      if (this.errors.length > 0) {
        return;
      }

      const newAddress = {
        name: this.address.name,
        userId: this.user.id,
        street: this.address.street,
        building: this.address.building,
        flat: this.address.flat,
        comment: this.address.comment,
      };

      if (this.startedEditAddress) {
        await this.putAddress({ id: this.address.id, address: newAddress });
      } else {
        await this.postAddress(newAddress);
      }

      await this.fetchAddresses();
      this.closeForm();
    },
    async deleteSelectedAddress() {
      await this.deleteAddress(this.address.id);
      await this.fetchAddresses();
      this.closeForm();
    },
    ...mapMutations("address", [
      SET_PROFILE_ADDRESS_ENTITY,
      START_EDIT_ADDRESS,
    ]),
    ...mapActions("address", [
      "postAddress",
      "putAddress",
      "fetchAddresses",
      "deleteAddress",
    ]),
  },
};
</script>
