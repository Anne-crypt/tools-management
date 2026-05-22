import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it, vi } from "vitest";
import DepartmentCost from "./DepartmentCost.vue";
import ExpensiveTools from "./ExpensiveTools.vue";
import MonthlyBudget from "./MonthlyBudget.vue";

vi.mock("vue-chartjs", () => {
  const Line = defineComponent({
    name: "Line",
    props: {
      data: { type: Object, required: true },
      options: { type: Object, required: true },
    },
    template:
      '<pre class="line-data">{{ JSON.stringify(data) }}</pre><pre class="line-options">{{ JSON.stringify(options) }}</pre>',
  });

  const Doughnut = defineComponent({
    name: "Doughnut",
    props: {
      data: { type: Object, required: true },
      options: { type: Object, required: true },
    },
    template:
      '<pre class="doughnut-data">{{ JSON.stringify(data) }}</pre><pre class="doughnut-options">{{ JSON.stringify(options) }}</pre>',
  });

  const Bar = defineComponent({
    name: "Bar",
    props: {
      data: { type: Object, required: true },
      options: { type: Object, required: true },
    },
    template:
      '<pre class="bar-data">{{ JSON.stringify(data) }}</pre><pre class="bar-options">{{ JSON.stringify(options) }}</pre>',
  });

  return { Line, Doughnut, Bar };
});

describe("Cost charts", () => {
  it("renders MonthlyBudget with expected title and monthly totals", () => {
    const wrapper = mount(MonthlyBudget, {
      props: {
        overview: {
          previousMonthTotal: 1200,
          currentMonthTotal: 1800,
        },
      },
    });

    expect(wrapper.text()).toContain("Budget mensuel");

    const chartData = JSON.parse(wrapper.get(".line-data").text());
    expect(chartData.labels).toEqual(["Mois Precedent", "Mois En Cours"]);
    expect(chartData.datasets[0].data).toEqual([1200, 1800]);
  });

  it("aggregates DepartmentCost by department with fallback to 'Inconnu'", () => {
    const wrapper = mount(DepartmentCost, {
      props: {
        tools: [
          { name: "Notion", monthlyCost: 100, ownerDepartment: "Product" },
          { name: "Figma", monthlyCost: 200, ownerDepartment: "Design" },
          { name: "Jira", monthlyCost: 150, ownerDepartment: "Product" },
          { name: "Miro", monthlyCost: 50 },
        ],
      },
    });

    expect(wrapper.text()).toContain("Coût par département");

    const chartData = JSON.parse(wrapper.get(".doughnut-data").text());
    const byLabel = Object.fromEntries(
      chartData.labels.map((label: string, index: number) => [
        label,
        chartData.datasets[0].data[index],
      ]),
    );

    expect(byLabel.Product).toBe(250);
    expect(byLabel.Design).toBe(200);
    expect(byLabel.Inconnu).toBe(50);
  });

  it("shows ExpensiveTools top 5 sorted by descending monthly cost", () => {
    const wrapper = mount(ExpensiveTools, {
      props: {
        tools: [
          { name: "A", monthlyCost: 90 },
          { name: "B", monthlyCost: 10 },
          { name: "C", monthlyCost: 70 },
          { name: "D", monthlyCost: 30 },
          { name: "E", monthlyCost: 120 },
          { name: "F", monthlyCost: 60 },
          { name: "G", monthlyCost: 50 },
        ],
      },
    });

    expect(wrapper.text()).toContain("Outils les plus chers");

    const chartData = JSON.parse(wrapper.get(".bar-data").text());
    expect(chartData.labels).toEqual(["E", "A", "C", "F", "G"]);
    expect(chartData.datasets[0].data).toEqual([120, 90, 70, 60, 50]);
  });
});
