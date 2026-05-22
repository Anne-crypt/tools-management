import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it, vi } from "vitest";
import AdoptionRates from "./AdoptionRates.vue";
import DepartmentActivity from "./DepartmentActivity.vue";
import ToolTimeline from "./ToolTimeline.vue";
import UsageTool from "./UsageTool.vue";
import type { Tool } from "../../../interfaces/tools";

vi.mock("vue-chartjs", () => {
  const Bar = defineComponent({
    name: "Bar",
    props: {
      data: { type: Object, required: true },
      options: { type: Object, required: true },
    },
    template:
      '<pre class="bar-data">{{ JSON.stringify(data) }}</pre><pre class="bar-options">{{ JSON.stringify(options) }}</pre>',
  });

  return { Bar };
});

function makeTool(partial: Partial<Tool>): Tool {
  return {
    id: 1,
    name: "Tool",
    description: "desc",
    category: "General",
    monthlyCost: 0,
    ownerDepartment: "Ops",
    status: "Active",
    activeUsersCount: 0,
    iconUrl: "",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...partial,
  };
}

describe("Usage charts", () => {
  it("computes AdoptionRates top 6 and ignores null active users", () => {
    const wrapper = mount(AdoptionRates, {
      props: {
        activeUsers: 100,
        tools: [
          { name: "A", activeUsersCount: 10 },
          { name: "B", activeUsersCount: 40 },
          { name: "C", activeUsersCount: 80 },
          { name: "D", activeUsersCount: null },
          { name: "E", activeUsersCount: 60 },
          { name: "F", activeUsersCount: 20 },
          { name: "G", activeUsersCount: 50 },
        ],
      },
    });

    expect(wrapper.text()).toContain("Taux d'adoption des outils");

    const chartData = JSON.parse(wrapper.get(".bar-data").text());
    expect(chartData.labels).toEqual(["C", "E", "G", "B", "F", "A"]);
    expect(chartData.datasets[0].data).toEqual([80, 60, 50, 40, 20, 10]);
  });

  it("builds UsageTool datasets for most and least used tools", () => {
    const wrapper = mount(UsageTool, {
      props: {
        tools: [
          { name: "A", activeUsersCount: 10 },
          { name: "B", activeUsersCount: 40 },
          { name: "C", activeUsersCount: 80 },
          { name: "D", activeUsersCount: null },
          { name: "E", activeUsersCount: 60 },
          { name: "F", activeUsersCount: 20 },
          { name: "G", activeUsersCount: 50 },
        ],
      },
    });

    expect(wrapper.text()).toContain("Outils les plus et les moins utilisés");

    const bars = wrapper.findAll(".bar-data");
    const topData = JSON.parse(bars[0].text());
    const bottomData = JSON.parse(bars[1].text());

    expect(topData.labels).toEqual(["C", "E", "G", "B", "F", "A", "D"]);
    expect(topData.datasets[0].data).toEqual([80, 60, 50, 40, 20, 10, 0]);

    expect(bottomData.labels).toEqual(["C", "E", "G", "B", "F", "A", "D"]);
    expect(bottomData.datasets[0].data).toEqual([80, 60, 50, 40, 20, 10, 0]);
  });

  it("aggregates DepartmentActivity by department", () => {
    const wrapper = mount(DepartmentActivity, {
      props: {
        tools: [
          { ownerDepartment: "Product", activeUsersCount: 10 },
          { ownerDepartment: "Product", activeUsersCount: null },
          { ownerDepartment: "Design", activeUsersCount: 5 },
          { ownerDepartment: "", activeUsersCount: 2 },
        ],
      },
    });

    expect(wrapper.text()).toContain("Activité par département");

    const chartData = JSON.parse(wrapper.get(".bar-data").text());
    const labels: string[] = chartData.labels;
    const toolsCount = chartData.datasets[0].data as number[];
    const activeUsers = chartData.datasets[1].data as number[];

    const indexByLabel = Object.fromEntries(
      labels.map((label, index) => [label, index]),
    ) as Record<string, number>;

    expect(toolsCount[indexByLabel.Product]).toBe(2);
    expect(activeUsers[indexByLabel.Product]).toBe(10);
    expect(toolsCount[indexByLabel.Design]).toBe(1);
    expect(activeUsers[indexByLabel.Design]).toBe(5);
    expect(toolsCount[indexByLabel.Autre]).toBe(1);
    expect(activeUsers[indexByLabel.Autre]).toBe(2);
  });

  it("renders ToolTimeline sorted by most recent date and limited to 10", () => {
    const tools = Array.from({ length: 12 }, (_, i) =>
      makeTool({
        id: i + 1,
        name: `Tool ${i + 1}`,
        createdAt: `2026-01-${String(i + 1).padStart(2, "0")}T00:00:00.000Z`,
      }),
    );

    const wrapper = mount(ToolTimeline, {
      props: { tools },
      global: {
        stubs: {
          ToolCard: defineComponent({
            name: "ToolCard",
            props: {
              toolName: { type: String, required: true },
            },
            template: '<div class="timeline-tool">{{ toolName }}</div>',
          }),
        },
      },
    });

    const renderedTools = wrapper.findAll(".timeline-tool");
    expect(renderedTools).toHaveLength(10);
    expect(renderedTools[0].text()).toBe("Tool 12");
    expect(renderedTools[9].text()).toBe("Tool 3");
  });
});
