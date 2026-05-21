<template>
  <div
    class="p-5 rounded-2xl bg-white dark:bg-black border border-slate-100 dark:border-slate-800 shadow-sm transition-transform duration-200 hover:scale-[1.01]"
  >
    <div class="mb-4 flex items-start justify-between gap-3">
      <div class="flex items-center gap-3 min-w-0">
        <img
          v-if="toolIcon"
          :src="toolIcon"
          :alt="toolName"
          class="h-8 w-8 shrink-0 object-contain"
        />
        <div v-else class="h-8 w-8 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800" />

        <div class="min-w-0">
          <h3 class="truncate text-sm font-semibold text-slate-900 dark:text-white">
            {{ toolName }}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            {{ category }}
          </p>
        </div>
      </div>

      <ToolStatus :status="status" />
    </div>

    <p class="mb-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
      {{ description }}
    </p>

    <div class="flex items-center justify-between text-sm">
      <span class="text-slate-500 dark:text-slate-400">
        {{ activeUsersCount }} users
      </span>
      <span class="font-semibold text-slate-900 dark:text-white">
        €{{ monthlyCost }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import ToolStatus from '../badge/ToolStatus.vue'

const {
  toolIcon,
  toolName,
  description,
  category,
  status,
  activeUsersCount,
  monthlyCost,
} = defineProps<{
  toolIcon: string
  toolName: string
  description: string
  category: string
  status: 'Active' | 'Expiring' | 'Unused'
  activeUsersCount: number
  monthlyCost: number
}>()
</script>