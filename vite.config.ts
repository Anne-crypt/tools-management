import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // pour Vitest :
  test: {
    environment: "jsdom",
    globals: true, // Permet d'utiliser 'describe', 'it', 'expect' sans les importer partout
  },
});
