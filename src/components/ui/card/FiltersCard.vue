<template>
  <div class="p-6">
    <h2 class="text-xl font-semibold mb-4">Filters</h2>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label
          for="department"
          class="block text-sm font-medium text-slate-700 mb-1"
        >
          Department
        </label>
        <select
          id="department"
          v-model="selectedDepartment"
          name="department"
          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          @change="emitDepartment"
        >
          <option value="">All Departments</option>
          <option v-for="dept in departments" :key="dept.id" :value="dept.id">
            {{ dept.name }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Status</label>
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            class="rounded-full border px-3 py-1 text-xs font-medium transition-colors"
            :class="selectedStatus === ''
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-300 bg-white text-slate-700 hover:border-slate-500'"
            @click="setStatus('')"
          >
            All Statuses
          </button>
          <button
            v-for="status in statuses"
            :key="status"
            type="button"
            class="rounded-full ring-offset-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            :class="selectedStatus === status ? 'ring-2 ring-slate-500' : 'opacity-90 hover:opacity-100'"
            @click="setStatus(status)"
          >
            <ToolStatus :status="status" />
          </button>
        </div>
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
}>();

const emit = defineEmits<{
  (e: "department-change", value: number | string | ""): void;
  (e: "status-change", value: Tool["status"] | ""): void;
}>();

const selectedDepartment = ref<number | string | "">("");
const selectedStatus = ref<Tool["status"] | "">("");
const statuses: Tool["status"][] = ["Active", "Expiring", "Unused"];

function emitDepartment() {
  emit("department-change", selectedDepartment.value);
}

function setStatus(status: Tool["status"] | "") {
  selectedStatus.value = status;
  emit("status-change", status);
}
</script>
