import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps, useState } from "react";
import Toast from "../components/Toast/Toast";

type ToastProps = ComponentProps<typeof Toast>;

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
  args: {
    message: "Hello from toast!",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  name: "Success",
  args: {
    type: "success",
    duration: 2000,
  },
};

export const ErrorLongDuration: Story = {
  name: "Error (long duration)",
  args: {
    type: "error",
    duration: 6000,
    message: "Something went wrong",
  },
};

function ToastPlaygroundComponent(args: ToastProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <button type="button" onClick={() => setVisible(true)}>
        Show toast
      </button>

      {visible && (
        <Toast
          {...args}
          onClose={() => {
            setVisible(false);
            args.onClose?.();
          }}
        />
      )}
    </div>
  );
}

export const Playground: Story = {
  name: "Playground (manual trigger)",
  args: {
    type: "info",
    duration: 3000,
    message: "This toast is shown from a button",
  },
  render: (args) => <ToastPlaygroundComponent {...args} />,
};