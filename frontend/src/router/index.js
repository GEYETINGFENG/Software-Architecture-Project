import { createRouter, createWebHistory } from 'vue-router'

const routes = [
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
  ]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router;
