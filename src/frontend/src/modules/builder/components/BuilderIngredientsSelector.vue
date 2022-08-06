<template>
  <div class="sheet">
    <AppTitle :level="2" small class="sheet__title">
      Выберите ингредиенты
    </AppTitle>

    <div class="sheet__content ingredients">
      <div class="ingredients__sauce">
        <p>Основной соус:</p>

        <RadioButton
          v-for="{ id, name, value } in builder.sauces"
          :key="id"
          class="ingredients__input"
          name="sauces"
          :title="name"
          :value="value"
          :checked="id === currentPizza.sauceId"
          @change="selectSauce(id)"
        />
      </div>

      <IngredientsList />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { SET_SAUCE } from "@/store/mutation-types";
import { RadioButton } from "@/common/components";
import IngredientsList from "./IngredientsList.vue";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    RadioButton,
    IngredientsList,
  },

  computed: {
    ...mapState("builder", ["builder", "currentPizza"]),
  },

  methods: {
    selectSauce(id) {
      this[SET_SAUCE](id);
    },
    ...mapMutations("builder", [SET_SAUCE]),
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
</style>
