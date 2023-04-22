<template>
  <div class="user">
    <img
      :src="avatar"
      alt="Василий Ложкин"
      width="72"
      height="72"
    >
    <div class="user__name">
      <span>{{ name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ phone }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "ProfileUser",
  props: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    }
  }
};
</script>

<style lang="scss" src="../../../assets/scss/blocks/user.scss" scoped></style>
