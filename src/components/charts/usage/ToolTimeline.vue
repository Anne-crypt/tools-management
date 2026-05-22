<template>
  <section
    class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-black"
  >
    <div class="mb-6">
      <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
        Timeline des 10 derniers outils ajoutés
      </h2>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Les outils les plus récemment créés, du plus récent au plus ancien.
      </p>
    </div>

    <div
      class="relative space-y-6 border-l border-slate-200 pl-6 dark:border-slate-800"
    >
      <article
        v-for="(tool, index) in sortedTools"
        :key="tool.id"
        class="relative"
      >
        <div
          class="absolute -left-8 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-blue-500 shadow-sm dark:border-black"
        >
          <span class="h-2 w-2 rounded-full bg-white"></span>
        </div>

        <div class="pl-0 md:pl-0">
          <div
            class="mb-2 text-xs font-medium text-slate-400 dark:text-slate-500 md:absolute md:-left-32 md:top-4 md:w-24 md:text-right"
          >
            <div>#{{ index + 1 }}</div>
            <div>{{ formatDate(tool.createdAt) }}</div>
          </div>

          <ToolCard
            :toolId="Number(tool.id)"
            :toolIcon="tool.iconUrl ?? ''"
            :toolEmoji="tool.iconUrl ? undefined : getFallbackEmoji(tool.id)"
            :toolName="tool.name"
            :description="tool.description"
            :category="tool.category"
            :status="tool.status as 'Active' | 'Expiring' | 'Unused'"
            :activeUsersCount="tool.activeUsersCount ?? 0"
            :monthlyCost="tool.monthlyCost"
            :multiSelectMode="false"
            @select="(toolId: number) => emit('select', toolId)"
          />
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ToolCard from "../../ui/card/ToolCard.vue";
import { useFallbackEmoji } from "../../../hooks/useFallbackEmoji";
import type { Tool } from "../../../interfaces/tools";

const emit = defineEmits<{
  (e: "select", toolId: number): void;
}>();

const props = defineProps<{
  tools: Tool[];
}>();

const sortedTools = computed(() => {
  return [...props.tools]
    .filter((tool) => Boolean(tool.createdAt))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 10);
});

const { getFallbackEmoji } = useFallbackEmoji();

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
}
</script>
