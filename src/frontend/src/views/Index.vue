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
            :default-checked="choosedDough"
            v-model="choosedDough"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector />
        </div>

        <div class="content__ingredients">
          <BuilderIngredientsSelector
            :ingredients="ingredients"
            :sauces="sauces"
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
              :dough="choosedDough"
              :sauce="choosedSauce"
            />
          </div>

          <div class="content__result">
            <BuilderPriceCounter />
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
import { DOUGH_LIGHT_VALUE, SAUCE_TOMATO_VALUE } from '@/common/const.js';
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
      choosedDough: DOUGH_LIGHT_VALUE,
      choosedSauce: SAUCE_TOMATO_VALUE,
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
  },
};
</script>
