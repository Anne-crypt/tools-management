<template>
      <h2 class="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Outils les plus chers</h2>
  <div class="h-64 w-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getColorsFromCosts } from "../useCostColorScale";

// Enregistrement des composants requis pour le graphique en barres
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const props = defineProps<{
  tools: Array<{
    name: string;
    monthlyCost: number;
  }>;
}>();

// Extraction et tri des outils les plus chers
const chartData = computed(() => {
  // 1. On trie les outils du plus cher au moins cher (ordre décroissant)
  const sortedTools = [...props.tools].sort((a, b) => b.monthlyCost - a.monthlyCost);

  // 2. On ne garde que les 5 premiers (le "Top 5")
  const topTools = sortedTools.slice(0, 5);

  // 3. On extrait les noms pour l'axe Y et les coûts pour l'axe X
  const labels = topTools.map((tool) => tool.name);
  const data = topTools.map((tool) => tool.monthlyCost);
  const barColors = getColorsFromCosts(data);

  return {
    labels: labels, // Les noms des outils apparaîtront à gauche
    datasets: [
      {
        label: "Coût mensuel (€)",
        backgroundColor: barColors,
        borderColor: barColors,
        borderWidth: 1,
        borderRadius: 6, // Arrondit joliment les bords des barres
        data: data,
      },
    ],
  };
});

// Configuration pour basculer le graphique à l'horizontale
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y" as const, // L'ASTUCE : Aligne l'axe principal sur Y pour avoir des barres horizontales
  plugins: {
    legend: {
      display: false, // On masque la légende globale car le titre de l'axe ou du widget suffit généralement
    },
  },
  scales: {
    x: {
      beginAtZero: true, // Force le graphique à commencer à 0€
      grid: {
        display: true,
      },
    },
    y: {
      grid: {
        display: false, // Masque les lignes de grille verticales pour alléger le visuel
      },
    },
  },
});
</script>