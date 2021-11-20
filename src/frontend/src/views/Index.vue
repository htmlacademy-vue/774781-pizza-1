<template>
  <main class="content">
    <form
      action="#"
      method="post"
    >
      <div class="content__wrapper">
        <BaseTitle size="big">
          Конструктор пиццы
        </BaseTitle>

        <div class="content__dough">
          <BuilderDoughSelector
            :dough="dough"
            :default-checked="selectedDough"
            v-model="selectedDough"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector
            :sizes="sizes"
            :default-checked="selectedSize"
            v-model="selectedSize"
          />
        </div>

        <div class="content__ingredients">
          <BuilderIngredientsSelector
            :ingredients="ingredients"
            :sauces="sauces"
            :default-sauce-checked="selectedSauce"
            @selectSauce="selectSauce($event)"
            @selectIngredients="selectIngredients($event)"
          />
        </div>

        <div class="content__pizza">
          <BaseInput
            name="pizza_name"
            title="Название пиццы"
            placeholder="Введите название пиццы"
            is-title-hidden
          />

          <div class="content__constructor">
            <BuilderPizzaView
              :dough="selectedDough"
              :sauce="selectedSauce"
              :ingredients="selectedIngredients"
            />
          </div>

          <div class="content__result">
            <BuilderPriceCounter :total-price="totalPrice" />
            <button
              type="button"
              class="button"
              disabled
            >
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { DOUGH_LIGHT_VALUE, SAUCE_TOMATO_VALUE, SIZE_SMALL_VALUE } from '@/common/const.js';
import { BaseTitle, BaseInput } from '@/common/components';
import {
  BuilderSizeSelector,
  BuilderIngredientsSelector,
  BuilderDoughSelector,
  BuilderPizzaView,
  BuilderPriceCounter,
} from '@/modules/builder/components';

export default {
  name: "Index",

  components: {
    BaseTitle,
    BaseInput,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  data() {
    return {
      selectedDough: DOUGH_LIGHT_VALUE,
      selectedSauce: SAUCE_TOMATO_VALUE,
      selectedSize: SIZE_SMALL_VALUE,
      selectedIngredients: [],
      totalPrice: 0,
    }
  },

  props: {
    dough: {
      type: Array,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
    },

    sauces: {
      type: Array,
      required: true,
    },

    sizes: {
      type: Array,
      required: true,
    },
  },

  methods: {
    selectSauce(souce) {
      this.selectedSauce = souce;
    },

    selectIngredients(ingredirent) {
      const existingIngredientIndex = this.selectedIngredients.findIndex((item) => item.name === ingredirent.name);

      if (existingIngredientIndex !== -1) {
        this.selectedIngredients.splice(existingIngredientIndex, 1);
      }

      this.selectedIngredients.push(ingredirent);
    },
  },
};
</script>
