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
];
