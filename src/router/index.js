/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/calculate-bmi",
    name: "calculate",
    component: () => import("@/pages/BMICalculator.vue"),
  },
  {
    path: "/get-plan",
    name: "get-plan",
    component: () => import("@/pages/Plan.vue"),
  },
  {
    path: "/form",
    name: "form",
    component: () => import("@/pages/Form.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes,
});

export default router;
