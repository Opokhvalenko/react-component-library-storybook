import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps, useState } from "react";
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
    children: [
      { id: "analytics", label: "Analytics" },
      { id: "reports", label: "Reports" },
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
  argTypes: {
    items: { control: false },
    onClose: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

function SidebarPlayground(props: { items: SidebarMenuProps["items"] }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ minHeight: 300 }}>
      <button
        type="button"
        style={{
          padding: "8px 12px",
          borderRadius: 6,
          border: "1px solid #d4d4d8",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(true)}
      >
        Open sidebar
      </button>

      <SidebarMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={props.items}
        title="Navigation"
      />
    </div>
  );
}

export const OneLevel: Story = {
  name: "One-level items",
  render: () => <SidebarPlayground items={oneLevelItems} />,
};

export const TwoLevels: Story = {
  name: "Two-level nested items",
  render: () => <SidebarPlayground items={twoLevelItems} />,
};

export const Closed: Story = {
  name: "Closed state",
  args: {
    isOpen: false,
    items: twoLevelItems,
    onClose: () => {},
    title: "Navigation",
  },
  render: (args) => (
    <div style={{ minHeight: 300 }}>
      <SidebarMenu {...args} />
    </div>
  ),
};