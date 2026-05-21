<template>
  <div
    class="min-h-screen w-full bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-black dark:text-slate-50"
  >
    <main class="">
      <HeaderMenu />
      <TitleHeader
        class="px-6"
        :title="currentPageTitle"
        :subtitle="currentPageSubtitle"
      />
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import HeaderMenu from "../navigation/HeaderMenu.vue";
import TitleHeader from "./TitleHeader.vue";

const route = useRoute();

const currentPageTitle = computed(
  () => (route.meta.title as string) ?? "Internal Tools Dashboard",
);
const currentPageSubtitle = computed(
  () =>
    (route.meta.subtitle as string) ??
    "Monitor and manage your organization's software tools and expenses",
);
</script>
