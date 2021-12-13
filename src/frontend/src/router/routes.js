import { layoutName } from "@/common/const.js";

export default [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index.vue"),
    meta: { layout: layoutName.DEFAULT },
  },
];
