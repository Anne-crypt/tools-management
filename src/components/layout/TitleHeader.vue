<template>
  <div class="mb-4">
    <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-50">
      <slot name="title">{{ title }}</slot>
    </h1>
    <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
      <slot name="subtitle">{{ subtitle }}</slot>
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
  }>(),
  {
    title: "Internal Tools Dashboard",
    subtitle: "Monitor and manage your organization's software tools and expenses",
  },
);
</script>
