import type { Meta, StoryObj } from "@storybook/react";
import { Controller, useForm } from "react-hook-form";
import Input from "../components/Input/Input";

type FormValues = {
  email: string;
};

const meta: Meta<typeof Input> = {
  title: "Form/Input with React Hook Form",
  component: Input,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

function ReactHookFormExample() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: "" },
  });

  const onSubmit = (values: FormValues) => {
    // Для демо в Storybook можна просто показати alert
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        width: "320px",
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
          padding: "8px 12px",
          borderRadius: 6,
          border: "1px solid #d4d4d8",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
}

export const BasicIntegration: Story = {
  name: "Email field with validation",
  render: () => <ReactHookFormExample />,
};