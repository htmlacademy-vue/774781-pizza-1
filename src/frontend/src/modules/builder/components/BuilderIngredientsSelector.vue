<template>
  <div class="sheet">
    <BaseTitle
      :level="2"
      size="small"
      class="sheet__title"
    >
      Выберите ингредиенты
    </BaseTitle>

    <div class="sheet__content ingredients">
      <div class="ingredients__sauce">
        <p>Основной соус:</p>
        <RadioButton
          class="ingredients__input"
          v-for="{ id, name, value } in sauces"
          :key="id"
          name="sauces"
          :title="name"
          :value="value"
          :checked="value === defaultSauceChecked"
          @change="$emit('selectSauce', value)"
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

            <ItemCounter
              class="ingredients__counter"
              @change="changeIngredientsAmount($event, modifier)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { BaseTitle, ItemCounter, RadioButton } from '@/common/components';

export default {
  name: 'BuilderIngredientsSelector',

  components: {
    RadioButton,
    ItemCounter,
    BaseTitle,
  },

  props: {
    ingredients: {
      type: Array,
      required: true,
    },

    sauces: {
      type: Array,
      required: true,
    },

    defaultSauceChecked: {
      type: String,
      required: true,
    },
  },

  methods: {
    changeIngredientsAmount(count, name) {
      const ingredient = {
        name,
        count,
      }

      this.$emit('selectIngredients', ingredient);
    },
  },
}
</script>

<style lang="scss" scoped>
.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>
