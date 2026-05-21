<template>
  <div class="p-6">
    <FiltersCard
      :departments="departments"
      @department-change="handleDepartmentChange"
    />
    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <template v-if="selectedDepartmentId !== ''">
        <ToolCard
          v-for="tool in toolsByDepartment"
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
      </template>
      <template v-else>
        <ToolCard
          v-for="tool in tools"
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
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTools } from "../hooks/useTools";
import ToolCard from "../components/ui/card/ToolCard.vue";
import { useDepartments } from "../hooks/useDepartments";
import FiltersCard from "../components/ui/card/FiltersCard.vue";

const { tools, fetchTools } = useTools();
const { departments, toolsByDepartment, fetchDepartments, fetchToolsByDepartment } = useDepartments();
const selectedDepartmentId = ref<number | string | "">("");

function handleDepartmentChange(departmentId: number | string | "") {
  selectedDepartmentId.value = departmentId;

  if (departmentId !== "") {
    fetchToolsByDepartment(departmentId);
  } else {
    fetchTools();
  }
}

onMounted(async () => {
  await fetchTools();
  await fetchDepartments();
});
</script>
