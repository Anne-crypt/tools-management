<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-slate-800">Test de connexion API</h1>

    <div v-if="loading" class="text-blue-600 font-medium">
      Chargement des données en cours...
    </div>

    <div v-else class="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
      <h2 class="text-lg font-semibold mb-3 text-slate-700">Données reçues (8 derniers outils) :</h2>

      <pre class="bg-slate-900 text-green-400 p-4 rounded overflow-x-auto text-sm">{{ recentTools }}</pre>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue'
import { useTools } from '../hooks/useTools'

// 1. On extrait directement ce dont on a besoin en déstructurant le hook
const { recentTools, loading, fetchRecentTools } = useTools()

// 2. On lance l'appel au chargement
onMounted(() => {
  fetchRecentTools()
})
</script>