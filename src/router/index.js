import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "/",
        name: "todo",
        component: () => import("../views/ToDoView.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// check if user is logged in before each route by checking meta.requiresAuth and redirect to login if not
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const loggedIn = localStorage.getItem("access_token");
    if (!loggedIn) {
      // name login route
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
