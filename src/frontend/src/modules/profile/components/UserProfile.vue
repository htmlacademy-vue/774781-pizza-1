<template>
  <div class="user">
    <picture>
      <source
        type="image/webp"
        srcset="img/users/user5@2x.webp 1x, img/users/user5@4x.webp 2x"
      />
      <img
        src="img/users/user5@2x.jpg"
        srcset="img/users/user5@4x.jpg"
        alt="Василий Ложкин"
        width="72"
        height="72"
      />
    </picture>
    <div class="user__name">
      <span>Василий Ложкин</span>
    </div>
    <p class="user__phone">Контактный телефон: <span>+7 999-999-99-99</span></p>
  </div>
</template>

<style lang="scss">
.user {
  display: flex;
  align-items: center;

  margin-bottom: 33px;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}
</style>
