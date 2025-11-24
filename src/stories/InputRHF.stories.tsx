import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../components/Input/Input";

type FormValues = {
  email: string;
};

const meta: Meta<typeof Input> = {
  title: "Form/Input with React Hook Form",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
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

function ReactHookFormExample() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: "" },
  });

  const onSubmit = (values: FormValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <Controller
        name="email"
        control={control}
        rules={{ required: "Email is required" }}
        render={({ field, fieldState }) => (
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={field.value ?? ""}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <button
        type="submit"
        style={{
          padding: "0.5rem 0.75rem",
          borderRadius: 6,
          border: "1px solid #d4d4d8",
          cursor: "pointer",
          backgroundColor: "#e5e7eb",
        }}
      >
        Submit
      </button>
    </form>
  );
}

export const EmailFieldWithValidation: Story = {
  name: "Email field with validation",
  render: () => (
    <StoryContainer>
      <ReactHookFormExample />
    </StoryContainer>
  ),
};
