import { forwardRef, useId, useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import "./Input.css";

export type InputType = "text" | "password" | "number" | "email";

type InputBaseProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange">;

export interface InputProps extends InputBaseProps {
  label?: string;
  type?: InputType;
  value: string;
  onChange: (value: string) => void;
  clearable?: boolean;
  error?: string;
}

/**
 * Smart Input:
 * - supports multiple types (text/password/number/email)
 * - shows eye icon for password
 * - shows clear "×" when clearable + has value
 */
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", value, onChange, clearable, error, ...rest },
  ref,
) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputId = useId();

  const showPasswordToggle = type === "password";
  const showClear = clearable && value.length > 0;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

  const effectiveType = type === "password" ? (isPasswordVisible ? "text" : "password") : type;

  return (
    <div className="input-root">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}

      <div className="input-wrapper">
        <input
          id={inputId}
          ref={ref}
          className={`input-field ${error ? "input-field--error" : ""}`}
          type={effectiveType}
          value={value}
          onChange={handleChange}
          {...rest}
        />

        {showPasswordToggle && (
          <button
            type="button"
            className="input-icon-button"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? "🙈" : "👁"}
          </button>
        )}

        {showClear && (
          <button
            type="button"
            className="input-icon-button input-icon-button--clear"
            aria-label="Clear input"
            onClick={handleClear}
          >
            ×
          </button>
        )}
      </div>

      {error && <p className="input-error">{error}</p>}
    </div>
  );
});

export default Input;
