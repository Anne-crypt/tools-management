<template>
  <div class="p-6">
    <h2 class="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
      Filters
    </h2>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
      <div>
        <label
          for="department"
          class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
        >
          Department
        </label>
        <select
          id="department"
          v-model="selectedDepartment"
          name="department"
          class="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-black text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          @change="emitDepartment"
        >
          <option value="">All Departments</option>
          <option v-for="dept in departments" :key="dept.id" :value="dept.id">
            {{ dept.name }}
          </option>
        </select>
      </div>
      <div>
        <label
          class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >Status</label
        >
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            class="rounded-full border px-3 py-1 text-xs font-medium transition-colors"
            :class="
              selectedStatus === ''
                ? 'border-slate-900 dark:border-slate-300 bg-slate-900 dark:bg-black text-white'
                : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-black text-slate-700 dark:text-slate-300 hover:border-slate-500 dark:hover:border-slate-500'
            "
            @click="setStatus('')"
          >
            All Statuses
          </button>
          <button
            v-for="status in statuses"
            :key="status"
            type="button"
            class="rounded-full ring-offset-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            :class="
              selectedStatus === status
                ? 'ring-2 ring-slate-500'
                : 'opacity-90 hover:opacity-100'
            "
            @click="setStatus(status)"
          >
            <ToolStatus :status="status" />
          </button>
        </div>
      </div>
      <div>
        <label
          class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >Monthly Cost</label
        >
        <div class="space-y-2">
          <input
            v-model.number="costRange[0]"
            type="range"
            :min="0"
            :max="costRange[1]"
            step="100"
            class="w-full accent-slate-700"
            @change="emitCostRange"
          />
          <input
            v-model.number="costRange[1]"
            type="range"
            :min="costRange[0]"
            :max="10000"
            step="100"
            class="w-full accent-slate-700"
            @change="emitCostRange"
          />
          <div
            class="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400"
          >
            <span>€{{ costRange[0] }}</span>
            <span>€{{ costRange[1] }}</span>
          </div>
        </div>
      </div>
      <div>
        <label
          for="category"
          class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
        >
          Category
        </label>
        <select
          id="category"
          v-model="selectedCategory"
          name="category"
          class="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-black text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          @change="emitCategory"
        >
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
      <!-- Additional filters can be added here -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { DepartmentOption } from "../../../hooks/useDepartments";
import ToolStatus from "../badge/ToolStatus.vue";
import type { Tool } from "../../../interfaces/tools";

const props = defineProps<{
  departments: DepartmentOption[];
  categories: string[];
}>();

const emit = defineEmits<{
  (e: "department-change", value: number | string | ""): void;
  (e: "status-change", value: Tool["status"] | ""): void;
  (e: "cost-range-change", value: [number, number]): void;
  (e: "category-change", value: string): void;
}>();

const selectedDepartment = ref<number | string | "">("");
const selectedStatus = ref<Tool["status"] | "">("");
const costRange = ref<[number, number]>([0, 10000]);
const selectedCategory = ref<string>("");
const statuses: Tool["status"][] = ["Active", "Expiring", "Unused"];

function emitDepartment() {
  emit("department-change", selectedDepartment.value);
}

function setStatus(status: Tool["status"] | "") {
  selectedStatus.value = status;
  emit("status-change", status);
}

function emitCostRange() {
  emit("cost-range-change", costRange.value);
}

function emitCategory() {
  emit("category-change", selectedCategory.value);
}
</script>
