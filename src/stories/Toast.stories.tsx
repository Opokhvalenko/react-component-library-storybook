import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps, useState } from "react";
import Toast from "../components/Toast/Toast";

type ToastComponentProps = ComponentProps<typeof Toast>;

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
  args: {
    message: "Hello from toast!",
    type: "info",
    duration: 3000,
    showCloseButton: true,
  },
  argTypes: {
    onClose: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  name: "Success",
  args: {
    type: "success",
    message: "Profile saved successfully!",
  },
};

export const ErrorLong: Story = {
  name: "Error (longer duration)",
  args: {
    type: "error",
    message: "Something went wrong. Please try again.",
    duration: 6000,
  },
};

function ToastPlaygroundComponent(args: ToastComponentProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      <button
        type="button"
        style={{
          padding: "8px 12px",
          borderRadius: 6,
          border: "1px solid #d4d4d8",
          cursor: "pointer",
        }}
        onClick={() => setVisible(true)}
      >
        Show toast
      </button>

      {visible && (
        <Toast
          {...args}
          onClose={() => {
            setVisible(false);
          }}
        />
      )}
    </div>
  );
}

export const Playground: Story = {
  name: "Playground (manual trigger)",
  render: (args) => <ToastPlaygroundComponent {...args} />,
};
