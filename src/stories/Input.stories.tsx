import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps, useState } from "react";
import Input from "../components/Input/Input";

type InputComponentProps = ComponentProps<typeof Input>;

const meta: Meta<typeof Input> = {
  title: "Form/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    value: { control: false },
    onChange: { control: false },
    type: {
      control: "radio",
      options: ["text", "password", "number", "email"],
    },
  },
  args: {
    label: "Label",
    type: "text",
    placeholder: "Enter some text...",
    clearable: true,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

function ControlledInput(args: InputComponentProps) {
  const [value, setValue] = useState(args.value ?? "");

  return (
    <Input
      {...args}
      value={value}
      onChange={setValue}
    />
  );
}

export const Text: Story = {
  name: "Text",
  render: (args) => <ControlledInput {...args} />,
};

export const Password: Story = {
  name: "Password with toggle & clear",
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    clearable: true,
  },
  render: (args) => <ControlledInput {...args} />,
};

export const NumberInput: Story = {
  name: "Number",
  args: {
    label: "Age",
    type: "number",
    placeholder: "Enter age",
    clearable: false,
  },
  render: (args) => <ControlledInput {...args} />,
};

export const WithError: Story = {
  name: "With error message",
  args: {
    label: "Email",
    type: "email",
    placeholder: "Enter email",
  },
  render: (args) => <ControlledInput {...args} error="Required field" />,
};