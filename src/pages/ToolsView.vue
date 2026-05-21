<template>
  <div class="p-6">
    <FiltersCard
      :departments="departments"
      @department-change="handleDepartmentChange"
      @status-change="handleStatusChange"
    />
    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <ToolCard
        v-for="tool in displayedTools"
        :key="tool.id"
        class="h-full"
        :toolIcon="tool.iconUrl"
        :toolName="tool.name"
        :description="tool.description"
        :category="tool.category"
        :status="tool.status"
        :activeUsersCount="tool.activeUsersCount"
        :monthlyCost="tool.monthlyCost"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTools } from "../hooks/useTools";
import ToolCard from "../components/ui/card/ToolCard.vue";
import { useDepartments } from "../hooks/useDepartments";
import FiltersCard from "../components/ui/card/FiltersCard.vue";
import type { Tool } from "../interfaces/tools";

const { tools, fetchTools } = useTools();
const { departments, fetchDepartments } = useDepartments();
const selectedDepartmentId = ref<number | string | "">("");
const selectedStatus = ref<Tool["status"] | "">("");

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
  if (selectedStatus.value === "") {
    return baseTools;
  }

  return baseTools.filter((tool) => tool.status === selectedStatus.value);
});

function handleDepartmentChange(departmentId: number | string | "") {
  selectedDepartmentId.value = departmentId;
}

function handleStatusChange(status: Tool["status"] | "") {
  selectedStatus.value = status;
}

onMounted(async () => {
  await fetchTools();
  await fetchDepartments();
});
</script>
