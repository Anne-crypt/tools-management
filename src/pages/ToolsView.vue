<template>
  <div class="p-6">
    <router-link
      to="/tools/new"
      class="mb-6 inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-700 dark:bg-black dark:text-white dark:hover:bg-slate-800"
    >
      Add New Tool
    </router-link>
    <FiltersCard
      :departments="departments"
      :categories="uniqueCategories"
      @department-change="handleDepartmentChange"
      @status-change="handleStatusChange"
      @cost-range-change="handleCostRangeChange"
      @category-change="handleCategoryChange"
    />
    <div v-if="displayedTools.length === 0" class="mt-6 text-center py-12">
      <p class="text-lg text-slate-500 dark:text-slate-400">Aucun tool trouvé</p>
    </div>
    <div v-else class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <ToolCard
        v-for="tool in displayedTools"
        :key="tool.id"
        class="h-full"
        :toolId="tool.id"
        :toolIcon="tool.iconUrl"
        :toolName="tool.name"
        :description="tool.description"
        :category="tool.category"
        :status="tool.status"
        :activeUsersCount="tool.activeUsersCount"
        :monthlyCost="tool.monthlyCost"
        @select="handleToolSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useTools } from "../hooks/useTools";
import ToolCard from "../components/ui/card/ToolCard.vue";
import { useDepartments } from "../hooks/useDepartments";
import FiltersCard from "../components/ui/card/FiltersCard.vue";
import type { Tool } from "../interfaces/tools";

const router = useRouter();
const { tools, fetchTools } = useTools();
const { departments, fetchDepartments } = useDepartments();
const selectedDepartmentId = ref<number | string | "">("");
const selectedStatus = ref<Tool["status"] | "">("");
const costRange = ref<[number, number]>([0, 10000]);
const selectedCategory = ref<string>("");
const selectedToolId = ref<number | null>(null);

const uniqueCategories = computed(() => {
  const categories = new Set(tools.value.map((tool) => tool.category));
  return Array.from(categories).sort();
});

const displayedTools = computed(() => {
  let baseTools = tools.value;

  // Filter by department
  if (selectedDepartmentId.value !== "") {
    const selectedDept = departments.value.find(
      (d) => d.id === selectedDepartmentId.value,
    );
    if (selectedDept) {
      baseTools = baseTools.filter(
        (tool) => tool.ownerDepartment === selectedDept.name,
      );
    }
  }

  // Filter by status
  if (selectedStatus.value !== "") {
    baseTools = baseTools.filter((tool) => tool.status === selectedStatus.value);
  }

  // Filter by cost range
  baseTools = baseTools.filter(
    (tool) => tool.monthlyCost >= costRange.value[0] && tool.monthlyCost <= costRange.value[1],
  );

  // Filter by category
  if (selectedCategory.value !== "") {
    baseTools = baseTools.filter((tool) => tool.category === selectedCategory.value);
  }



  return baseTools;
});

function handleDepartmentChange(departmentId: number | string | "") {
  selectedDepartmentId.value = departmentId;
}

function handleStatusChange(status: Tool["status"] | "") {
  selectedStatus.value = status;
}

function handleCostRangeChange(range: [number, number]) {
  costRange.value = range;
}

function handleCategoryChange(category: string) {
  selectedCategory.value = category;
}

function handleToolSelect(toolId: number) {
  selectedToolId.value = toolId;
  console.log("Selected tool:", toolId);
  router.push(`/tools/${toolId}`);
}

onMounted(async () => {
  await fetchTools();
  await fetchDepartments();
});
</script>
