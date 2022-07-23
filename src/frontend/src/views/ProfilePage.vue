<template>
  <main class="layout">
    <AppSidebar />

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <UserProfile />

      <div class="layout__address">
        <AddressItem
          v-for="address in addresses"
          :key="address.id"
          :address="address"
        />
      </div>

      <div class="layout__button">
        <button type="button" class="button button--border">
          Добавить новый адрес
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import AppSidebar from "@/layouts/AppSidebar.vue";
import { UserProfile, AddressItem } from "@/modules/profile/components";

export default {
  name: "ProfilePage",

  components: {
    AppSidebar,
    UserProfile,
    AddressItem,
  },

  computed: {
    ...mapState("address", ["addresses"]),
  },
};
</script>
