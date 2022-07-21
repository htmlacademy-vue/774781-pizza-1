<template>
  <div class="user">
    <img :src="userAvatar" alt="Василий Ложкин" width="72" height="72" />
    <div class="user__name">
      <span>{{ userName }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ userPhone }}</span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserProfile",

  computed: {
    ...mapGetters("auth", ["userName", "userAvatar", "userPhone"]),
  },
};
</script>

<style lang="scss">
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
