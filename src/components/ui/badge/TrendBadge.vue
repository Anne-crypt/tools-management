<template>
  <span
    :class="trendStyles"
    class="px-2 py-0.5 text-xs font-semibold rounded-full transition-colors duration-200"
  >
    {{ trend > 0 ? "+" : "" }}{{ trend }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  trend: number;
}>();

const trendStyles = computed(() => {
  if (props.trend > 10) {
    return "bg-gradient-to-r from-emerald-500 to-blue-500 text-white";
  } else if (props.trend > 5) {
    return "bg-gradient-to-r from-blue-500 to-violet-500 text-white";
  } else if (props.trend >= 0) {
    return "bg-gradient-to-r from-orange-500 to-red-500 text-white";
  } else {
    return "bg-gradient-to-r from-rose-500 to-red-600 text-white";
  }
});
</script>
