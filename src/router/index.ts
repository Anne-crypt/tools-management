import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("../pages/DashboardView.vue"), // Chargé uniquement sur /
      meta: {
        title: "Internal Tools Dashboard",
        subtitle: "Monitor and manage your organization's software tools and expenses",
      },
    },
    {
      path: "/tools",
      name: "tools",
      component: () => import("../pages/ToolsView.vue"), // Chargé uniquement sur /tools
      meta: {
        title: "Tools Catalog",
        subtitle: "Browse, filter, and maintain your software tool inventory",
      },
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: () => import('../pages/AnalyticsView.vue'), // Chargé uniquement sur /analytics
      meta: {
        title: "Analytics Dashboard",
        subtitle: "Track trends, usage, and spending performance over time",
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../pages/NotFoundView.vue'),
      meta: {
        title: "Page Not Found",
        subtitle: "The page you requested does not exist or has been moved",
      },
    }
  ],
});

export default router;
