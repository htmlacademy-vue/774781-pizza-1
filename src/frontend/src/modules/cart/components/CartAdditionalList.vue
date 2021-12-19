<template>
  <ul class="additional-list">
    <li class="additional-list__item sheet">
      <p class="additional-list__description">
        <img
          src="img/cola.svg"
          width="39"
          height="60"
          alt="Coca-Cola 0,5 литра"
        />
        <span>Coca-Cola 0,5 литра</span>
      </p>

      <div class="additional-list__wrapper">
        <div class="counter additional-list__counter">
          <button type="button" class="counter__button counter__button--minus">
            <span class="visually-hidden">Меньше</span>
          </button>
          <input type="text" name="counter" class="counter__input" value="2" />
          <button
            type="button"
            class="counter__button counter__button--plus counter__button--orange"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>

        <div class="additional-list__price">
          <b>× 56 ₽</b>
        </div>
      </div>
    </li>
    <li class="additional-list__item sheet">
      <p class="additional-list__description">
        <img src="img/sauce.svg" width="39" height="60" alt="Острый соус" />
        <span>Острый соус</span>
      </p>

      <div class="additional-list__wrapper">
        <div class="counter additional-list__counter">
          <button type="button" class="counter__button counter__button--minus">
            <span class="visually-hidden">Меньше</span>
          </button>
          <input type="text" name="counter" class="counter__input" value="2" />
          <button
            type="button"
            class="counter__button counter__button--plus counter__button--orange"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>

        <div class="additional-list__price">
          <b>× 30 ₽</b>
        </div>
      </div>
    </li>
    <li class="additional-list__item sheet">
      <p class="additional-list__description">
        <img
          src="img/potato.svg"
          width="39"
          height="60"
          alt="Картошка из печи"
        />
        <span>Картошка из печи</span>
      </p>

      <div class="additional-list__wrapper">
        <div class="counter additional-list__counter">
          <button type="button" class="counter__button counter__button--minus">
            <span class="visually-hidden">Меньше</span>
          </button>
          <input type="text" name="counter" class="counter__input" value="2" />
          <button
            type="button"
            class="counter__button counter__button--plus counter__button--orange"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>

        <div class="additional-list__price">
          <b>× 56 ₽</b>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "CartAdditionalList",
};
</script>

<style lang="scss" scoped>
.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}
</style>
