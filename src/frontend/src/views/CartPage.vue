<template>
  <form
    method="post"
    class="layout-form"
    @submit.prevent="createOrder()"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <AppTitle big>
            Корзина
          </AppTitle>
        </div>

        <CartEmpty v-if="!hasProducts" />

        <template v-else>
          <CartProducts />

          <div class="cart__additional">
            <CartMisc />
          </div>

          <div class="cart__form">
            <CartAddressForm>
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select
                  v-model="selectedAddress"
                  name="test"
                  class="select"
                >
                  <option :value="selfDeliveryType">Заберу сам</option>
                  <option :value="newAddressType">Новый адрес</option>
                  <option
                    v-for="{ id, name } in savedAddresses"
                    :key="id"
                    :value="name"
                  >
                    {{ name }}
                  </option>
                </select>
              </label>

              <AppInput
                v-model="contactPhone"
                big-label
                name="tel"
                type="text"
                placeholder="+7 999-999-99-99"
              >
                Контактный телефон:
              </AppInput>

              <div
                v-if="!selfDelivery"
                class="cart-form__address"
              >
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                  <AppInput
                    v-model="street"
                    name="street"
                    :errors="streetErrors"
                    :disabled="selectedSavedAddress"
                  >
                    Улица*
                  </AppInput>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <AppInput
                    v-model="building"
                    name="house"
                    :errors="buildingErrors"
                    :disabled="selectedSavedAddress"
                  >
                    Дом*
                  </AppInput>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <AppInput
                    v-model="flat"
                    :disabled="selectedSavedAddress"
                    name="apartment"
                  >
                    Квартира
                  </AppInput>
                </div>
              </div>
            </CartAddressForm>
          </div>
        </template>
      </div>
    </main>
    <CartFooter v-if="hasProducts" />
    <SuccessPopup
      v-if="showSuccessPopup"
      @close="closeSuccessPopup()"
      @after-animation-end="$router.push('/orders')"
    />
  </form>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { validateForm } from "@/services/formValidation";
import {
  RESET_CART,
  SHOW_SUCCESS_POPUP,
  SET_CART_PHONE,
  SET_ADDRESS,
  SET_CART_ADDRESS_ENTITY,
} from "@/store/mutation-types";

import { deliveryType } from "@/common/const";
import {
  CartProducts,
  CartMisc,
  CartFooter,
  CartEmpty,
  CartAddressForm,
  SuccessPopup,
} from "@/modules/cart/components";

export default {
  name: "CartPage",
  components: {
    CartProducts,
    CartMisc,
    CartFooter,
    CartEmpty,
    CartAddressForm,
    SuccessPopup,
  },
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    selfDeliveryType() {
      return deliveryType.SELF_DELIVERY;
    },
    newAddressType() {
      return deliveryType.NEW_ADDRESS;
    },
    selectedNewAddress() {
      return this.address === this.newAddressType;
    },
    selectedSelfDelivery() {
      return this.address === this.selfDeliveryType;
    },
    selectedSavedAddress() {
      return !this.selectedNewAddress && !this.selectedSelfDelivery;
    },
    contactPhone: {
      get() {
        return this.displayedCartPhone;
      },
      set(value) {
        this[SET_CART_PHONE](value);
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
        return this.cartAddress.street;
      },
      set(value) {
        this[SET_CART_ADDRESS_ENTITY]({ entity: "street", value });
      },
    },
    building: {
      get() {
        return this.cartAddress.building;
      },
      set(value) {
        this[SET_CART_ADDRESS_ENTITY]({ entity: "building", value });
      },
    },
    flat: {
      get() {
        return this.cartAddress.flat;
      },
      set(value) {
        this[SET_CART_ADDRESS_ENTITY]({ entity: "flat", value });
      },
    },
    savedAddresses() {
      return this.isAuthenticated ? this.addresses : null;
    },
    streetErrors() {
      return this.errors.find((error) => error.name === "street")?.failedRules;
    },
    buildingErrors() {
      return this.errors.find((error) => error.name === "building")
        ?.failedRules;
    },
    ...mapState(["cartPhone"]),
    ...mapState("address", ["addresses", "cartAddress"]),
    ...mapState("cart", ["products", "currentMisc", "address", "showSuccessPopup"]),
    ...mapState("auth", ["user", "isAuthenticated"]),
    ...mapGetters(["displayedCartPhone"]),
    ...mapGetters("cart", ["hasProducts", "selfDelivery"]),
    ...mapGetters("auth", ["userId"]),
  },
  watch: {
    selectedAddress(name) {
      const address = this.addresses.find((address) => address.name === name);

      if (address !== undefined) {
        this[SET_CART_ADDRESS_ENTITY]({
          entity: "street",
          value: address.street,
        });
        this[SET_CART_ADDRESS_ENTITY]({
          entity: "building",
          value: address.building,
        });
        this[SET_CART_ADDRESS_ENTITY]({ entity: "flat", value: address?.flat });

        if (this.selectedSavedAddress) {
          this[SET_CART_ADDRESS_ENTITY]({ entity: "id", value: address?.id });
        }
      } else {
        this[SET_CART_ADDRESS_ENTITY]({
          entity: "street",
          value: "",
        });
        this[SET_CART_ADDRESS_ENTITY]({
          entity: "building",
          value: "",
        });
        this[SET_CART_ADDRESS_ENTITY]({ entity: "flat", value: "" });
      }
    },
  },
  methods: {
    async createOrder() {
      if (this.selectedNewAddress) {
        this.errors = validateForm([
          {
            name: "street",
            value: this.cartAddress.street,
            rules: ["required"],
          },
          {
            name: "building",
            value: this.cartAddress.building,
            rules: ["required"],
          },
        ]);

        if (this.errors.length > 0) {
          return;
        }
      }

      const pizzas = this.products.map(
        ({ doughId, name, sauceId, sizeId, quantity, ingredients }) => {
          const ingredientsModel = Object.entries(ingredients).map(
            (ingredient) => ({
              ingredientId: ingredient[0],
              quantity: ingredient[1],
            })
          );

          return {
            name,
            sauceId,
            doughId,
            sizeId,
            quantity,
            ingredients: ingredientsModel,
          };
        }
      );

      const misc = Object.entries(this.currentMisc).map((miscItem) => ({
        miscId: miscItem[0],
        quantity: miscItem[1],
      }));

      const order = {
        userId: this.userId,
        phone: this.isAuthenticated ? this.user.phone : this.cartPhone,
        address: this.selfDelivery ? null : this.cartAddress,
        pizzas,
        misc,
      };

      await this.postOrder(order);
      this[RESET_CART]();

      if (this.isAuthenticated) {
        await this.fetchUserData();
      }

      this[SHOW_SUCCESS_POPUP](true);
    },
    closeSuccessPopup() {
      this[SHOW_SUCCESS_POPUP](false);
    },
    ...mapMutations([SET_CART_PHONE]),
    ...mapMutations("cart", [RESET_CART, SET_ADDRESS, SHOW_SUCCESS_POPUP]),
    ...mapMutations("address", [SET_CART_ADDRESS_ENTITY]),
    ...mapActions(["fetchUserData"]),
    ...mapActions("orders", ["postOrder"]),
  },
};
</script>

<style lang="scss" scoped>
.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}
</style>
