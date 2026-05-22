import { computed } from "vue";
import { useRoute } from "vue-router";

export function useAnalyticsSearch(queryKey = "search") {
  const route = useRoute();

  const query = computed(() => {
    const rawQuery = route.query[queryKey];
    const querySource = Array.isArray(rawQuery)
      ? (rawQuery[0] ?? "")
      : (rawQuery ?? "");

    return querySource.toString().toLowerCase().trim();
  });

  const analyticsSections = [
    {
      id: "monthly-budget",
      title: "Monthly Budget",
      group: "Cost",
      keywords: ["budget", "monthly", "cost", "finance", "cout", "coût"],
    },
    {
      id: "department-cost",
      title: "Department Cost",
      group: "Cost",
      keywords: ["department", "cost", "team", "département", "coût"],
    },
    {
      id: "expensive-tools",
      title: "Expensive Tools",
      group: "Cost",
      keywords: [
        "expensive",
        "pricing",
        "high cost",
        "cher",
        "coût élevé",
        "outils",
      ],
    },
    {
      id: "adoption-rates",
      title: "Adoption Rates",
      group: "Usage",
      keywords: [
        "adoption",
        "rate",
        "usage",
        "adoption",
        "taux",
        "utilisation",
      ],
    },
    {
      id: "usage-tool",
      title: "Usage Tool",
      group: "Usage",
      keywords: [
        "users",
        "activity",
        "usage",
        "utilisateurs",
        "activité",
        "utilisation",
      ],
    },
    {
      id: "department-activity",
      title: "Department Activity",
      group: "Usage",
      keywords: [
        "department",
        "activity",
        "users",
        "département",
        "activité",
        "utilisateurs",
      ],
    },
    {
      id: "tool-timeline",
      title: "Tool Timeline",
      group: "Usage",
      keywords: [
        "timeline",
        "recent",
        "created",
        "chronologie",
        "récent",
        "créé",
        "outils",
      ],
    },
  ] as const;

  type AnalyticsSectionId = (typeof analyticsSections)[number]["id"];

  const visibleSectionIds = computed(() => {
    if (!query.value) {
      return new Set(analyticsSections.map((section) => section.id));
    }

    const filtered = analyticsSections.filter((section) => {
      const titleMatch = section.title.toLowerCase().includes(query.value);
      const groupMatch = section.group.toLowerCase().includes(query.value);
      const keywordMatch = section.keywords.some((keyword) =>
        keyword.toLowerCase().includes(query.value),
      );
      return titleMatch || groupMatch || keywordMatch;
    });

    return new Set<AnalyticsSectionId>(filtered.map((section) => section.id));
  });

  const hasResults = computed(() => visibleSectionIds.value.size > 0);

  function isVisible(sectionId: AnalyticsSectionId) {
    return visibleSectionIds.value.has(sectionId);
  }

  return {
    query,
    visibleSectionIds,
    hasResults,
    isVisible,
  };
}
