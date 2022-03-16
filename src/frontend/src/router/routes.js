import { layoutName } from "@/common/const.js";

export default [
  {
    path: "/",
    name: "IndexPage",
    component: () => import("../views/IndexPage.vue"),
    meta: { layout: layoutName.DEFAULT },
  },
  {
    path: "/cart",
    name: "CartPage",
    component: () => import("../views/CartPage.vue"),
    meta: { layout: layoutName.DEFAULT },
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: () => import("../views/ProfilePage.vue"),
    meta: { layout: layoutName.DEFAULT },
  },
  {
    path: "/orders",
    name: "OrdersPage",
    component: () => import("../views/OrdersPage.vue"),
    meta: { layout: layoutName.DEFAULT },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("../views/LoginPage.vue"),
    meta: { layout: layoutName.EMPTY },
  },
  {
    path: "/success",
    name: "SuccessPopup",
    component: () => import("../views/SuccessPopup.vue"),
    meta: { layout: layoutName.EMPTY },
  },
];
