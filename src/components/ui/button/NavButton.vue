<template>
  <RouterLink
    :to="to"
    :class="[
      'px-4 py-2 rounded-md font-medium transition-colors duration-200',
      isActive
        ? 'bg-white text-black font-bold dark:bg-black dark:text-white'
        : 'bg-white text-black hover:bg-slate-100 dark:bg-black dark:text-white dark:hover:bg-slate-900',
    ]"
  >
    <slot>{{ label }}</slot>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

withDefaults(
  defineProps<{
    label?: string;
    isActive?: boolean;
    to: string;
  }>(),
  {
    label: "",
    isActive: false,
  },
);
</script>
