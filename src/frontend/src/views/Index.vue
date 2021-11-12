<template>
  <main class="content">
    <form
      action="#"
      method="post"
    >
      <div class="content__wrapper">
        <h1 class="title title--big">
          Конструктор пиццы
        </h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите тесто
            </h2>

            <div class="sheet__content dough">
              <label
                class="dough__input"
                :class="`dough__input--${value}`"
                v-for="{ id, name, description, value } in dough"
                :key="id"
              >
                <input
                  type="radio"
                  name="dought"
                  :value="value"
                  class="visually-hidden"
                  checked
                >
                <b>{{ name }}</b>
                <span>{{ description }}</span>
              </label>
            </div>
          </div>
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
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            >
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas" />
                <div class="pizza__filling pizza__filling--bacon" />
                <div class="pizza__filling pizza__filling--cheddar" />
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
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
import pizza from "@/static/pizza.json";
import saucesValues from "@/common/enums/saucesValues.js";
import doughValues from "@/common/enums/doughValues.js";
import ingredientModifiers from "@/common/enums/ingredientModifiers.js";
import { BuilderSizeSelector, BuilderIngredientsSelector } from '@/modules/builder/components';

export default {
  name: "Index",

  components: {
    BuilderIngredientsSelector,
    BuilderSizeSelector,
  },

  pizza,

  computed: {
    dough() {
      return this.$options.pizza.dough.map((dough) => ({
        ...dough,
        value: doughValues[dough.name],
      }));
    },

    ingredients() {
      return this.$options.pizza.ingredients.map((ingredient) => ({
        ...ingredient,
        modifier: ingredientModifiers[ingredient.name],
      }));
    },

    sauces() {
      return this.$options.pizza.sauces.map((sauce, _, sauces) => ({
        ...sauce,
        value: saucesValues[sauce.name],
        checked: sauce === sauces[0],
      }));
    },
  },
};
</script>
