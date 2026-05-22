<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <div class="h-72 w-full">
      <Bar :data="chartData1" :options="chartOptions" />
    </div>
    <div class="h-72 w-full">
      <Bar :data="chartData2" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getColorsFromCosts } from '../useCostColorScale';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const props = defineProps<{
  tools: Array<{ name: string; activeUsersCount: number }>;
}>();

const chartData1 = computed(() => {
  const sortedTools = [...props.tools]
    .filter((tool) => Number.isFinite(tool.activeUsersCount))
    .sort((a, b) => b.activeUsersCount - a.activeUsersCount)
    .slice(0, 10);

  const usersData = sortedTools.map((tool) => tool.activeUsersCount);
  const maxUsers = Math.max(...usersData, 0);
  const invertedData = usersData.map((v) => maxUsers - v);
  const barColors = getColorsFromCosts(invertedData);

  return {
    labels: sortedTools.map((tool) => tool.name),
    datasets: [
      {
        label: 'Tools ranking by active users (first 10)',
        backgroundColor: barColors,
        borderColor: barColors,
        borderWidth: 1,
        borderRadius: 4,
        data: usersData
      }
    ]
  };
});

const chartData2 = computed(() => {
  const sortedTools = [...props.tools]
    .filter((tool) => Number.isFinite(tool.activeUsersCount))
    .sort((a, b) => a.activeUsersCount - b.activeUsersCount)
    .slice(0, 10)
    .reverse();

  const usersData = sortedTools.map((tool) => tool.activeUsersCount);
  const maxUsers = Math.max(...usersData, 0);
  const invertedData = usersData.map((v) => maxUsers - v);
  const barColors = getColorsFromCosts(invertedData);

  return {
    labels: sortedTools.map((tool) => tool.name),
    datasets: [
      {
        label: 'Tools with less active users (last 10)',
        backgroundColor: barColors,
        borderColor: barColors,
        borderWidth: 1,
        borderRadius: 4,
        data: usersData
      }
    ]
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return ` Active users: ${context.parsed.y}`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'active users'
      }
    }
  }
}));
</script>