<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">
        Выберите ингредиенты
      </h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            class="ingredients__input"
            v-for="{ id, name, value, checked } in sauces"
            :key="id"
            name="sauces"
            :value="value"
            :checked="checked"
            :title="name"
          />
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

              <ItemCounter class="ingredients__counter" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ItemCounter, RadioButton } from '@/common/components';

export default {
  name: 'BuilderIngredientsSelector',

  components: {
    RadioButton,
    ItemCounter
  },

  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style>

</style>
