<template>
  <h2 class="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
    Taux d'adoption des outils (6 premiers)
  </h2>
  <div class="h-72 w-full">
    <Bar :data="chartDataTop" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
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
import { getColorsFromAdoption } from "../useCostColorScale";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const props = defineProps<{
  tools: Array<{ name: string; activeUsersCount: number | null }>;
  activeUsers: number;
}>();

const chartData = computed(() => {
  const totalActiveUsers = props.activeUsers > 0 ? props.activeUsers : 1;

  // Créer un array avec les outils et leurs taux d'adoption
  const toolsWithAdoption = props.tools
    .filter((t) => Number.isFinite(t.activeUsersCount ?? 0))
    .map((t) => ({
      name: t.name,
      adoption: ((t.activeUsersCount ?? 0) / totalActiveUsers) * 100,
    }));

  // Trier par taux d'adoption (du plus bas au plus élevé)
  const sorted = [...toolsWithAdoption].sort((a, b) => a.adoption - b.adoption);

  // Top 6 (les plus élevés)
  const topTools = sorted.slice(-6).reverse();
  const topLabels = topTools.map((t) => t.name);
  const topRates = topTools.map((t) => t.adoption);
  const topColors = getColorsFromAdoption(topRates);

  return {
    top: {
      labels: topLabels,
      datasets: [
        {
          label: "Meilleurs taux d'adoption (%)",
          backgroundColor: topColors,
          borderColor: topColors,
          borderWidth: 1,
          borderRadius: 4,
          data: topRates,
        },
      ],
    },
  };
});

const chartDataTop = computed(() => chartData.value.top);

const yAxisMax = computed(() => {
  const topMax = Math.max(...chartDataTop.value.datasets[0].data, 0);
  const overallMax = Math.max(topMax, 100);
  return Math.ceil(overallMax / 10) * 10;
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const rate = context.parsed.y.toFixed(1);
          return ` Adoption: ${rate}%`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: yAxisMax.value,
      ticks: {
        callback: function (value: any) {
          return value + "%";
        },
      },
      title: {
        display: true,
        text: "Taux d'adoption (%)",
      },
    },
  },
}));
</script>
