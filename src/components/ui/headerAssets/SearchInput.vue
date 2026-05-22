<template>
  <div
    class="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-black border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all"
  >
    <SearchIcon class="w-5 h-5 text-slate-500 dark:text-slate-400" />
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder"
      class="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 outline-none"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { SearchIcon } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();

const placeholder = computed(
  () => (route.meta.searchPlaceholder as string) ?? "Search...",
);

// Synchronisation bidirectionnelle avec l'URL (?search=...)
const searchQuery = computed({
  get() {
    return (route.query.search as string) ?? "";
  },
  set(newValue) {
    // On remplace la query dans l'URL sans recharger la page
    router.replace({
      query: {
        ...route.query, // On garde les autres filtres existants s'il y en a
        search: newValue || undefined, // Si c'est vide, on supprime le paramètre '?search'
      },
    });
  },
});
</script>
