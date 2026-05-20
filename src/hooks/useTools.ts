import { ref } from 'vue'
import { toolService } from '../api/api'


export function useTools() {
  const recentTools = ref([])
  const toolsByCost = ref([])
  const analytics = ref(null)
  const loading = ref(false)


  async function fetchRecentTools() {
    loading.value = true
    try {
      const response = await toolService.getRecentTools()
      recentTools.value = response.data
    } catch (error) {
      console.error('Erreur lors du chargement des outils récents :', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchToolsByCost() {
    loading.value = true
    try {
      const response = await toolService.getToolsByCost()
      toolsByCost.value = response.data
    } catch (error) {
      console.error('Erreur lors du chargement des outils par coût :', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchAnalytics() {
    loading.value = true
    try {
      const response = await toolService.getBudgetAnalytics()
      analytics.value = response.data
    } catch (error) {
      console.error('Erreur lors du chargement des données analytiques :', error)
    } finally {
      loading.value = false
    }
  }

  return {
    recentTools,
    toolsByCost,
    analytics,
    loading,
    fetchRecentTools,
    fetchToolsByCost,
    fetchAnalytics
  }
}