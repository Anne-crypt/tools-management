import { ref } from "vue";
import { analyticsService } from "../api/api";
import type { Analytics } from "../interfaces/analytics";
import { mapApiAnalyticsToAnalytics } from "../interfaces/analytics";


export function useAnalytics() {
  const analytics = ref<Analytics | null>(null);
  const loading = ref(false);

  async function fetchAnalytics() {
    loading.value = true;
    try {
      const response = await analyticsService.getBudgetAnalytics();
      analytics.value = mapApiAnalyticsToAnalytics(response.data);
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
    analytics,
    loading,
    fetchAnalytics,
  };
}
