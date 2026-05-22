import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import HeaderMenu from "./HeaderMenu.vue";

const mockRoute = {
  name: "analytics",
  path: "/analytics",
};

vi.mock("vue-router", () => ({
  useRoute: () => mockRoute,
}));

describe("HeaderMenu", () => {
  it("marks Analytics nav as active when route is analytics", () => {
    const wrapper = mount(HeaderMenu, {
      global: {
        stubs: {
          NavButton: {
            props: ["label", "isActive"],
            template:
              '<button class="nav-button" :data-label="label" :data-active="isActive">{{ label }}</button>',
          },
          SearchInput: true,
          ThemeToggle: true,
          NotifIcon: true,
          ParamIcon: true,
          MenuIcon: true,
          XIcon: true,
          ZapIcon: true,
        },
      },
    });

    const navButtons = wrapper.findAll(".nav-button");
    const analyticsButton = navButtons.find(
      (button) => button.attributes("data-label") === "Analytics",
    );
    const toolsButton = navButtons.find(
      (button) => button.attributes("data-label") === "Tools",
    );

    expect(analyticsButton?.attributes("data-active")).toBe("true");
    expect(toolsButton?.attributes("data-active")).toBe("false");
  });

  it("opens mobile menu on toggle click", async () => {
    const wrapper = mount(HeaderMenu, {
      global: {
        stubs: {
          NavButton: {
            props: ["label"],
            template: '<button class="nav-button">{{ label }}</button>',
          },
          SearchInput: true,
          ThemeToggle: true,
          NotifIcon: true,
          ParamIcon: true,
          MenuIcon: true,
          XIcon: true,
          ZapIcon: true,
        },
      },
    });

    expect(wrapper.findAll(".nav-button")).toHaveLength(4);

    const mobileToggle = wrapper.get('button[aria-label="Ouvrir le menu"]');
    await mobileToggle.trigger("click");

    // Desktop 4 + mobile 4 when menu is open.
    expect(wrapper.findAll(".nav-button")).toHaveLength(8);
    expect(mobileToggle.attributes("aria-expanded")).toBe("true");
  });
});
