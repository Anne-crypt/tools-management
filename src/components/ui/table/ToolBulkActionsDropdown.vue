<template>
  <div
    ref="dropdownRef"
    v-if="open"
    class="absolute z-20 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900"
    @click.stop
  >
    <button
      class="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
      @click="$emit('enable')"
    >
      <CircleCheckIcon class="h-4 w-4" />
      Enable
    </button>
    <button
      class="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
      @click="$emit('disable')"
    >
      <CircleMinusIcon class="h-4 w-4" />
      Disable
    </button>
    <button
      class="flex w-full items-center gap-2 px-4 py-3 text-sm text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/40"
      @click="$emit('archive')"
    >
      <ArchiveIcon class="h-4 w-4" />
      Archive
    </button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { ArchiveIcon, CircleCheckIcon, CircleMinusIcon } from "lucide-vue-next";

const emit = defineEmits<{
  enable: [];
  disable: [];
  archive: [];
  close: [];
}>();

const props = defineProps<{
  open: boolean;
}>();

const dropdownRef = ref<HTMLElement | null>(null);

function handlePointerDown(event: PointerEvent) {
  const target = event.target as Node | null;
  if (!props.open || !dropdownRef.value || !target) return;

  if (!dropdownRef.value.contains(target)) {
    emit("close");
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      document.addEventListener("pointerdown", handlePointerDown);
      return;
    }
    document.removeEventListener("pointerdown", handlePointerDown);
  },
);

onMounted(() => {
  if (props.open) {
    document.addEventListener("pointerdown", handlePointerDown);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", handlePointerDown);
});
</script>
