<!-- active, expiring, unused -->
<template>
  <span
    :class="statusStyles[status]"
    class="px-2.5 py-1 text-xs font-medium rounded-full transition-colors duration-200"
  >
    {{ status }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  status: "Active" | "Expiring" | "Unused";
}>();

const statusStyles = {
  Active: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
  Expiring: "bg-gradient-to-r from-amber-400 to-orange-500 text-white",
  Unused: "bg-gradient-to-r from-rose-500 to-red-500 text-white",
};
</script>
