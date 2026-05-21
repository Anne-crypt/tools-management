<template>
  <div class="p-6">
    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useTools } from "../hooks/useTools";
import ToolCard from "../components/ui/card/ToolCard.vue";
const { tools, fetchTools } = useTools();

onMounted(async () => {
  await fetchTools();
});
</script>
