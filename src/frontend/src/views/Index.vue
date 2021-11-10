<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a
          href="index.html"
          class="logo"
        >
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          >
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a
          href="#"
          class="header__login"
        ><span>Войти</span></a>
      </div>
    </header>

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
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите размер
              </h2>

              <div class="sheet__content diameter">
                <label class="diameter__input diameter__input--small">
                  <input
                    type="radio"
                    name="diameter"
                    value="small"
                    class="visually-hidden"
                  >
                  <span>23 см</span>
                </label>
                <label class="diameter__input diameter__input--normal">
                  <input
                    type="radio"
                    name="diameter"
                    value="normal"
                    class="visually-hidden"
                    checked
                  >
                  <span>32 см</span>
                </label>
                <label class="diameter__input diameter__input--big">
                  <input
                    type="radio"
                    name="diameter"
                    value="big"
                    class="visually-hidden"
                  >
                  <span>45 см</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингредиенты
              </h2>

              <div class="sheet__content ingredients">
                <div class="ingredients__sauce">
                  <p>Основной соус:</p>
                  <label
                    v-for="{ id, name, value } in sauces"
                    :key="id"
                    class="radio ingredients__input"
                  >
                    <input
                      type="radio"
                      name="sauce"
                      :value="value"
                      checked
                    >
                    <span>{{ name }}</span>
                  </label>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <li
                      class="ingredients__item"
                      v-for="{ id, name, modifier } in ingredients"
                      :key="id"
                    >
                      <span :class="`filling filling--${modifier}`">{{
                        name
                      }}</span>

                      <div class="counter counter--orange ingredients__counter">
                        <button
                          type="button"
                          class="counter__button counter__button--minus"
                          disabled
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        >
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
  </div>
</template>

<script>
import pizza from "@/static/pizza.json";
import saucesValues from "@/common/enums/saucesValues.js";
import doughValues from "@/common/enums/doughValues.js";
import ingredientModifiers from "@/common/enums/ingredientModifiers.js";

export default {
  name: "Index",

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
      return this.$options.pizza.sauces.map((sauce) => ({
        ...sauce,
        value: saucesValues[sauce.name],
      }));
    },
  },
};
</script>
