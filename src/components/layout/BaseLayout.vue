<template>
  <div
    class="min-h-screen w-full bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-black dark:text-slate-50"
  >
    <main class="">
      <HeaderMenu />
      <TitleHeader class="px-6" title="Internal Tools Dashboard" />
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import HeaderMenu from "../navigation/HeaderMenu.vue";
import TitleHeader from "./TitleHeader.vue";
</script>
