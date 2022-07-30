<template>
  <form
    class="address-form address-form--opened sheet"
    @submit.prevent="createAddress()"
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
      <AppButton transparent type="button" @click="$emit('hide-address-form')">
        Удалить
      </AppButton>
      <AppButton type="submit">Сохранить</AppButton>
    </div>
  </form>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { SET_PROFILE_ADDRESS_ENTITY } from "@/store/mutations-types";

export default {
  name: "AddressForm",
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
    ...mapState("address", ["profileAddress"]),
  },
  methods: {
    async createAddress() {
      const newAddress = {
        userId: this.profileAddress.id,
        name: this.profileAddress.name,
        street: this.profileAddress.street,
        building: this.profileAddress.building,
        flat: this.profileAddress.flat,
        comment: this.profileAddress.comment,
      };

      await this.postAddress(newAddress);
    },
    ...mapMutations("address", [SET_PROFILE_ADDRESS_ENTITY]),
    ...mapActions("address", ["postAddress"]),
  },
};
</script>
