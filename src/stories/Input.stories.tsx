import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps, type ReactNode, useState } from "react";
import Input from "../components/Input/Input";

type InputComponentProps = ComponentProps<typeof Input>;

const meta: Meta<typeof Input> = {
  title: "Form/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
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

function StoryContainer({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 360,
        margin: "2rem auto",
        padding: "1rem",
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
      }}
    >
      {children}
    </div>
  );
}

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
  render: (args) => (
    <StoryContainer>
      <ControlledInput {...args} />
    </StoryContainer>
  ),
};

export const Password: Story = {
  name: "Password with toggle & clear",
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    clearable: true,
  },
  render: (args) => (
    <StoryContainer>
      <ControlledInput {...args} />
    </StoryContainer>
  ),
};

export const NumberInput: Story = {
  name: "Number",
  args: {
    label: "Age",
    type: "number",
    placeholder: "Enter age",
    clearable: false,
  },
  render: (args) => (
    <StoryContainer>
      <ControlledInput {...args} />
    </StoryContainer>
  ),
};

export const WithError: Story = {
  name: "With error message",
  args: {
    label: "Email",
    type: "email",
    placeholder: "Enter email",
  },
  render: (args) => (
    <StoryContainer>
      <ControlledInput
        {...args}
        error="Required field"
      />
    </StoryContainer>
  ),
};