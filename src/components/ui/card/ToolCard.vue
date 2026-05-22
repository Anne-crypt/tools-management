<template>
  <div
    class="relative flex items-center overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-black transition-all duration-300"
  >
    <!-- zone checkbox -->
    <div
      :class="[
        'flex items-center justify-center transition-all duration-300 ease-in-out bg-slate-50 dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 shrink-0',
        multiSelectMode
          ? 'w-14 opacity-100'
          : 'w-0 opacity-0 pointer-events-none',
      ]"
    >
      <input
        type="checkbox"
        :id="`tool-${toolId}`"
        :checked="selectedToolIds.includes(String(toolId))"
        @change="toggleSelection"
        class="w-5 h-5 appearance-none rounded border border-slate-300 bg-white dark:bg-black checked:bg-black dark:checked:bg-white checked:border-black dark:checked:border-white focus:outline-none cursor-pointer"
      />
    </div>

    <!-- zone card -->
    <div
      class="flex-1 min-w-0 cursor-pointer p-5 transition-transform duration-200 hover:scale-[1.01]"
      @click="selectTool"
    >
      <div class="mb-4 flex items-start justify-between gap-3">
        <div class="flex min-w-0 items-center gap-3">
          <img
            v-if="toolIcon && !iconLoadFailed"
            :src="toolIcon"
            :alt="toolName"
            class="h-8 w-8 shrink-0 object-contain"
            @error="iconLoadFailed = true"
          />
          <div
            v-else
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm dark:bg-slate-800"
          >
            {{ fallbackEmoji }}
          </div>

          <div class="min-w-0">
            <h3
              class="truncate text-sm font-semibold text-slate-900 dark:text-white"
            >
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
  </div>
</template>

<script setup lang="ts">
import ToolStatus from "../badge/ToolStatus.vue";
import { computed, ref } from "vue";
import { useFallbackEmoji } from "../../../hooks/useFallbackEmoji";

const {
  toolId,
  toolIcon,
  toolEmoji,
  toolName,
  description,
  category,
  status,
  activeUsersCount,
  monthlyCost,
  multiSelectMode,
} = defineProps<{
  toolId: number;
  toolIcon: string;
  toolEmoji?: string;
  toolName: string;
  description: string;
  category: string;
  status: "Active" | "Expiring" | "Unused";
  activeUsersCount: number;
  monthlyCost: number;
  multiSelectMode: boolean;
}>();

const selectedToolIds = ref<string[]>([]);
const iconLoadFailed = ref(false);
const { getFallbackEmoji } = useFallbackEmoji();

const fallbackEmoji = computed(() => toolEmoji ?? getFallbackEmoji(toolId));

const emit = defineEmits<{
  (e: "select", toolId: number): void;
  (e: "toggle-selection", toolId: number): void;
}>();

function selectTool() {
  emit("select", toolId);
}

function toggleSelection() {
  emit("toggle-selection", toolId);
}
</script>
