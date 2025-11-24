import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Toast, { type ToastProps } from "../components/Toast/Toast";

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    message: "Profile saved successfully!",
    type: "success",
    duration: 3000,
  },
};

export const ErrorLongDuration: Story = {
  args: {
    message: "Something went wrong. Please try again.",
    type: "error",
    duration: 6000,
  },
};

export const Playground: Story = {
  name: "Playground (manual trigger)",
  render: (args: ToastProps) => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <button type="button" onClick={() => setVisible(true)}>
          Show toast
        </button>
        {visible && (
          <Toast
            {...args}
            message={args.message ?? "Settings updated!"}
            type={args.type ?? "info"}
            duration={args.duration ?? 4000}
            onClose={() => setVisible(false)}
          />
        )}
      </>
    );
  },
  args: {
    message: "Settings updated!",
    type: "info",
    duration: 4000,
  },
};
