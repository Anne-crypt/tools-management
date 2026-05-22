<template>
  <div class="h-64 w-full">
    <Line
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const props = defineProps<{
  overview: {
    previousMonthTotal: number;
    currentMonthTotal: number;
  };
}>();


// 1. Les données du graphique (labels = axe X, datasets = axe Y)
const chartData = computed(() => ({
  labels: ["Mois Precedent", "Mois En Cours"],
  datasets: [
    {
      label: "Budget (EUR)",
      backgroundColor: "#f59e0b",
      borderColor: "#f59e0b",
      data: [props.overview.previousMonthTotal, props.overview.currentMonthTotal],
    },
  ],
}));

// 2. Les options de configuration (responsive, design...)
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

</script>