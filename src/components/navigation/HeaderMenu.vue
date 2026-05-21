<template>
  <header
    class="h-16 border-b border-slate-100 bg-white px-6 dark:border-slate-800 dark:bg-black transition-colors duration-200"
  >
    <div class="flex h-full items-center">
      <div class="flex items-center gap-2">
        <span
          class="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-r from-blue-500 to-violet-500 text-white"
        >
          <ZapIcon class="h-3.5 w-3.5" />
        </span>
        <h1 class="text-lg font-bold text-slate-950 dark:text-white">
          TechCorp
        </h1>
      </div>
      <div class="flex gap-2">
        <NavButton
          :to="'/'"
          label="Dashboard"
          :is-active="activeNav === 'Dashboard'"
          @click="activeNav = 'Dashboard'"
        />
        <NavButton
          :to="'/tools'"
          label="Tools"
          :is-active="activeNav === 'Tools'"
          @click="activeNav = 'Tools'"
        />
        <NavButton
          :to="'/analytics'"
          label="Analytics"
          :is-active="activeNav === 'Analytics'"
          @click="activeNav = 'Analytics'"
        />
        <NavButton
          :to="'/settings'"
          label="Settings"
          :is-active="activeNav === 'Settings'"
          @click="activeNav = 'Settings'"
        />
      </div>

      <div class="ml-auto flex items-center gap-4">
        <div>
          <SearchInput />
        </div>
        <div>
          <ThemeToggle />
        </div>
        <div>
          <NotifIcon />
        </div>
        <div>
          <ParamIcon />
        </div>

        <div
          class="h-8 w-8 rounded-full bg-slate-200 dark:bg-black overflow-hidden"
        >
          <img src="https://placehold.co/32" alt="Profil" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavButton from "../ui/button/NavButton.vue";
import SearchInput from "../ui/headerAssets/SearchInput.vue";
import ThemeToggle from "../ThemeToggle.vue";
import NotifIcon from "../ui/headerAssets/NotifIcon.vue";
import ParamIcon from "../ui/headerAssets/ParamIcon.vue";
import { ZapIcon } from "lucide-vue-next";

const activeNav = ref("Dashboard");
</script>
