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
          <CartProducts
            :products="products"
            @update-quantity="updateProductQuantity($event)"
            @edit="changeSelectedPizza($event)"
          />

          <div class="cart__additional">
            <CartMisc
              :misc="misc"
              :current="currentMisc"
              @update-quantity="changeMiscQuantity($event)"
            />
          </div>

          <div class="cart__form">
            <CartAddressForm>
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select
                  :value="address"
                  name="test"
                  class="select"
                  @input="setAddress($event)"
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
                :value="displayedCartPhone"
                big-label
                name="tel"
                type="text"
                placeholder="+7 999-999-99-99"
                @input="setPhone($event)"
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
                    :value="cartAddress.street"
                    :errors="streetErrors"
                    :disabled="selectedSavedAddress"
                    name="street"
                    @input="setStreet($event)"
                  >
                    Улица*
                  </AppInput>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <AppInput
                    :value="cartAddress.building"
                    :errors="buildingErrors"
                    :disabled="selectedSavedAddress"
                    name="house"
                    @input="setBuilding($event)"
                  >
                    Дом*
                  </AppInput>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <AppInput
                    :value="cartAddress.flat"
                    :disabled="selectedSavedAddress"
                    name="apartment"
                    @input="setFlat($event)"
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

    <CartFooter
      v-if="hasProducts"
      :total-price="totalPrice"
      :is-available-create-order="isAvailableCreateOrder"
      @add-another-pizza="routeToIndexPage()"
    />

    <CartSuccessPopup
      v-if="showSuccessPopup"
      :is-authenticated="isAuthenticated"
      @input="closeSuccessPopup()"
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
  CHANGE_PRODUCT_QUANTITY,
  UPDATE_PRODUCT_PRICE,
  EDIT_PIZZA,
  CHANGE_MISC_QUANTITY,
} from "@/store/mutation-types";

import { deliveryType } from "@/common/const";
import {
  CartProducts,
  CartMisc,
  CartFooter,
  CartEmpty,
  CartAddressForm,
  CartSuccessPopup,
} from "@/modules/cart/components";

export default {
  name: "CartPage",
  components: {
    CartProducts,
    CartMisc,
    CartFooter,
    CartEmpty,
    CartAddressForm,
    CartSuccessPopup,
  },
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    isAvailableCreateOrder() {
      return this.hasCartPhone;
    },
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
    ...mapState("cart", ["products", "misc", "currentMisc", "address", "showSuccessPopup"]),
    ...mapState("auth", ["user", "isAuthenticated"]),
    ...mapGetters(["displayedCartPhone", "hasCartPhone"]),
    ...mapGetters("cart", ["hasProducts", "selfDelivery", "totalPrice"]),
    ...mapGetters("auth", ["userId"]),
  },
  watch: {
    address(name) {
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
    changeMiscQuantity({ id, quantity }) {
      this[CHANGE_MISC_QUANTITY]({ id, quantity });
    },
    setFlat(value) {
      this[SET_CART_ADDRESS_ENTITY]({ entity: "flat", value });
    },
    setBuilding(value) {
      this[SET_CART_ADDRESS_ENTITY]({ entity: "building", value });
    },
    setAddress(value) {
      this[SET_ADDRESS](value);
    },
    setPhone(value) {
      this[SET_CART_PHONE](value)
    },
    setStreet(value) {
      this[SET_CART_ADDRESS_ENTITY]({ entity: "street", value });
    },
    routeToIndexPage() {
      this.$router.push("/");
    },
    updateProductQuantity({ quantity, id, unitPrice }) {
      this[CHANGE_PRODUCT_QUANTITY]({ quantity, id });
      this[UPDATE_PRODUCT_PRICE]({ quantity, id, unitPrice });

      if (!this.hasProducts) {
        this[RESET_CART]();
      }
    },
    changeSelectedPizza(id) {
      this[EDIT_PIZZA](id);
      this.$router.push("/");
    },
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
    ...mapMutations([SET_CART_PHONE, EDIT_PIZZA]),
    ...mapMutations("cart", [
      RESET_CART,
      SET_ADDRESS,
      SHOW_SUCCESS_POPUP,
      CHANGE_PRODUCT_QUANTITY,
      UPDATE_PRODUCT_PRICE,
      CHANGE_MISC_QUANTITY,
    ]),
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
