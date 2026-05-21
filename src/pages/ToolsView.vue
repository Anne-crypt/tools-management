<template>
  <div class="p-6">
    <router-link
      to="/tools/new"
      class="mb-6 inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-700 dark:bg-black dark:text-white dark:hover:bg-slate-800"
    >
      Add New Tool
    </router-link>
    <button
      class="mb-6 ml-4 inline-block rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-700 dark:bg-black dark:text-white dark:hover:bg-slate-800"
      @click="handleMultiSelect"
      >
      Select Multiple Tools
    </button>
    <div v-if="selectedToolIds.length > 0" class="relative mb-6 ml-4 inline-block">
      <button
        class="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-700 dark:bg-black dark:text-white dark:hover:bg-slate-800"
        @click="bulkActionsOpen = !bulkActionsOpen"
      >
        Actions ({{ selectedToolIds.length }} sélectionné{{ selectedToolIds.length > 1 ? 's' : '' }})
      </button>
      <ToolBulkActionsDropdown
        :open="bulkActionsOpen"
        @enable="handleBulkEnable"
        @disable="handleBulkDisable"
        @archive="handleBulkArchive"
        @close="bulkActionsOpen = false"
      />
    </div>
    <FiltersCard
      :departments="departments"
      :categories="uniqueCategories"
      @department-change="handleDepartmentChange"
      @status-change="handleStatusChange"
      @cost-range-change="handleCostRangeChange"
      @category-change="handleCategoryChange"
    />
    <div v-if="loading" class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <Skeleton
        v-for="i in 6"
        :key="i"
        class="rounded-2xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-black"
      />
    </div>
    <div v-else-if="displayedTools.length === 0" class="mt-6 text-center py-12">
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
        :multiSelectMode="multiSelectMode"
        @select="handleToolSelect"
        @toggle-selection="handleToggleSelection"
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
import ToolBulkActionsDropdown from "../components/ui/table/ToolBulkActionsDropdown.vue";
import Skeleton from "../components/ui/Skeleton.vue";
import type { Tool } from "../interfaces/tools";

const router = useRouter();
const { tools, loading, fetchTools } = useTools();
const { departments, fetchDepartments } = useDepartments();
const selectedDepartmentId = ref<number | string | "">("");
const selectedStatus = ref<Tool["status"] | "">("");
const costRange = ref<[number, number]>([0, 10000]);
const selectedCategory = ref<string>("");
const selectedToolId = ref<number | null>(null);
const multiSelectMode = ref(false);
const selectedToolIds = ref<number[]>([]);
const bulkActionsOpen = ref(false);

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

function handleMultiSelect() {
  console.log("Multi-select mode activated");
  multiSelectMode.value = !multiSelectMode.value;
  if (!multiSelectMode.value) {
    selectedToolIds.value = [];
    bulkActionsOpen.value = false;
  }
}

function handleToggleSelection(toolId: number) {
  // Vérifie si le tool est déjà dans la liste
  console.log("######", toolId);
  const isSelected = selectedToolIds.value.includes(toolId);

  if (isSelected) {
    // Si déjà sélectionné → on le retire
    selectedToolIds.value = selectedToolIds.value.filter((id) => id !== toolId);
  } else {
    // Si pas encore sélectionné → on l'ajoute
    selectedToolIds.value.push(toolId);
  }

  console.log("Selected tools:", selectedToolIds.value);
}

function handleBulkEnable() {
  console.log("Enable tools:", selectedToolIds.value);
  // TODO: API call
}

function handleBulkDisable() {
  console.log("Disable tools:", selectedToolIds.value);
  // TODO: API call
}

function handleBulkArchive() {
  console.log("Archive tools:", selectedToolIds.value);
  // TODO: API call
}

onMounted(async () => {
  await fetchTools();
  await fetchDepartments();
});
</script>
