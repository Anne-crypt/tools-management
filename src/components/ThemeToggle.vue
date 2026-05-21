<template>
  <button
    @click="toggleTheme"
    class="inline-flex items-center justify-center text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors duration-200"
    :aria-label="isDark ? 'Activer le mode clair' : 'Activer le mode sombre'"
  >
    <SunIcon v-if="!isDark" class="w-5 h-5" />
    <MoonIcon v-else class="w-5 h-5" />
  </button>
</template>

<script setup lang="ts">
import { MoonIcon, SunIcon } from 'lucide-vue-next'
import { useTheme } from '../hooks/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>
