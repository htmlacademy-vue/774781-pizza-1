import { layoutName } from "@/common/const.js";
import { auth, isLoggedIn } from "@/middlewares";

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
    meta: { layout: layoutName.WITH_SIDEBAR, middlewares: [auth] },
  },
  {
    path: "/orders",
    name: "OrdersPage",
    component: () => import("../views/OrdersPage.vue"),
    meta: { layout: layoutName.WITH_SIDEBAR, middlewares: [auth] },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("../views/LoginPage.vue"),
    meta: { layout: layoutName.EMPTY, middlewares: [isLoggedIn] },
  },
];
