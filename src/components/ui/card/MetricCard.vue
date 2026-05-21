<template>
  <div
    class="p-5 rounded-2xl bg-white dark:bg-black border border-slate-100 dark:border-slate-800 shadow-sm transition-transform duration-200 hover:scale-[1.01]"
  >
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-slate-500 dark:text-slate-400 text-sm font-medium">
        {{ title }}
      </h3>

      <div :class="['p-2 rounded-lg text-white', iconConfig.bgClass]">
        <component :is="iconConfig.icon" class="w-5 h-5" />
      </div>
    </div>

    <div class="flex items-baseline gap-1 mb-4">
      <span class="text-2xl font-bold text-slate-900 dark:text-white">{{
        value
      }}</span>
      <span
        v-if="subValue"
        class="text-2xl text-slate-400/70 dark:text-slate-500"
      >
        {{ subValue }}
      </span>
    </div>

    <TrendBadge :trend="trend" :unit="trendUnit" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  ArrowUpRightIcon,
  Building2Icon,
  UsersIcon,
  WrenchIcon,
} from "lucide-vue-next";
import TrendBadge from "../badge/TrendBadge.vue";

const props = defineProps<{
  title: string;
  value: string;
  trend: number;
  trendUnit?: string;
  subValue?: string;
}>();

const iconConfig = computed(() => {
  switch (props.title) {
    case "Monthly Budget":
      return {
        icon: ArrowUpRightIcon,
        bgClass: "bg-gradient-to-r from-emerald-400 to-green-500",
      };
    case "Active Tools":
      return {
        icon: WrenchIcon,
        bgClass: "bg-gradient-to-r from-blue-500 to-cyan-500",
      };
    case "Departments":
      return {
        icon: Building2Icon,
        bgClass: "bg-gradient-to-r from-orange-400 to-amber-500",
      };
    case "Cost/User":
      return {
        icon: UsersIcon,
        bgClass: "bg-gradient-to-r from-rose-500 to-red-600",
      };
    default:
      return {
        icon: ArrowUpRightIcon,
        bgClass: "bg-gradient-to-r from-slate-400 to-slate-500",
      };
  }
});
</script>
