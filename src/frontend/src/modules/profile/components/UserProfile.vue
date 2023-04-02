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
  name: "UserProfile",
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

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

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

.user__phone {
  @include b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}
</style>
