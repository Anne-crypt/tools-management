export interface Analytics {
  budgetOverview: {
    monthlyLimit: number; // 30000
    currentMonthTotal: number; // Current total
    previousMonthTotal: number; // Previous month total
    budgetUtilization: string; // "95.8%"
    trendPercentage: string; // "+12.0"
  };
  kpiTrends: {
    budgetChange: string; // "+12%"
    toolsChange: string; // "+9"
    departmentsChange: string; // "+2"
    costPerUserChange: string; // "-€12"
  };
  costAnalytics: {
    costPerUser: number; // 156
    previousCostPerUser: number; // 168
    activeUsers: number; // 56
    totalUsers: number; // 66
  };
}

export function mapApiAnalyticsToAnalytics(apiData: any): Analytics {
  return {
    budgetOverview: {
      monthlyLimit: apiData.budget_overview?.monthly_limit ?? 0,
      currentMonthTotal: apiData.budget_overview?.current_month_total ?? 0,
      previousMonthTotal: apiData.budget_overview?.previous_month_total ?? 0,
      budgetUtilization: String(
        apiData.budget_overview?.budget_utilization ?? "0",
      ),
      trendPercentage: String(apiData.budget_overview?.trend_percentage ?? "0"),
    },
    kpiTrends: {
      budgetChange: String(apiData.kpi_trends?.budget_change ?? "0"),
      toolsChange: String(apiData.kpi_trends?.tools_change ?? "0"),
      departmentsChange: String(apiData.kpi_trends?.departments_change ?? "0"),
      costPerUserChange: String(
        apiData.kpi_trends?.cost_per_user_change ?? "0",
      ),
    },
    costAnalytics: {
      costPerUser: apiData.cost_analytics?.cost_per_user ?? 0,
      previousCostPerUser: apiData.cost_analytics?.previous_cost_per_user ?? 0,
      activeUsers: apiData.cost_analytics?.active_users ?? 0,
      totalUsers: apiData.cost_analytics?.total_users ?? 0,
    },
  };
}
