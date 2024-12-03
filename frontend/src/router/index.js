import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainPage,
  },
  // 其他路由配置
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
