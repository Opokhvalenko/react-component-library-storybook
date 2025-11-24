import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";

type SidebarMenuProps = ComponentProps<typeof SidebarMenu>;

const oneLevelItems: SidebarMenuProps["items"] = [
  { id: "home", label: "Home" },
  { id: "profile", label: "Profile" },
  { id: "settings", label: "Settings" },
];

const twoLevelItems: SidebarMenuProps["items"] = [
  {
    id: "dashboard",
    label: "Dashboard",
  },
  {
    id: "projects",
    label: "Projects",
    children: [
      { id: "active-projects", label: "Active projects" },
      { id: "archived-projects", label: "Archived projects" },
    ],
  },
  {
    id: "account",
    label: "Account",
    children: [
      { id: "billing", label: "Billing" },
      { id: "security", label: "Security" },
    ],
  },
];

const meta: Meta<typeof SidebarMenu> = {
  title: "Navigation/SidebarMenu",
  component: SidebarMenu,
  tags: ["autodocs"],
  args: {
    title: "Menu",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const OneLevelOpen: Story = {
  name: "One-level (open)",
  args: {
    isOpen: true,
    items: oneLevelItems,
    onClose: () => {
      // noop for Storybook canvas
    },
  },
};

export const TwoLevelOpen: Story = {
  name: "Two-level nested (open)",
  args: {
    isOpen: true,
    items: twoLevelItems,
    onClose: () => {
      // noop for Storybook canvas
    },
  },
};

export const Closed: Story = {
  name: "Closed state",
  args: {
    isOpen: false,
    items: twoLevelItems,
    onClose: () => {
      // noop
    },
  },
};
