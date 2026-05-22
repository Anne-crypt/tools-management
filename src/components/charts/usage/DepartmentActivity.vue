<template>
  <h2 class="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
    Activité par département
  </h2>
  <div class="h-80 w-full">
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
import { costColorStops } from "../useCostColorScale";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const toolsColor = costColorStops[2].color;
const usersColor = costColorStops[0].color;

const props = defineProps<{
  tools: Array<{ ownerDepartment: string; activeUsersCount: number | null }>;
}>();

const chartData = computed(() => {
  // 1. Agrégation des données par département
  const statsByDept = props.tools.reduce(
    (acc, tool) => {
      const dept = tool.ownerDepartment || "Autre";
      if (!acc[dept]) {
        acc[dept] = { toolsCount: 0, activeUsers: 0 };
      }
      acc[dept].toolsCount += 1;
      acc[dept].activeUsers += tool.activeUsersCount ?? 0;
      return acc;
    },
    {} as Record<string, { toolsCount: number; activeUsers: number }>,
  );

  const labels = Object.keys(statsByDept);

  return {
    labels: labels,
    datasets: [
      {
        label: "Nombre d'outils",
        backgroundColor: toolsColor,
        borderRadius: 4,
        data: labels.map((d) => statsByDept[d].toolsCount),
        yAxisID: "yTools", // Lié à l'axe Y de gauche
      },
      {
        label: "Utilisateurs Actifs",
        backgroundColor: usersColor,
        borderRadius: 4,
        data: labels.map((d) => statsByDept[d].activeUsers),
        yAxisID: "yUsers", // Lié à l'axe Y de droite
      },
    ],
  };
});

// 2. Configuration des deux axes Y pour gérer la différence d'échelle
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false, // Allège le graphique
      },
    },
    yTools: {
      type: "linear" as const,
      position: "left" as const,
      title: {
        display: true,
        text: "Nombre d'outils",
        color: toolsColor,
      },
      beginAtZero: true,
      grid: {
        drawOnChartArea: true, // Garde les lignes de grille pour l'axe principal
      },
    },
    yUsers: {
      type: "linear" as const,
      position: "right" as const,
      title: {
        display: true,
        text: "Utilisateurs Actifs",
        color: usersColor,
      },
      beginAtZero: true,
      grid: {
        drawOnChartArea: false, // Masque les lignes pour éviter les conflits visuels
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
});
</script>
