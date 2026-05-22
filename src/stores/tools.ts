import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { toolService } from "../api/api";
import type { Tool } from "../interfaces/tools";
import { mapApiToolToTool } from "../interfaces/tools";

function mapTools(data: unknown) {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((tool: any) => mapApiToolToTool(tool));
}

export const useToolsStore = defineStore("tools", () => {
  const tools = ref<Tool[]>([]);
  const recentTools = ref<Tool[]>([]);
  const toolsByCost = ref<Tool[]>([]);
  const activeTools = ref<Tool[]>([]);
  const pendingRequests = ref(0);
  const error = ref<string | null>(null);

  const loading = computed(() => pendingRequests.value > 0);

  async function runRequest(request: () => Promise<void>) {
    pendingRequests.value += 1;
    error.value = null;

    try {
      await request();
    } catch (caughtError) {
      console.error("Erreur lors du chargement des outils :", caughtError);
      error.value =
        caughtError instanceof Error
          ? caughtError.message
          : "Erreur lors du chargement des outils";
    } finally {
      pendingRequests.value -= 1;
    }
  }

  async function fetchTools() {
    await runRequest(async () => {
      const response = await toolService.getTools();
      tools.value = mapTools(response.data);
    });
  }

  async function fetchRecentTools() {
    await runRequest(async () => {
      const response = await toolService.getRecentTools();
      recentTools.value = mapTools(response.data);
    });
  }

  async function fetchActiveTools() {
    await runRequest(async () => {
      const response = await toolService.getActiveTools();
      activeTools.value = mapTools(response.data);
    });
  }

  async function fetchToolsByCost() {
    await runRequest(async () => {
      const response = await toolService.getToolsByCost();
      toolsByCost.value = mapTools(response.data);
    });
  }

  function clearError() {
    error.value = null;
  }

  return {
    tools,
    recentTools,
    toolsByCost,
    activeTools,
    loading,
    error,
    fetchTools,
    fetchRecentTools,
    fetchToolsByCost,
    fetchActiveTools,
    clearError,
  };
});
