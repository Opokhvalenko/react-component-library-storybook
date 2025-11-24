import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps, useState } from "react";
import Input from "../components/Input/Input";

type InputProps = ComponentProps<typeof Input>;

const meta: Meta<typeof Input> = {
  title: "Form/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

function TextInputStory(args: InputProps) {
  const [value, setValue] = useState("John Doe");
  return <Input {...args} value={value} onChange={setValue} />;
}

function PasswordInputStory(args: InputProps) {
  const [value, setValue] = useState("Password123");
  return <Input {...args} value={value} onChange={setValue} />;
}

function NumberInputStory(args: InputProps) {
  const [value, setValue] = useState("42");
  return <Input {...args} value={value} onChange={setValue} />;
}

export const Text: Story = {
  name: "Text (clearable)",
  args: {
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    clearable: true,
  },
  render: (args) => <TextInputStory {...args} />,
};

export const PasswordWithToggle: Story = {
  name: "Password with toggle",
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    clearable: true,
  },
  render: (args) => <PasswordInputStory {...args} />,
};

export const NumberInput: Story = {
  name: "Number",
  args: {
    label: "Age",
    type: "number",
    placeholder: "Enter age",
    clearable: false,
  },
  render: (args) => <NumberInputStory {...args} />,
};