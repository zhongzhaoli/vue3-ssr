import { type App } from 'vue';
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from 'vue-router';

// 创建路由
export const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  strict: true,
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('../views/home/index.vue'),
    },
    {
      path: '/about',
      component: () => import('../views/about/index.vue'),
    },
  ],
});

// 配置路由
export function setupRouter(app: App<Element>) {
  app.use(router);
  return router;
}
