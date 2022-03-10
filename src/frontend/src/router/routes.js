import { layoutName } from "@/common/const.js";

export default [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index.vue"),
    meta: { layout: layoutName.DEFAULT },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: { layout: layoutName.DEFAULT },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: { layout: layoutName.DEFAULT },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: { layout: layoutName.DEFAULT },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { layout: layoutName.EMPTY },
  },
  {
    path: "/success",
    name: "SuccessPopup",
    component: () => import("../views/SuccessPopup.vue"),
    meta: { layout: layoutName.EMPTY },
  },
];
