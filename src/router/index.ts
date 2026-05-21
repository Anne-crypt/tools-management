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
        subtitle:
          "Monitor and manage your organization's software tools and expenses",
        searchPlaceholder: "Search tools...",
      },
    },
    {
      path: "/tools",
      name: "tools",
      component: () => import("../pages/ToolsView.vue"), // Chargé uniquement sur /tools
      meta: {
        title: "Tools Catalog",
        subtitle: "Browse, filter, and maintain your software tool inventory",
        searchPlaceholder: "Search in tools catalog...",
      },
    },
    {
      path: "/analytics",
      name: "analytics",
      component: () => import("../pages/AnalyticsView.vue"), // Chargé uniquement sur /analytics
      meta: {
        title: "Analytics Dashboard",
        subtitle: "Track trends, usage, and spending performance over time",
        searchPlaceholder: "Search metrics, insights...",
      },
    },
    {
      path: "/tools/:id",
      name: "tool-details",
      component: () => import("../pages/ToolDetailsView.vue"),
      meta: {
        title: "Tool Details",
        subtitle: "View detailed information about a specific tool",
        searchPlaceholder: "Search in tool details...",
      },
    },
    {
      path: "/tools/:id/edit",
      name: "edit-tool",
      component: () => import("../pages/EditToolView.vue"),
      meta: {
        title: "Edit Tool",
        subtitle: "Modify tool information and settings",
        searchPlaceholder: "Search in edit tool...",
      },
    },
    {
      path: "/tools/new",
      name: "new-tool",
      component: () => import("../pages/NewToolView.vue"),
      meta: {
        title: "Add New Tool",
        subtitle: "Create a new tool entry in the catalog",
        searchPlaceholder: "Search in add new tool...",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../pages/NotFoundView.vue"),
      meta: {
        title: "Page Not Found",
        subtitle: "The page you requested does not exist or has been moved",
        searchPlaceholder: "Search in the dashboard...",
      },
    },
  ],
});

export default router;
