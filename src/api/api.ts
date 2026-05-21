import axios from "axios";

const api = axios.create({
  baseURL: "https://tt-jsonserver-01.alt-tools.tech/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const toolService = {
  getTools() {
    return api.get("/tools");
  },
  getActiveTools() {
    return api.get("/tools", {
      params: {
        active: true,
      },
    });
  },
  // 1. Récupérer les 8 derniers outils modifiés
  getRecentTools() {
    return api.get("/tools", {
      params: {
        _sort: "updated_at",
        _order: "desc",
        _limit: 8,
      },
    });
  },
  // 2. Récupérer tous les outils triés par coût décroissant
  getToolsByCost() {
    return api.get("/tools", {
      params: {
        _sort: "monthly_cost",
        _order: "desc",
      },
    });
  },

  // 3. Récupérer les données analytiques globales du budget
  getBudgetAnalytics() {
    return api.get("/analytics");
  },
};
