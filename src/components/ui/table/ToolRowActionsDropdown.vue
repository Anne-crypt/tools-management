<template>
  <div
    v-if="open"
    class="absolute right-4 top-full z-20 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900"
    @click.stop
  >
    <button
      class="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
      @click="$emit('view')"
    >
      <EyeIcon class="h-4 w-4" />
      View
    </button>
    <button
      class="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
      @click="$emit('edit')"
    >
      <PencilIcon class="h-4 w-4" />
      Edit
    </button>
    <button
      class="flex w-full items-center gap-2 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
      @click="$emit('delete')"
    >
      <Trash2Icon class="h-4 w-4" />
      Delete
    </button>
  </div>
</template>

<script setup lang="ts">
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-vue-next";

defineProps<{
  open: boolean;
}>();

defineEmits<{
  view: [];
  edit: [];
  delete: [];
}>();
</script>
