<template>
  <main class="content">
    <form @submit.prevent="addPizzaToCart()">
      <div class="content__wrapper">
        <AppTitle big>
          Конструктор пиццы
        </AppTitle>

        <div class="content__dough">
          <BuilderDoughSelector
            :types="builder.dough"
            :selected="currentPizza.doughId"
            @select="selectDough($event)"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector
            :sizes="builder.sizes"
            :selected="currentPizza.sizeId"
            @select="selectSize($event)"
          />
        </div>

        <div class="content__ingredients">
          <BuilderIngredientsSection>
            <template #sauce-selector>
              <BuilderSauceSelector
                :sauces="builder.sauces"
                :selected="currentPizza.sauceId"
                @select="selectSauce($event)"
              />
            </template>

            <BuilderIngredientsSelector
              :ingredients="builder.ingredients"
              :current-ingredients="currentPizza.ingredients"
              @change="changeQuantity($event)"
            />
          </BuilderIngredientsSection>
        </div>

        <div class="content__pizza">
          <AppInput
            name="pizza_name"
            placeholder="Введите название пиццы"
            visually-hidden
            :value="currentPizza.name"
            @input="setPizzaName($event)"
          >
            Название пиццы
          </AppInput>

          <div class="content__constructor">
            <BuilderPizzaView />
          </div>

          <div class="content__result">
            <BuilderAmount />
            <AppButton
              :disabled="unavailableAddOrderToCart"
              type="submit"
            >
              Готовьте
            </AppButton>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { SET_PIZZA_NAME, ADD_PRODUCT_IN_CART, SET_DOUGH, SET_SIZE, SET_SAUCE, CHANGE_INGREDIENT_QUANTITY } from "../store/mutation-types";

import AppTitle from "../common/components/AppTitle.vue";
import AppInput from "../common/components/AppInput.vue";
import AppButton from "../common/components/AppButton.vue";
import BuilderDoughSelector from '../modules/builder/components/BuilderDoughSelector.vue';
import BuilderIngredientsSection from '../modules/builder/components/ingredients-section/BuilderIngredientsSection.vue';
import BuilderSauceSelector from '../modules/builder/components/ingredients-section/BuilderSauceSelector.vue';
import BuilderSizeSelector from '../modules/builder/components/BuilderSizeSelector.vue';
import BuilderPizzaView from '../modules/builder/components/BuilderPizzaView.vue';
import BuilderAmount from '../modules/builder/components/BuilderAmount.vue';
import BuilderIngredientsSelector from '../modules/builder/components/ingredients-section/BuilderIngredientsSelector.vue';

export default {
  name: "IndexPage",
  components: {
    AppTitle,
    AppInput,
    AppButton,
    BuilderIngredientsSection,
    BuilderSauceSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderPizzaView,
    BuilderAmount,
    BuilderIngredientsSelector,
  },
  computed: {
    unavailableAddOrderToCart() {
      return !this.hasPizzaName || !this.hasIngredients;
    },
    ...mapState("cart", ["products"]),
    ...mapState("builder", ["builder", "currentPizza"]),
    ...mapGetters("builder", [
      "hasPizzaName",
      "hasIngredients",
      "builderPrice",
    ]),
  },
  methods: {
    selectDough(id) {
      this[SET_DOUGH](id);
    },
    selectSize(id) {
      this[SET_SIZE](id);
    },
    selectSauce(id) {
      this[SET_SAUCE](id);
    },
    changeQuantity({ id, quantity }) {
      this[CHANGE_INGREDIENT_QUANTITY]({ id, quantity });
    },
    addPizzaToCart() {
      this[ADD_PRODUCT_IN_CART]({
        ...this.currentPizza,
        price: this.builderPrice,
        unitPrice: this.builderPrice,
      });
      this.resetCurrentPizza();
    },
    setPizzaName(name) {
      this[SET_PIZZA_NAME](name);
    },
    ...mapMutations("builder", [SET_PIZZA_NAME, SET_DOUGH, SET_SIZE, SET_SAUCE, CHANGE_INGREDIENT_QUANTITY]),
    ...mapMutations("cart", [ADD_PRODUCT_IN_CART]),
    ...mapActions("cart", ["addProductToCart"]),
    ...mapActions("builder", ["resetCurrentPizza"]),
  },
};
</script>
