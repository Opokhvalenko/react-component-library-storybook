import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Input, { type InputProps } from "../components/Input/Input";

const meta: Meta<typeof Input> = {
  title: "Form/Input",
  component: Input,
};
export default meta;

type Story = StoryObj<typeof Input>;

export const TextClearable: Story = {
  name: "Text (clearable)",
  render: (args: InputProps) => {
    const [value, setValue] = useState("Hello");
    return (
      <div style={{ maxWidth: 320 }}>
        <Input
          {...args}
          type="text"
          label="Text input"
          value={value}
          onChange={setValue}
          clearable
          placeholder="Type some text..."
        />
      </div>
    );
  },
};

export const PasswordToggle: Story = {
  name: "Password with toggle",
  render: (args: InputProps) => {
    const [value, setValue] = useState("");
    return (
      <div style={{ maxWidth: 320 }}>
        <Input
          {...args}
          type="password"
          label="Password"
          value={value}
          onChange={setValue}
          clearable
          placeholder="Enter password"
        />
      </div>
    );
  },
};

export const Number: Story = {
  name: "Number",
  render: (args: InputProps) => {
    const [value, setValue] = useState("42");
    return (
      <div style={{ maxWidth: 320 }}>
        <Input
          {...args}
          type="number"
          label="Number input"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};