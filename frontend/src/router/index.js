import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/quiz",
    component: () => import("../views/Quiz.vue")
  },
  {
    path: "/result",
    component: () => import("../views/Result.vue")
  },
  {
    path: "/qsRanking",
    component: () => import("../views/qsRanking.vue")
  },
  {
    path: "/profile",
    component: () => import("../views/ProfilePage.vue")
  },
  {
    path: "/mainPage",
    component: () => import("../views/mainPage.vue")
  },
  {
    path: "/blog",
    component: () => import("../views/Blog.vue")
  }
];

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router;
