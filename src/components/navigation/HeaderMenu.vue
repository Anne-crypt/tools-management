<template>
  <header
    class="sticky top-0 z-50 h-16 border-b border-slate-100 bg-white px-6 dark:border-slate-800 dark:bg-black transition-colors duration-200"
  >
    <div class="flex h-full items-center gap-4">
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
      <div class="hidden items-center gap-2 lg:flex">
        <NavButton
          :to="'/'"
          label="Dashboard"
          :is-active="activeNav === 'Dashboard'"
        />
        <NavButton
          :to="'/tools'"
          label="Tools"
          :is-active="activeNav === 'Tools'"
        />
        <NavButton
          :to="'/analytics'"
          label="Analytics"
          :is-active="activeNav === 'Analytics'"
        />
        <NavButton
          :to="'/settings'"
          label="Settings"
          :is-active="activeNav === 'Settings'"
        />
      </div>

      <div class="ml-auto flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900 lg:hidden"
          @click="mobileMenuOpen = !mobileMenuOpen"
          :aria-expanded="mobileMenuOpen"
          aria-label="Ouvrir le menu"
        >
          <MenuIcon v-if="!mobileMenuOpen" class="h-4 w-4" />
          <XIcon v-else class="h-4 w-4" />
        </button>

        <div class="hidden sm:block">
          <SearchInput />
        </div>
        <div class="hidden sm:block">
          <ThemeToggle />
        </div>
        <div class="hidden sm:block">
          <NotifIcon />
        </div>
        <div class="hidden sm:block">
          <ParamIcon />
        </div>

        <div
          class="h-8 w-8 overflow-hidden rounded-full bg-slate-200 dark:bg-black"
        >
          <img src="https://placehold.co/32" alt="Profil" />
        </div>
      </div>
    </div>

    <div
      v-if="mobileMenuOpen"
      class="border-t border-slate-100 bg-white px-6 py-4 dark:border-slate-800 dark:bg-black lg:hidden"
    >
      <div class="flex flex-col gap-2">
        <NavButton
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :label="item.label"
          :is-active="item.isActive"
          class="w-full text-left"
          @click="mobileMenuOpen = false"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import NavButton from "../ui/button/NavButton.vue";
import SearchInput from "../ui/headerAssets/SearchInput.vue";
import ThemeToggle from "../ThemeToggle.vue";
import NotifIcon from "../ui/headerAssets/NotifIcon.vue";
import ParamIcon from "../ui/headerAssets/ParamIcon.vue";
import { MenuIcon, XIcon, ZapIcon } from "lucide-vue-next";

const route = useRoute();
const mobileMenuOpen = ref(false);

const activeNav = computed<"Dashboard" | "Tools" | "Analytics" | "Settings">(() => {
  if (route.name === "analytics") return "Analytics";
  if (
    route.name === "tools" ||
    route.name === "tool-details" ||
    route.name === "edit-tool" ||
    route.name === "new-tool"
  ) {
    return "Tools";
  }

  if (route.path === "/settings") {
    return "Settings";
  }

  return "Dashboard";
});

const navItems = computed(() => [
  { to: "/", label: "Dashboard", isActive: activeNav.value === "Dashboard" },
  { to: "/tools", label: "Tools", isActive: activeNav.value === "Tools" },
  {
    to: "/analytics",
    label: "Analytics",
    isActive: activeNav.value === "Analytics",
  },
  {
    to: "/settings",
    label: "Settings",
    isActive: activeNav.value === "Settings",
  },
]);
</script>
