<template>
  <div class="p-4 md:p-6">
    <h2
      v-if="hasCostSections"
      class="text-xl font-semibold mb-4 text-slate-900 dark:text-white"
    >
      Cost
    </h2>
    <div v-if="hasCostSections" class="mx-auto w-full max-w-5xl px-2 md:px-4">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div
          v-if="isVisible('monthly-budget')"
          class="w-full max-w-2xl mx-auto"
        >
          <MonthlyBudget :overview="overview" />
        </div>
        <div
          v-if="isVisible('department-cost')"
          class="w-full max-w-2xl mx-auto"
        >
          <DepartmentCost :tools="tools" />
        </div>
        <div
          v-if="isVisible('expensive-tools')"
          class="w-full max-w-2xl mx-auto lg:col-span-2"
        >
          <ExpensiveTools :tools="tools" />
        </div>
      </div>
    </div>

    <h2
      v-if="hasUsageSections"
      class="mt-8 text-xl font-semibold mb-4 text-slate-900 dark:text-white"
    >
      Usage
    </h2>
    <div
      v-if="hasUsageSections"
      class="mx-auto w-full max-w-5xl px-2 md:px-4 space-y-6"
    >
      <div v-if="isVisible('adoption-rates')" class="w-full max-w-4xl mx-auto">
        <AdoptionRates
          :tools="tools"
          :activeUsers="analytics?.costAnalytics.activeUsers ?? 0"
        />
      </div>
      <div v-if="isVisible('usage-tool')" class="w-full max-w-4xl mx-auto">
        <UsageTool :tools="tools" />
      </div>
      <div
        v-if="isVisible('department-activity')"
        class="w-full max-w-4xl mx-auto"
      >
        <DepartmentActivity :tools="tools" />
      </div>
      <div v-if="isVisible('tool-timeline')" class="w-full max-w-4xl mx-auto">
        <ToolTimeline :tools="tools" @select="handleRouterPush" />
      </div>
    </div>

    <div
      v-if="!hasResults"
      class="mt-8 text-center text-slate-500 dark:text-slate-400"
    >
      Aucun bloc analytics ne correspond a la recherche.
    </div>
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
import DepartmentActivity from "../components/charts/usage/DepartmentActivity.vue";
import ToolTimeline from "../components/charts/usage/ToolTimeline.vue";
import { useRouter } from "vue-router";
import { useAnalyticsSearch } from "../hooks/useAnalyticsSearch";

const router = useRouter();
const { hasResults, isVisible } = useAnalyticsSearch();

const { analytics, fetchAnalytics } = useAnalytics();
const { tools, fetchTools } = useTools();

const hasCostSections = computed(
  () =>
    isVisible("monthly-budget") ||
    isVisible("department-cost") ||
    isVisible("expensive-tools"),
);

const hasUsageSections = computed(
  () =>
    isVisible("adoption-rates") ||
    isVisible("usage-tool") ||
    isVisible("department-activity") ||
    isVisible("tool-timeline"),
);

const overview = computed(
  () =>
    analytics.value?.budgetOverview ?? {
      previousMonthTotal: 0,
      currentMonthTotal: 0,
    },
);

function handleRouterPush(toolId: number) {
  router.push({ name: "tool-details", params: { id: toolId } });
}

onMounted(async () => {
  await fetchAnalytics();
  await fetchTools();
});
</script>
