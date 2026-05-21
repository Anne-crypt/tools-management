import { ref, onMounted } from "vue";

// 💡 Déclarée ici, la variable est instanciée UNE SEULE FOIS pour toute l'application
const isDark = ref(false);

export function useTheme() {
  // Initialise le mode dark au montage
  onMounted(() => {
    // 1. Cherche la préférence sauvegardée
    const saved = localStorage.getItem("theme-mode");

    if (saved === "dark") {
      isDark.value = true;
      document.documentElement.classList.add("dark");
    } else if (saved === "light") {
      isDark.value = false;
      document.documentElement.classList.remove("dark");
    } else {
      // 2. Sinon, détecte la préférence système
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      isDark.value = prefersDark;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      }
    }
  });

  function toggleTheme() {
    isDark.value = !isDark.value;

    // Applique le changement et sauvegarde
    if (isDark.value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme-mode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme-mode", "light");
    }
  }

  return {
    isDark,
    toggleTheme,
  };
}
