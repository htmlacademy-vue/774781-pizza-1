<template>
  <form
    class="address-form address-form--opened sheet"
    @submit.prevent="$emit('save')"
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
        v-if="deleteButton"
        transparent
        type="button"
        @click="$emit('delete')"
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
import { mapState, mapMutations } from "vuex";
import { SET_PROFILE_ADDRESS_ENTITY } from "../../../store/mutation-types";
import AppButton from "../../../common/components/AppButton.vue";
import AppInput from "../../../common/components/AppInput.vue";

export default {
  name: "ProfileAddressForm",
  components: {
    AppButton,
    AppInput,
  },
  props: {
    deleteButton: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      required: true,
      default: () => [],
    },
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
    ...mapState("profile", ["profileAddress"]),
  },
  methods: {
    ...mapMutations("profile", [
      SET_PROFILE_ADDRESS_ENTITY,
    ]),
  },
};
</script>
