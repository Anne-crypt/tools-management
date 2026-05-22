import { storeToRefs } from "pinia";
import { useToolsStore } from "../stores/tools";

export function useTools() {
  const store = useToolsStore();
  const { tools, recentTools, toolsByCost, activeTools, loading, error } =
    storeToRefs(store);

  return {
    tools,
    recentTools,
    toolsByCost,
    activeTools,
    loading,
    error,
    fetchTools: store.fetchTools,
    fetchRecentTools: store.fetchRecentTools,
    fetchToolsByCost: store.fetchToolsByCost,
    fetchActiveTools: store.fetchActiveTools,
    clearError: store.clearError,
  };
}
