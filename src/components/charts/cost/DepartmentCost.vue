<template>
      <h2 class="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Coût par département</h2>
    <div class="h-64 w-full">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { Doughnut } from "vue-chartjs";
import { getColorsFromCosts } from "../useCostColorScale";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  tools: Array<{ name: string; monthlyCost: number; ownerDepartment?: string }>;
}>();

const chartData = computed(() => {
  // Étape A : On regroupe les coûts par département dans un objet { "Marketing": 120, "Design": 450 }
  const costsByDept = props.tools.reduce((acc, tool) => {
    const dept = tool.ownerDepartment || "Inconnu";
    const cost = tool.monthlyCost || 0;

    if (!acc[dept]) {
      acc[dept] = 0;
    }
    acc[dept] += cost;

    return acc;
  }, {} as Record<string, number>);
  // Étape B : On extrait les clés (les noms des départements) pour l'axe X / Légende
  const labels = Object.keys(costsByDept); // Ex: ["Development", "Design"]

  // Étape C : On extrait les valeurs (les totaux d'argent) pour les parts du donut
  const data = Object.values(costsByDept); // Ex: [1500, 450]
  const sectionColors = getColorsFromCosts(data);

  return {
    labels: labels,
    datasets: [
      {
        label: "Coût total (€)",
        // Plus le coût d'un département est élevé, plus sa couleur tire vers le rouge.
        backgroundColor: sectionColors,
        borderColor: sectionColors,
        borderWidth: 1,
        hoverOffset: 4,
        data: data,
      },
    ],
  };
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});
</script>