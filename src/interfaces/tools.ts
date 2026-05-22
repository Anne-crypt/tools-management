export interface Tool {
  id: number;
  name: string;
  description: string;
  vendor?: string;
  category: string;
  monthlyCost: number;
  previousMonthCost?: number;
  ownerDepartment: string;
  status: "Active" | "Expiring" | "Unused";
  websiteUrl?: string;
  activeUsersCount: number | null;
  iconUrl: string;
  createdAt: string;
  updatedAt: string;
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
    description: apiData.description,
    vendor: apiData.vendor,
    category: apiData.category,
    monthlyCost: apiData.monthly_cost,
    previousMonthCost: apiData.previous_month_cost,
    ownerDepartment: apiData.owner_department,
    status: normalizeStatus(apiData?.status),
    websiteUrl: apiData.website_url,
    activeUsersCount: apiData.active_users_count,
    iconUrl: apiData.icon_url,
    createdAt: apiData.created_at,
    updatedAt: apiData.updated_at,
  };
}
