// 1. L'interface pour le reste de l'application
export interface Tool {
  id: number;
  name: string;
  category: string;
  monthlyCost: number;
  status: "Active" | "Expiring" | "Unused";
  usersCount: number;
  iconUrl: string;
  ownerDepartment: string;
}

function normalizeStatus(rawStatus: unknown): Tool["status"] {
  if (typeof rawStatus !== "string") {
    return "Unused";
  }

  const value = rawStatus.trim().toLowerCase();
  if (value === "active") return "Active";
  if (value === "expiring") return "Expiring";
  if (value === "unused") return "Unused";

  return "Unused";
}

// 2. Le mapper qui transforme la donnée brute du backend
export function mapApiToolToTool(apiData: any): Tool {
  return {
    id: apiData.id,
    name: apiData.name,
    category: apiData.category,
    monthlyCost: apiData.monthly_cost,
    status: normalizeStatus(apiData?.status),
    usersCount: apiData.active_users_count,
    iconUrl: apiData.icon_url,
    ownerDepartment: apiData.owner_department,
  };
}
