<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <select v-model="selectedAddress" name="test" class="select">
        <option value="1">Заберу сам</option>
        <option value="2">Новый адрес</option>
        <option v-if="isAuthenticated" value="3">Дом</option>
      </select>
    </label>

    <AppInput
      v-model="contactPhone"
      big-label
      name="tel"
      type="number"
      placeholder="+7 999-999-99-99"
      >Контактный телефон:
    </AppInput>

    <div v-if="!selfDelivery" class="cart-form__address">
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <AppInput v-model="street" name="street">Улица*</AppInput>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput v-model="building" name="house">Дом*</AppInput>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput v-model="flat" name="apartment">Квартира</AppInput>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import {
  SET_PHONE,
  SET_ADDRESS,
  SET_CURRENT_ADDRESS_ENTITY,
} from "@/store/mutations-types";

export default {
  name: "OrderPickupForm",

  computed: {
    contactPhone: {
      get() {
        return this.phone;
      },
      set(value) {
        this[SET_PHONE](value);
      },
    },
    selectedAddress: {
      get() {
        return this.address;
      },
      set(value) {
        this[SET_ADDRESS](value);
      },
    },
    street: {
      get() {
        return this.currentAddress.street;
      },
      set(value) {
        this[SET_CURRENT_ADDRESS_ENTITY]({ entity: "street", value });
      },
    },
    building: {
      get() {
        return this.currentAddress.building;
      },
      set(value) {
        this[SET_CURRENT_ADDRESS_ENTITY]({ entity: "building", value });
      },
    },
    flat: {
      get() {
        return this.currentAddress.flat;
      },
      set(value) {
        this[SET_CURRENT_ADDRESS_ENTITY]({ entity: "flat", value });
      },
    },
    ...mapState("address", ["currentAddress"]),
    ...mapState("auth", ["isAuthenticated"]),
    ...mapState("cart", ["phone", "address"]),
    ...mapGetters("cart", ["selfDelivery"]),
  },

  methods: {
    setAddress(event) {
      this[SET_ADDRESS](event.target.value);
    },
    ...mapMutations("cart", [SET_PHONE, SET_ADDRESS]),
    ...mapMutations("address", [SET_CURRENT_ADDRESS_ENTITY]),
  },
};
</script>

<style lang="scss">
.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}
</style>
