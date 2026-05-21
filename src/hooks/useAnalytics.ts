import { ref } from "vue";
import { toolService } from "../api/api";

export function useAnalytics() {
  const analytics = ref(null);
  const loading = ref(false);

  async function fetchAnalytics() {
    loading.value = true;
    try {
      const response = await toolService.getBudgetAnalytics();
      analytics.value = response.data;
    } catch (error) {
      console.error(
        "Erreur lors du chargement des données analytiques :",
        error,
      );
    } finally {
      loading.value = false;
    }
  }

  return {
    fetchAnalytics,
  };
}
