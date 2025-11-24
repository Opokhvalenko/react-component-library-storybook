import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SidebarMenu, {
  type SidebarMenuItem,
  type SidebarMenuProps,
} from "../components/SidebarMenu/SidebarMenu";

const meta: Meta<typeof SidebarMenu> = {
  title: "Navigation/SidebarMenu",
  component: SidebarMenu,
};
export default meta;

type Story = StoryObj<typeof SidebarMenu>;

const oneLevelItems: SidebarMenuItem[] = [
  { id: "home", label: "Home" },
  { id: "dashboard", label: "Dashboard" },
  { id: "settings", label: "Settings" },
];

const twoLevelItems: SidebarMenuItem[] = [
  {
    id: "analytics",
    label: "Analytics",
    children: [
      { id: "overview", label: "Overview" },
      { id: "reports", label: "Reports" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    children: [
      { id: "profile", label: "Profile" },
      { id: "billing", label: "Billing" },
    ],
  },
];

export const OneLevel: Story = {
  name: "One-level menu (open)",
  render: (args: SidebarMenuProps) => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          Open menu
        </button>
        <SidebarMenu
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
          items={oneLevelItems}
          title="Main navigation"
        />
      </>
    );
  },
};

export const TwoLevels: Story = {
  name: "Two-level nested menu",
  render: (args: SidebarMenuProps) => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          Open menu
        </button>
        <SidebarMenu
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
          items={twoLevelItems}
          title="Project"
        />
      </>
    );
  },
};
