/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";

const routes = [
  {
    path: "/register",
    name: "register",
    component: () => import("@/pages/CreateUser.vue"),
  },
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
    component: () => import("@/pages/GetPlans.vue"),
  },
  {
    path: "/update",
    name: "update",
    component: () => import("@/pages/UpdateProfile.vue"),
  },
  {
    path: "/get-diet-plan",
    name: "get-diet-plan",
    component: () => import("@/pages/DietRecommend.vue"),
  },
  {
    path: "/get-exercise-plan/:data",
    name: "get-exercise-plan",
    component: () => import("@/pages/ExerciseRecommend.vue"),
    props: true,
  },
  {
    path: "/rate",
    name: "rate",
    component: () => import("@/pages/RateExercise.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Check if user session has expired
  let hours = 10;
  let now = new Date().getTime();
  let setupTime = parseInt(localStorage.getItem("setupTime") || "0", 10);

  if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.clear();
  }

  // Redirect to login page if user is not authenticated
  if (
    to.name !== "login" &&
    to.name !== "register" &&
    to.name != "home" &&
    !localStorage.getItem("access")
  ) {
    return next({ name: "home" });
  }

  next();
});
export default router;
