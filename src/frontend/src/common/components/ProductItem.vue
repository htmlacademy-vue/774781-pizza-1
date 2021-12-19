<template>
  <div class="product">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      alt="Капричоза"
    />
    <div class="product__text">
      <h2>Капричоза</h2>
      <ul>
        <li>30 см, на тонком тесте</li>
        <li>Соус: томатный</li>
        <li>Начинка: грибы, лук, ветчина, пармезан, ананас</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
};
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
