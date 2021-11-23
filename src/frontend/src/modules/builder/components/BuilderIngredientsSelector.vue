<template>
  <div class="sheet">
    <AppTitle
      :level="2"
      size="small"
      class="sheet__title"
    >
      Выберите ингредиенты
    </AppTitle>

    <div class="sheet__content ingredients">
      <div class="ingredients__sauce">
        <p>Основной соус:</p>
        <RadioButton
          v-for="{ id, name, value, price } in sauces"
          :key="id"
          class="ingredients__input"
          name="sauces"
          :title="name"
          :value="value"
          :checked="value === defaultSauceChecked"
          @change="updateSauce(value, price)"
        />
      </div>

      <div class="ingredients__filling">
        <p>Начинка:</p>

        <ul class="ingredients__list">
          <li
            v-for="{ id, name, modifier, price } in ingredients"
            :key="id"
            class="ingredients__item"
          >
            <IngredientSelector
              :name="name"
              :modifier="modifier"
              :price="price"
              @change="updateIngredients($event, modifier, price)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { AppTitle, RadioButton } from "@/common/components";
import IngredientSelector from './IngredientSelector.vue';

export default {
  name: "BuilderIngredientsSelector",

  components: {
    RadioButton,
    AppTitle,
    IngredientSelector,
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
    updateSauce(value, price) {
      this.$emit("selectSauce", value);
      this.$emit("updateSaucePrice", price);
    },

    updateIngredients(count, name, price) {
      const ingredient = {
        name,
        count,
        price,
      };

      this.$emit("selectIngredients", ingredient);
    },
  },
};
</script>

<style lang="scss">
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
