import { computed, type Ref } from "vue";
import { useRoute } from "vue-router";
import type { Tool } from "../interfaces/tools";

function safeLower(value: unknown): string {
  return (value ?? "").toString().toLowerCase();
}

export function useToolsSearch(tools: Ref<Tool[]>, queryKey = "search") {
  const route = useRoute();

  const query = computed(() => {
    const rawQuery = route.query[queryKey];
    const querySource = Array.isArray(rawQuery)
      ? (rawQuery[0] ?? "")
      : (rawQuery ?? "");

    return querySource.toString().toLowerCase().trim();
  });

  const filteredTools = computed(() => {
    if (!query.value) {
      return tools.value;
    }

    return tools.value.filter((tool) => {
      return (
        safeLower(tool.name).includes(query.value) ||
        safeLower(tool.category).includes(query.value) ||
        safeLower(tool.ownerDepartment).includes(query.value) ||
        safeLower(tool.status).includes(query.value)
      );
    });
  });

  return {
    query,
    filteredTools,
  };
}
