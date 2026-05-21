<template>
    <div class="p-6">
        <h2 class="text-xl font-semibold mb-4">Filters</h2>
        <div class="space-y-4">
        <div>
            <label for="department" class="block text-sm font-medium text-gray-700">Department</label>
                        <select
                            id="department"
                            v-model="selectedDepartment"
                            name="department"
                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            @change="emitDepartment"
                        >
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
            </select>
        </div>
        <!-- Additional filters can be added here -->
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from "vue";
import type { DepartmentOption } from "../../../hooks/useDepartments";


const props = defineProps<{
    departments: DepartmentOption[];
}>();

const emit = defineEmits<{
        (e: "department-change", value: number | string | ""): void;
}>();

const selectedDepartment = ref<number | string | "">("");

function emitDepartment() {
    emit("department-change", selectedDepartment.value);
}


</script>
