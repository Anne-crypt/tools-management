<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Monthly Budget"
        value="€28,750"
        subValue="/€30k"
        :trend="12"
        trendUnit="%"
      />

      <MetricCard title="Active Tools" value="147" :trend="12" trendUnit="%">
        <!-- :value="activeToolsCount" -->
      </MetricCard>

      <MetricCard title="Departments" value="8" :trend="2" trendUnit="%" />

      <MetricCard title="Cost/User" value="€156" :trend="10" trendUnit="%" />
    </div>

    <div v-if="loading" class="text-blue-600 font-medium">
      Chargement des données en cours...
    </div>

    <div
      class="mt-6 overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-black"
    >
      <table class="w-full text-left border-collapse">
        <thead>
          <tr>
            <th
              colspan="5"
              class="px-6 py-4 text-lg font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-black"
            >
              <div class="flex items-center justify-between">
                <span>Recent Tools</span>
                <span
                  class="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400"
                >
                  <CalendarDaysIcon class="w-4 h-4" />
                  Last 30 days
                </span>
              </div>
            </th>
          </tr>
          <tr
            class="border-b border-slate-100 bg-slate-50/70 text-xs font-semibold tracking-wider text-slate-500 dark:border-slate-800 dark:bg-black dark:text-slate-400"
          >
            <th class="px-6 py-4">Tool</th>
            <th class="px-6 py-4">Department</th>
            <th class="px-6 py-4">
              <button
                class="inline-flex items-center gap-1 select-none hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                @click="toggleSort('users')"
              >
                Users
                <span class="text-sm">
                  {{
                    sortColumn === "users"
                      ? sortDirection === "desc"
                        ? "↓"
                        : "↑"
                      : "↕"
                  }}
                </span>
              </button>
            </th>
            <th class="px-6 py-4">
              <button
                class="inline-flex items-center gap-1 select-none hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                @click="toggleSort('cost')"
              >
                Monthly Cost
                <span class="text-sm">
                  {{
                    sortColumn === "cost"
                      ? sortDirection === "desc"
                        ? "↓"
                        : "↑"
                      : "↕"
                  }}
                </span>
              </button>
            </th>
            <th class="px-6 py-4 text-right">
              <button
                class="inline-flex items-center gap-1 select-none hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                @click="toggleSort('status')"
              >
                Status
                <span class="text-sm">
                  {{
                    sortColumn === "status"
                      ? sortDirection === "desc"
                        ? "↓"
                        : "↑"
                      : "↕"
                  }}
                </span>
              </button>
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          <tr
            v-for="tool in sortedRecentTools"
            :key="tool.id"
            class="relative cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors duration-150"
            @click="toggleRow(tool.id)"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <img
                  :src="tool.iconUrl || 'a'"
                  :alt="tool.name"
                  class="w-7 h-7 object-contain"
                />
                <span class="font-semibold text-slate-900 dark:text-white">
                  {{ tool.name }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4">
              <span
                class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-slate-800 dark:text-slate-300"
              >
                {{ tool.category }}
              </span>
            </td>
            <td class="px-6 py-4">{{ tool.usersCount }}</td>
            <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">
              €{{ tool.monthlyCost }}
            </td>
            <td class="px-6 py-4 text-right">
              <ToolStatus :status="tool.status" />
              <ToolRowActionsDropdown
                :open="selectedToolId === tool.id"
                @view="handleView(tool.id)"
                @edit="handleEdit(tool.id)"
                @delete="handleDelete(tool.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTools } from "../hooks/useTools";
import { useAnalytics } from "../hooks/useAnalytics";
import { CalendarDaysIcon } from "lucide-vue-next";
import ToolStatus from "../components/ui/badge/ToolStatus.vue";
import MetricCard from "../components/ui/card/MetricCard.vue";
import ToolRowActionsDropdown from "../components/ui/table/ToolRowActionsDropdown.vue";

// 1. On extrait directement ce dont on a besoin en déstructurant le hook
const {
  recentTools,
  activeTools,
  loading,
  fetchTools,
  fetchRecentTools,
  fetchActiveTools,
} = useTools();

const { fetchAnalytics } = useAnalytics();
const selectedToolId = ref<number | null>(null);
const sortColumn = ref<"users" | "cost" | "status">("users");
const sortDirection = ref<"asc" | "desc">("desc");

const sortedRecentTools = computed(() => {
  return [...recentTools.value].sort((firstTool, secondTool) => {
    const comparison =
      sortColumn.value === "users"
        ? firstTool.usersCount - secondTool.usersCount
        : sortColumn.value === "cost"
          ? firstTool.monthlyCost - secondTool.monthlyCost
          : firstTool.status.localeCompare(secondTool.status);

    return sortDirection.value === "asc" ? comparison : -comparison;
  });
});

function toggleRow(toolId: number) {
  selectedToolId.value = selectedToolId.value === toolId ? null : toolId;
}

function toggleSort(column: "users" | "cost" | "status") {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    return;
  }

  sortColumn.value = column;
  sortDirection.value = "desc";
}

function handleView(toolId: number) {
  console.log("view", toolId);
}

function handleEdit(toolId: number) {
  console.log("edit", toolId);
}

function handleDelete(toolId: number) {
  console.log("delete", toolId);
}

// 2. On lance l'appel au chargement
onMounted(async () => {
  await Promise.all([
    fetchTools(),
    fetchActiveTools(),
    fetchRecentTools(),
    fetchAnalytics(),
  ]);

  console.log("DashboardView monté, #############", activeTools.value.length);
});

// const departmentCount = computed(() => String(tools.value?.length ?? 0))
</script>
