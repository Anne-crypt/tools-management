import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Nous allons définir les routes ici 🔀
     {
      path: '/',
      name: 'dashboard',
      component: () => import('../pages/DashboardView.vue') // Chargé uniquement sur /
    },
    {
      path: '/tools',
      name: 'tools',
      component: () => import('../pages/ToolsView.vue') // Chargé uniquement sur /tools
    },
    // {
    //   path: '/analytics',
    //   name: 'analytics',
    //   component: () => import('../pages/AnalyticsView.vue') // Chargé uniquement sur /analytics
    // }
  ]
})

export default router