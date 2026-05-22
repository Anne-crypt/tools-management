import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import BaseLayout from "./BaseLayout.vue";
import TitleHeader from "./TitleHeader.vue";

const mockRoute = {
  meta: {
    title: "Analytics",
    subtitle: "Track usage and costs",
  },
};

vi.mock("vue-router", () => ({
  useRoute: () => mockRoute,
}));

describe("Layout components", () => {
  it("renders TitleHeader with default title and subtitle", () => {
    const wrapper = mount(TitleHeader);

    expect(wrapper.text()).toContain("Internal Tools Dashboard");
    expect(wrapper.text()).toContain(
      "Monitor and manage your organization's software tools and expenses",
    );
  });

  it("renders TitleHeader named slots when provided", () => {
    const wrapper = mount(TitleHeader, {
      props: {
        title: "Ignored title",
        subtitle: "Ignored subtitle",
      },
      slots: {
        title: "Custom Slot Title",
        subtitle: "Custom Slot Subtitle",
      },
    });

    expect(wrapper.text()).toContain("Custom Slot Title");
    expect(wrapper.text()).toContain("Custom Slot Subtitle");
    expect(wrapper.text()).not.toContain("Ignored title");
    expect(wrapper.text()).not.toContain("Ignored subtitle");
  });

  it("renders BaseLayout using route meta title/subtitle and default slot", () => {
    mockRoute.meta = {
      title: "Analytics",
      subtitle: "Track usage and costs",
    };

    const wrapper = mount(BaseLayout, {
      global: {
        stubs: {
          HeaderMenu: { template: '<div data-test="header-menu">Header</div>' },
        },
      },
      slots: {
        default: '<section data-test="content">Dashboard content</section>',
      },
    });

    expect(wrapper.text()).toContain("Analytics");
    expect(wrapper.text()).toContain("Track usage and costs");
    expect(wrapper.get('[data-test="content"]').text()).toContain(
      "Dashboard content",
    );
  });

  it("falls back to default BaseLayout title/subtitle when route meta is missing", () => {
    mockRoute.meta = {} as { title: string; subtitle: string };

    const wrapper = mount(BaseLayout, {
      global: {
        stubs: {
          HeaderMenu: { template: '<div data-test="header-menu">Header</div>' },
        },
      },
    });

    expect(wrapper.text()).toContain("Internal Tools Dashboard");
    expect(wrapper.text()).toContain(
      "Monitor and manage your organization's software tools and expenses",
    );
  });
});
