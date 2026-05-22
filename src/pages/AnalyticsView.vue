<template>
  <div class="p-6">
    <h2 class="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
      Cost
    </h2>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <MonthlyBudget :overview="overview" />
    <DepartmentCost :tools="tools" />
    <ExpensiveTools :tools="tools" />
  </div>
  <h2 class="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
    Usage
  </h2>
  <AdoptionRates :tools="tools" :activeUsers="analytics?.costAnalytics.activeUsers" />
  <UsageTool :tools="tools" />
     <h2 class="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
      Insights Dashboard
    </h2>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAnalytics } from "../hooks/useAnalytics";
import MonthlyBudget from "../components/charts/cost/MonthlyBudget.vue";
import DepartmentCost from "../components/charts/cost/DepartmentCost.vue";
import { useTools } from "../hooks/useTools";
import ExpensiveTools from "../components/charts/cost/ExpensiveTools.vue";
import AdoptionRates from "../components/charts/usage/AdoptionRates.vue";
import UsageTool from "../components/charts/usage/UsageTool.vue";
const { analytics, fetchAnalytics } = useAnalytics();
const { tools, fetchTools } = useTools();

const overview = computed(() =>
  analytics.value?.budgetOverview ?? {
    previousMonthTotal: 0,
    currentMonthTotal: 0,
  },
);

onMounted(async () => {
  await fetchAnalytics();
  await fetchTools();
});

</script>
