import { auth, isLoggedIn } from "../middlewares";

export default [
  {
    path: "/",
    name: "IndexPage",
    component: () => import("../views/IndexPage.vue"),
    meta: { layout: 'AppLayoutDefault' },
  },
  {
    path: "/cart",
    name: "CartPage",
    component: () => import("../views/CartPage.vue"),
    meta: { layout: 'AppLayoutDefault' },
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: () => import("../views/ProfilePage.vue"),
    meta: { layout: 'AppLayoutWithSidebar', middlewares: [auth] },
  },
  {
    path: "/orders",
    name: "OrdersPage",
    component: () => import("../views/OrdersPage.vue"),
    meta: { layout: 'AppLayoutWithSidebar', middlewares: [auth] },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("../views/LoginPage.vue"),
    meta: { layout: 'AppLayoutEmpty', middlewares: [isLoggedIn] },
  },
];
