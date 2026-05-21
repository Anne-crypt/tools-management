import { ref } from "vue";
import { toolService } from "../api/api";
import type { Tool } from "../interfaces/tools";
import { mapApiToolToTool } from "../interfaces/tools";

export function useTools() {
  const tools = ref<Tool[]>([]);
  const recentTools = ref<Tool[]>([]);
  const toolsByCost = ref<Tool[]>([]);
  const activeTools = ref<Tool[]>([]);
  const loading = ref(false);

  function mapTools(data: unknown) {
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((tool: any) => mapApiToolToTool(tool));
  }

  async function fetchTools() {
    loading.value = true;
    try {
      const response = await toolService.getTools();
      tools.value = mapTools(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des outils :", error);
    } finally {
      loading.value = false;
    }
  }

  async function fetchRecentTools() {
    loading.value = true;
    try {
      const response = await toolService.getRecentTools();
      recentTools.value = mapTools(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des outils récents :", error);
    } finally {
      loading.value = false;
    }
  }

  async function fetchActiveTools() {
    loading.value = true;
    try {
      const response = await toolService.getActiveTools();
      activeTools.value = mapTools(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des outils actifs :", error);
    } finally {
      loading.value = false;
    }
  }

  async function fetchToolsByCost() {
    loading.value = true;
    try {
      const response = await toolService.getToolsByCost();
      toolsByCost.value = mapTools(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des outils par coût :", error);
    } finally {
      loading.value = false;
    }
  }

  return {
    tools,
    recentTools,
    toolsByCost,
    activeTools,
    loading,
    fetchTools,
    fetchRecentTools,
    fetchToolsByCost,
    fetchActiveTools,
  };
}
