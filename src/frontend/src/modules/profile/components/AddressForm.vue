<template>
  <form
    class="address-form address-form--opened sheet"
    @submit.prevent="saveAddress()"
  >
    <div class="address-form__header">
      <b>Адрес №{{ profileAddress.id }}</b>
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
        v-if="isDeleteVisible"
        transparent
        type="button"
        @click="deleteSelectedAddress()"
      >
        Удалить
      </AppButton>
      <AppButton type="submit">
        Сохранить
      </AppButton>
    </div>
  </form>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import {
  RESET_PROFILE_ADDRESS,
  SET_PROFILE_ADDRESS_ENTITY,
  START_EDIT_ADDRESS,
} from "@/store/mutation-types";
import { validateForm } from "@/services/formValidation";

export default {
  name: "AddressForm",
  props: {
    isDeleteVisible: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: [Number, String],
      required: true,
    }
  },

  data() {
    return {
      errors: [],
    };
  },

  computed: {
    name: {
      get() {
        return this.profileAddress.name;
      },
      set(value) {
        this[SET_PROFILE_ADDRESS_ENTITY]({ entity: "name", value });
      },
    },

    street: {
      get() {
        return this.profileAddress.street;
      },
      set(value) {
        this[SET_PROFILE_ADDRESS_ENTITY]({ entity: "street", value });
      },
    },

    building: {
      get() {
        return this.profileAddress.building;
      },
      set(value) {
        this[SET_PROFILE_ADDRESS_ENTITY]({ entity: "building", value });
      },
    },

    flat: {
      get() {
        return this.profileAddress.flat;
      },
      set(value) {
        this[SET_PROFILE_ADDRESS_ENTITY]({ entity: "flat", value });
      },
    },

    comment: {
      get() {
        return this.profileAddress.comment;
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

    ...mapState("address", ["startedEditAddress", "profileAddress"]),
  },
  methods: {
    closeForm() {
      this[START_EDIT_ADDRESS](false);
      this[RESET_PROFILE_ADDRESS]();
      this.$emit("close");
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
        userId: this.userId,
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
      this.closeForm();
    },

    async deleteSelectedAddress() {
      await this.deleteAddress(this.profileAddress.id);
      await this.fetchAddresses();
      this.closeForm();
    },

    ...mapMutations("address", [
      SET_PROFILE_ADDRESS_ENTITY,
      START_EDIT_ADDRESS,
      RESET_PROFILE_ADDRESS,
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
